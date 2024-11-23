# Database Schema Documentation

## Overview

This document details the database schema for the Visual Text Transformer application. The system uses PostgreSQL as its primary database, with Redis for caching and session management.

## Entity Relationship Diagram

```
[Users] 1--* [Projects] 1--* [Visualizations]
[Users] 1--* [ApiKeys]
[Users] 1--* [UserPreferences]
[Visualizations] 1--* [Exports]
[Visualizations] *--* [Tags]
[Projects] *--* [Collaborators]
```

## Tables

### Users

Stores user account information.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'active',
    role VARCHAR(50) DEFAULT 'user',
    subscription_tier VARCHAR(50) DEFAULT 'free',
    CONSTRAINT email_valid CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
```

### UserPreferences

Stores user-specific settings and preferences.

```sql
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(50) DEFAULT 'light',
    default_visualization_type VARCHAR(50) DEFAULT 'wordcloud',
    color_scheme VARCHAR(50) DEFAULT 'default',
    language VARCHAR(10) DEFAULT 'en',
    notifications_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);
```

### ApiKeys

Stores API authentication keys.

```sql
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    key_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'active',
    permissions JSONB DEFAULT '[]'::jsonb,
    UNIQUE(key_hash)
);

CREATE INDEX idx_api_keys_user ON api_keys(user_id);
```

### Projects

Organizes visualizations into projects.

```sql
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    settings JSONB DEFAULT '{}'::jsonb,
    is_public BOOLEAN DEFAULT false
);

CREATE INDEX idx_projects_user ON projects(user_id);
```

### Collaborators

Manages project sharing and collaboration.

```sql
CREATE TABLE collaborators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(project_id, user_id)
);

CREATE INDEX idx_collaborators_project ON collaborators(project_id);
CREATE INDEX idx_collaborators_user ON collaborators(user_id);
```

### Visualizations

Stores visualization data and metadata.

```sql
CREATE TABLE visualizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    input_text TEXT NOT NULL,
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,
    output_data JSONB,
    preview_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'draft',
    processing_status VARCHAR(50) DEFAULT 'pending',
    error_message TEXT
);

CREATE INDEX idx_visualizations_project ON visualizations(project_id);
CREATE INDEX idx_visualizations_type ON visualizations(type);
```

### Exports

Tracks visualization exports.

```sql
CREATE TABLE exports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visualization_id UUID NOT NULL REFERENCES visualizations(id) ON DELETE CASCADE,
    format VARCHAR(50) NOT NULL,
    url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'pending',
    settings JSONB DEFAULT '{}'::jsonb,
    error_message TEXT
);

CREATE INDEX idx_exports_visualization ON exports(visualization_id);
```

### Tags

Organizes visualizations with tags.

```sql
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(name)
);

CREATE TABLE visualization_tags (
    visualization_id UUID REFERENCES visualizations(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (visualization_id, tag_id)
);
```

## Indexes and Constraints

### Performance Indexes

```sql
-- Full-text search on visualization input
CREATE INDEX idx_visualizations_text_search ON visualizations
USING gin(to_tsvector('english', input_text));

-- JSON indexes for common queries
CREATE INDEX idx_visualization_settings ON visualizations
USING gin(settings jsonb_path_ops);

CREATE INDEX idx_project_settings ON projects
USING gin(settings jsonb_path_ops);
```

### Foreign Key Constraints

All foreign key constraints include:

- ON DELETE CASCADE for child records
- ON UPDATE CASCADE for key updates

### Check Constraints

```sql
-- Email format validation
ALTER TABLE users
ADD CONSTRAINT email_format
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Status values validation
ALTER TABLE visualizations
ADD CONSTRAINT valid_status
CHECK (status IN ('draft', 'processing', 'completed', 'error', 'deleted'));
```

## Migrations

All schema changes are managed through versioned migrations:

```sql
-- Example migration format
-- migrations/YYYYMMDDHHMMSS_description.sql
BEGIN;
-- Changes here
COMMIT;
```

## Backup and Recovery

- Full database backup: Daily
- Transaction logs: Continuous
- Point-in-time recovery: Supported
- Retention period: 30 days

## Performance Considerations

1. Partitioning

   - Visualizations table partitioned by creation date
   - Exports table partitioned by status

2. Vacuum Schedule

   - Full vacuum: Weekly
   - Analyze: Daily

3. Monitoring
   - Query performance
   - Index usage
   - Table bloat
   - Cache hit ratios

## Security

1. Row-Level Security

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY project_access ON projects
    USING (user_id = current_user_id() OR
           id IN (SELECT project_id FROM collaborators
                 WHERE user_id = current_user_id()));
```

2. Data Encryption
   - Passwords: bcrypt hashed
   - API keys: SHA-256 hashed
   - Sensitive data: encrypted at rest

## Maintenance

1. Regular Tasks

   - Index maintenance
   - Statistics updates
   - Vacuum operations
   - Backup verification

2. Monitoring Queries

```sql
-- Long-running queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query
FROM pg_stat_activity
WHERE state = 'active';

-- Index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes;
```
