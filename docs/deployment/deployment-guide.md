# Deployment Guide

## Overview

This document outlines the deployment process, infrastructure setup, and maintenance procedures for the Visual Text Transformer application.

## Table of Contents

1. [Infrastructure Setup](#1-infrastructure-setup)
2. [Environment Configuration](#2-environment-configuration)
3. [Deployment Process](#3-deployment-process)
4. [Monitoring and Logging](#4-monitoring-and-logging)
5. [Backup and Recovery](#5-backup-and-recovery)
6. [Scaling Guidelines](#6-scaling-guidelines)
7. [Maintenance Procedures](#7-maintenance-procedures)

## 1. Infrastructure Setup

### 1.1 Cloud Infrastructure (AWS)

```terraform
# Main VPC Configuration
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "vtt-${var.environment}-vpc"
    Environment = var.environment
  }
}

# Application Load Balancer
resource "aws_lb" "app" {
  name               = "vtt-${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "vtt-${var.environment}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# RDS Instance
resource "aws_db_instance" "postgres" {
  identifier        = "vtt-${var.environment}-db"
  engine            = "postgres"
  engine_version    = "14.5"
  instance_class    = "db.t3.medium"
  allocated_storage = 100

  backup_retention_period = 7
  multi_az               = true
  skip_final_snapshot    = false

  db_name  = "vtt_${var.environment}"
  username = var.db_username
  password = var.db_password
}

# Redis Cluster
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "vtt-${var.environment}-redis"
  engine              = "redis"
  node_type           = "cache.t3.medium"
  num_cache_nodes     = 2
  parameter_group_name = "default.redis6.x"
  port                = 6379
}
```

### 1.2 Kubernetes Configuration

```yaml
# Deployment Configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vtt-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: vtt
  template:
    metadata:
      labels:
        app: vtt
    spec:
      containers:
      - name: vtt-app
        image: vtt-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5

# Service Configuration
apiVersion: v1
kind: Service
metadata:
  name: vtt-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: vtt
```

## 2. Environment Configuration

### 2.1 Environment Variables

```bash
# Application
NODE_ENV=production
APP_NAME=visual-text-transformer
PORT=3000
API_VERSION=v1

# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname
DB_POOL_MIN=2
DB_POOL_MAX=10

# Redis
REDIS_URL=redis://host:6379
REDIS_PASSWORD=secret

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
SESSION_SECRET=session-secret

# External Services
AI_SERVICE_API_KEY=your-api-key
STORAGE_BUCKET=your-bucket
AWS_REGION=us-west-2

# Monitoring
NEW_RELIC_LICENSE_KEY=your-license-key
SENTRY_DSN=your-sentry-dsn
```

### 2.2 Configuration Management

```typescript
// Config Service
class ConfigService {
  private config: Record<string, any>;

  constructor() {
    this.config = {
      app: {
        name: process.env.APP_NAME,
        port: parseInt(process.env.PORT || '3000'),
        environment: process.env.NODE_ENV,
      },
      database: {
        url: process.env.DATABASE_URL,
        pool: {
          min: parseInt(process.env.DB_POOL_MIN || '2'),
          max: parseInt(process.env.DB_POOL_MAX || '10'),
        },
      },
      redis: {
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD,
      },
    };
  }

  get(key: string): any {
    return _.get(this.config, key);
  }
}
```

## 3. Deployment Process

### 3.1 CI/CD Pipeline (GitHub Actions)

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2

      - name: Build and push Docker image
        run: |
          docker build -t vtt-app .
          docker tag vtt-app:latest ${{ secrets.ECR_REGISTRY }}/vtt-app:latest
          docker push ${{ secrets.ECR_REGISTRY }}/vtt-app:latest

      - name: Deploy to ECS
        run: |
          aws ecs update-service --cluster vtt-cluster \
            --service vtt-service \
            --force-new-deployment
```

### 3.2 Database Migrations

```typescript
// Migration Script
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('visualizations', table => {
    table.uuid('id').primary();
    table.string('type').notNullable();
    table.text('input_text').notNullable();
    table.jsonb('settings').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('visualizations');
}
```

## 4. Monitoring and Logging

### 4.1 Logging Configuration

```typescript
// Winston Logger Setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: { service: 'vtt-app' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

### 4.2 Monitoring Setup

```typescript
// Health Check Endpoint
app.get('/health', (req, res) => {
  const health = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  res.send(health);
});

// Metrics Collection
const metrics = {
  requestCount: new prom.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
  }),
  requestDuration: new prom.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration',
  }),
};
```

## 5. Backup and Recovery

### 5.1 Backup Procedures

```bash
#!/bin/bash
# Database Backup Script

# Set variables
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/postgres"
DB_NAME="vtt_production"

# Create backup
pg_dump $DB_NAME | gzip > "$BACKUP_DIR/backup_$TIMESTAMP.sql.gz"

# Upload to S3
aws s3 cp "$BACKUP_DIR/backup_$TIMESTAMP.sql.gz" \
    "s3://vtt-backups/postgres/backup_$TIMESTAMP.sql.gz"

# Clean old backups
find $BACKUP_DIR -type f -mtime +7 -delete
```

### 5.2 Recovery Procedures

```bash
#!/bin/bash
# Database Recovery Script

# Set variables
BACKUP_FILE=$1
DB_NAME="vtt_production"

# Download from S3 if needed
if [[ $BACKUP_FILE == s3://* ]]; then
  aws s3 cp $BACKUP_FILE ./backup.sql.gz
  BACKUP_FILE="./backup.sql.gz"
fi

# Restore database
gunzip -c $BACKUP_FILE | psql $DB_NAME
```

## 6. Scaling Guidelines

### 6.1 Horizontal Scaling

```yaml
# Horizontal Pod Autoscaler
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: vtt-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: vtt-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

### 6.2 Vertical Scaling

- Database: Upgrade instance size when CPU > 70% or IOPS > 80%
- Redis: Increase node size when memory usage > 70%
- Application: Adjust container resources based on usage patterns

## 7. Maintenance Procedures

### 7.1 Regular Maintenance

```bash
#!/bin/bash
# Maintenance Script

# Update dependencies
npm audit fix
npm update

# Clean up old logs
find /var/log/vtt -type f -mtime +30 -delete

# Vacuum database
psql $DB_NAME -c "VACUUM ANALYZE;"

# Clear Redis cache
redis-cli FLUSHDB

# Check SSL certificates
certbot renew
```

### 7.2 Emergency Procedures

```typescript
// Circuit Breaker Implementation
class CircuitBreaker {
  private failures: number = 0;
  private lastFailure: number = 0;
  private readonly threshold: number = 5;
  private readonly resetTimeout: number = 60000;

  async execute(fn: () => Promise<any>): Promise<any> {
    if (this.isOpen()) {
      throw new Error('Circuit breaker is open');
    }

    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (error) {
      this.recordFailure();
      throw error;
    }
  }

  private isOpen(): boolean {
    if (this.failures >= this.threshold) {
      const now = Date.now();
      if (now - this.lastFailure >= this.resetTimeout) {
        this.reset();
        return false;
      }
      return true;
    }
    return false;
  }

  private recordFailure(): void {
    this.failures++;
    this.lastFailure = Date.now();
  }

  private reset(): void {
    this.failures = 0;
    this.lastFailure = 0;
  }
}
```

### 7.3 Rollback Procedures

```bash
#!/bin/bash
# Rollback Script

VERSION=$1

# Rollback application
kubectl rollout undo deployment/vtt-app --to-revision=$VERSION

# Rollback database if needed
if [ -f "migrations/rollback_${VERSION}.sql" ]; then
  psql $DB_NAME -f "migrations/rollback_${VERSION}.sql"
fi

# Clear caches
redis-cli FLUSHALL

# Notify team
curl -X POST $SLACK_WEBHOOK -d \
  "{'text':'Rollback to version $VERSION completed'}"
```
