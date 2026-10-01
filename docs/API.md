# API Documentation

## Base URL

### Local Development

```text
http://localhost:5000/api/v1
```

### Production

```text
https://issue-tracker-d4lv.onrender.com/api/v1
```

## Authentication

### Register

```http
POST /auth/register
```

Creates a new user account.

### Login

```http
POST /auth/login
```

Authenticates a user and returns authentication information.

## Issues

### Get Issues

```http
GET /issues
```

Returns issues available to the authenticated user.

### Create Issue

```http
POST /issues
```

Creates a new issue.

### Update Issue

```http
PATCH /issues/:id
```

Updates an existing issue.

### Delete Issue

```http
DELETE /issues/:id
```

Deletes an existing issue.

### Dashboard Summary

```http
GET /issues/dashboard-summary
```

Returns issue counts and dashboard summary information.

## Comments

### Get Issue Comments

```http
GET /issues/:issueId/comments
```

Returns comments belonging to an issue.

### Create Comment

```http
POST /issues/:issueId/comments
```

Creates a comment for an issue.

Request body:

```json
{
  "text": "Comment text"
}
```

### Delete Comment

```http
DELETE /comments/:id
```

Deletes a comment.

## Users

User endpoints provide the information required for issue assignment and user selection.

## Authentication

Protected endpoints require authentication according to the application's authentication implementation.

## Error Responses

The API returns appropriate HTTP status codes for successful requests, validation errors, authentication failures, missing resources, and server errors.

Example:

```json
{
  "message": "Error message"
}
```
