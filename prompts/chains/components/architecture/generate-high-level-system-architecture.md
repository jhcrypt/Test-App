# Architecture Design Generator

1. Review Inputs

- Analyze core requirements
- Review technology stack
- Identify key system capabilities

2. Determine Architecture Style
   Based on requirements and tech stack, recommend architecture pattern, for example:

- Layered/N-tier
- Microservices
- Event-driven
- Modular monolith
- Serverless
- Client-server
- Pipeline
- Library

Present recommendation with rationale.

3. Define Core Components
   For each major requirement:

- Map to system component
- Assign technology from stack
- Define component responsibilities
- Establish component boundaries

4. Design Component Relationships

- Define data flow
- Establish communication patterns
- Identify integration points
- Map dependencies

5. Generate Architecture Document

# System Architecture

## Overview

[High-level architecture description]

## Core Components

[For each component]:

- Purpose
- Technologies used
- Key responsibilities
- Integration points

## Component Relationships

[Interaction patterns and data flow]

## Project Structure

```plaintext
project/
├── [component1]/
│   ├── core files
│   └── tests
├── [component2]/
│   ├── core files
│   └── tests
└── shared/
    └── common utilities
```

## Technology Mapping

[How tech stack items map to components]

## Development Guidelines

Component boundaries
Communication patterns
State management
Error handling
