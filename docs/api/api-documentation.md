# API Documentation

## Overview

The Visual Text Transformer API provides programmatic access to text visualization capabilities. This RESTful API supports JSON requests and responses, using standard HTTP methods and status codes.

## Base URL

```
Production: https://api.visualtexttransformer.com/v1
Development: http://localhost:3000/api/v1
```

## Authentication

All API requests require authentication using Bearer tokens:

```http
Authorization: Bearer <your_api_token>
```

## Rate Limiting

- Free tier: 100 requests/hour
- Premium tier: 1000 requests/hour
- Enterprise tier: Custom limits

## Endpoints

### Authentication

#### POST /auth/register

Create a new user account.

Request:

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

Response:

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "token": "jwt_token_here"
}
```

#### POST /auth/login

Authenticate user and get token.

Request:

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Text Processing

#### POST /text/analyze

Analyze text and prepare for visualization.

Request:

```json
{
  "text": "Your input text here",
  "options": {
    "language": "en",
    "maxLength": 10000,
    "preserveFormatting": true
  }
}
```

Response:

```json
{
  "id": "analysis_123",
  "status": "completed",
  "results": {
    "wordCount": 150,
    "keyPhrases": ["example", "text"],
    "sentiment": 0.8,
    "entities": [
      {
        "text": "example",
        "type": "keyword",
        "score": 0.9
      }
    ]
  }
}
```

### Visualization

#### POST /visualizations

Generate a new visualization.

Request:

```json
{
  "textId": "analysis_123",
  "type": "wordcloud",
  "options": {
    "style": "modern",
    "colorScheme": "blue",
    "dimensions": {
      "width": 1920,
      "height": 1080
    }
  }
}
```

Response:

```json
{
  "id": "viz_123",
  "status": "processing",
  "estimatedTime": 15,
  "previewUrl": "https://example.com/preview/viz_123"
}
```

#### GET /visualizations/{id}

Get visualization status and result.

Response:

```json
{
  "id": "viz_123",
  "status": "completed",
  "result": {
    "url": "https://example.com/viz_123",
    "type": "wordcloud",
    "createdAt": "2024-01-20T12:00:00Z",
    "metadata": {
      "dimensions": {
        "width": 1920,
        "height": 1080
      },
      "format": "svg"
    }
  }
}
```

### Export

#### POST /export

Export visualization in specific format.

Request:

```json
{
  "visualizationId": "viz_123",
  "format": "png",
  "options": {
    "quality": "high",
    "scale": 2
  }
}
```

Response:

```json
{
  "id": "export_123",
  "status": "processing",
  "downloadUrl": "https://example.com/download/export_123",
  "expiresAt": "2024-01-21T12:00:00Z"
}
```

### User Management

#### GET /user/profile

Get user profile information.

Response:

```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "plan": "premium",
  "usage": {
    "visualizations": 45,
    "exports": 20,
    "storage": "2.5GB"
  }
}
```

#### PUT /user/profile

Update user profile.

Request:

```json
{
  "name": "John Smith",
  "preferences": {
    "theme": "dark",
    "defaultVisualization": "wordcloud"
  }
}
```

Response:

```json
{
  "id": "user_123",
  "name": "John Smith",
  "preferences": {
    "theme": "dark",
    "defaultVisualization": "wordcloud"
  },
  "updatedAt": "2024-01-20T12:00:00Z"
}
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Detailed error message",
    "details": {
      "field": "specific_field",
      "reason": "validation_failed"
    }
  }
}
```

### Common Error Codes

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Webhooks

### Visualization Complete

```json
{
  "event": "visualization.complete",
  "data": {
    "id": "viz_123",
    "status": "completed",
    "url": "https://example.com/viz_123"
  }
}
```

### Export Complete

```json
{
  "event": "export.complete",
  "data": {
    "id": "export_123",
    "downloadUrl": "https://example.com/download/export_123"
  }
}
```

## SDK Support

- JavaScript/TypeScript
- Python
- Ruby
- PHP
- Java
- Go

## Best Practices

1. Always handle rate limits
2. Implement exponential backoff
3. Cache responses when possible
4. Use compression for large requests
5. Validate input before sending
6. Handle errors gracefully
7. Monitor webhook deliveries
8. Keep authentication tokens secure

## Support

- Documentation: https://docs.visualtexttransformer.com
- Email: api-support@visualtexttransformer.com
- Status: https://status.visualtexttransformer.com
