# Environment Variables

This file documents the environment variables required to run the Issue Tracker locally.

## Client

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

The client uses this value as the base URL for API requests.

## Server

Create:

```text
server/.env
```

Add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### PORT

Port on which the Express server runs locally.

### MONGODB_URI

MongoDB connection string used by the backend to connect to the database.

### JWT_SECRET

Secret used by the backend for JWT authentication.

## Production

Production values must be configured through the environment-variable settings of the respective hosting platforms.

Do not commit `.env` files or real credentials to GitHub.

Use the provided `.env.example` files as templates.
