# Issue Tracker

A full-stack issue tracking system for creating, assigning, updating, and monitoring software development issues. The application provides authentication, issue management, user assignment, status tracking, comments, and a dashboard with project statistics.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Application Flow](#application-flow)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Issue Management](#issue-management)
- [Comments](#comments)
- [Dashboard](#dashboard)
- [State Management](#state-management)
- [Deployment](#deployment)
- [Production Configuration](#production-configuration)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Live Application](#live-application)
- [Repository](#repository)

## Overview

The Issue Tracker is designed to provide a simple workflow for managing issues within a software project.

Authenticated users can create issues, assign them to users, change their status, edit or delete them, and communicate through comments. The dashboard provides a high-level overview of the project's issues.

The project is split into two applications:

- `client` - React/Vite frontend
- `server` - Node.js/Express backend

MongoDB is used as the persistent database.

## Features

### Authentication

- User registration
- User login
- Authentication using JWT
- Protected application functionality
- Logout

### Issue Management

- Create issues
- View issues
- Edit issues
- Delete issues
- Assign issues to users
- Track issue status

Supported statuses:

- Open
- In Progress
- Closed

### Comments

- View comments for an issue
- Add comments
- Delete comments where permitted
- Optimistic UI updates for comment actions
- Server synchronization through TanStack React Query

### Dashboard

The dashboard provides project-level issue information, including issue counts and summary information.

### User Assignment

Users can be selected when assigning issues, allowing responsibility for an issue to be tracked.

### Responsive UI

The frontend is designed to work across desktop and smaller screen sizes using responsive Tailwind CSS layouts.

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- TanStack React Query
- Axios
- Tailwind CSS
- Lucide React

### Backend

- Node.js
- Express
- JavaScript
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS

### Deployment

- Vercel - frontend
- Render - backend API
- MongoDB - database
- GitHub - source control

## Architecture

The project follows a feature-oriented frontend structure and a layered backend structure.

### Frontend Architecture

The frontend separates features and keeps server-state management inside TanStack React Query.

```text
UI Components
      |
      v
Feature Hooks
      |
      v
API Functions
      |
      v
Axios
      |
      v
Express API
```

The general responsibility of each layer is:

- Components: render UI and collect user interaction
- Hooks: connect UI to application/server state
- API functions: communicate with backend endpoints
- TanStack React Query: manage server state, caching, mutations, and synchronization

### Backend Architecture

The backend follows a layered structure:

```text
HTTP Request
     |
     v
Route
     |
     v
Controller
     |
     v
Service
     |
     v
Repository
     |
     v
Mongoose Model
     |
     v
MongoDB
```

Responsibilities:

#### Routes

Define HTTP endpoints and connect them to controllers.

#### Controllers

Handle HTTP requests and responses.

#### Services

Contain business logic and coordinate application operations.

#### Repositories

Handle database access.

#### Models

Define MongoDB/Mongoose data structures.

## Project Structure

The project is organized as a client/server application.

```text
issue-tracker/
│
├── client/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── issues/
│   │   │   ├── comments/
│   │   │   └── users/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── lib/
│   │   └── ...
│   ├── .env.example
│   ├── package.json
│   ├── vercel.json
│   └── index.html
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── ...
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── BRD.md
│   └── API.md
│
├── .gitignore
└── README.md
```

The exact internal folder names may evolve as the application is maintained, while the responsibility boundaries remain the same.

## Application Flow

A typical issue workflow is:

```text
User
  |
  v
Login
  |
  v
Dashboard
  |
  v
Create Issue
  |
  v
Assign User
  |
  v
Open
  |
  v
In Progress
  |
  v
Closed
```

Comments provide communication alongside the issue lifecycle.

## Getting Started

### Prerequisites

Install the following before running the project locally:

- Node.js
- npm
- MongoDB or access to a MongoDB database
- Git

Verify Node.js and npm:

```bash
node --version
npm --version
```

## Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd issue-tracker
```

## Install Dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

## Environment Variables

### Client

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Server

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

Do not commit real `.env` files or secrets to GitHub.

Example environment files are provided in:

```text
client/.env.example
server/.env.example
```

## Running the Application

### Start the Backend

From the `server` directory:

```bash
npm run dev
```

If the project uses a different development script in `server/package.json`, use the script defined there.

The local API is expected to run at:

```text
http://localhost:5000
```

### Start the Frontend

From the `client` directory:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL in the terminal.

## API Overview

The API is versioned under:

```text
/api/v1
```

### Local Base URL

```text
http://localhost:5000/api/v1
```

### Production Base URL

```text
https://issue-tracker-d4lv.onrender.com/api/v1
```

Detailed endpoint information is available in:

```text
docs/API.md
```

### Main API Areas

```text
Authentication
    /auth

Issues
    /issues

Comments
    /issues/:issueId/comments
    /comments/:id

Dashboard
    /issues/dashboard-summary
```

The exact request and response contracts should be treated according to the current backend implementation.

## Authentication

Authentication is implemented using JWT.

The general flow is:

```text
Register
   |
   v
Login
   |
   v
Authentication Token
   |
   v
Authenticated API Requests
```

Protected operations require an authenticated user.

Passwords are handled by the backend using bcryptjs rather than being stored as plain text.

## Issue Management

The issue management workflow supports:

### Create

Users can create a new issue with the required issue information.

### View

Users can view available issues through the issue management interface.

### Edit

Existing issues can be updated.

### Delete

Existing issues can be deleted.

### Assign

An issue can be assigned to a registered user.

### Status

Issues can move between:

```text
Open
In Progress
Closed
```

## Comments

Comments belong to individual issues.

The client communicates with the following endpoints:

```text
GET  /issues/:issueId/comments
POST /issues/:issueId/comments
DELETE /comments/:id
```

Creating a comment sends:

```json
{
  "text": "Comment text"
}
```

The frontend uses TanStack React Query to manage comment server state and synchronize the UI with the backend.

## Dashboard

The dashboard provides an overview of project issues through summary/count information.

The dashboard communicates with the backend summary endpoint and presents the information in the application UI.

## State Management

TanStack React Query is used for server state.

It provides:

- Query caching
- Query invalidation
- Mutation handling
- Loading states
- Error states
- Server synchronization
- Optimistic updates where appropriate

Local React state is used for UI concerns such as:

- Modal visibility
- Form input
- Selected items
- Temporary UI state

The application avoids duplicating server state unnecessarily.

## Deployment

The application uses separate hosting for the frontend and backend.

```text
                    Internet
                       |
                       v
                ┌─────────────┐
                │   Vercel    │
                │ React/Vite  │
                └──────┬──────┘
                       |
                       | HTTPS API
                       v
                ┌─────────────┐
                │   Render    │
                │ Express API │
                └──────┬──────┘
                       |
                       v
                ┌─────────────┐
                │   MongoDB   │
                │  Database   │
                └─────────────┘
```

### Frontend Deployment

The frontend is deployed using Vercel.

The Vercel project uses:

```text
Root Directory: client
```

The client includes a Vercel rewrite configuration so that React Router routes can be handled correctly when the browser directly loads or refreshes a client-side route.

### Backend Deployment

The backend is deployed using Render.

The backend requires the following environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

The actual production values must be configured in Render and must not be committed to Git.

### Database

The backend connects to MongoDB using the configured MongoDB connection string.

### Deployment Process

1. Commit changes locally.
2. Push the changes to GitHub.
3. Vercel builds and deploys the frontend from the `client` directory.
4. Render builds and deploys the backend from the server application.
5. The backend connects to MongoDB using its configured environment variables.
6. Verify the production frontend and API after deployment.

### Updating the Application

```text
Make Change
    ↓
Test Locally
    ↓
Git Commit
    ↓
Git Push
    ↓
Vercel / Render Deployment
    ↓
Production Verification
```

## Production Configuration

The production frontend must use the deployed backend API URL.

The production backend must:

- Have a valid MongoDB connection
- Have a secure JWT secret
- Allow the deployed frontend origin through CORS
- Have all required environment variables configured

The production frontend is currently hosted on Vercel.

The production backend is currently hosted on Render.

## CORS

The backend uses CORS configuration to control which frontend origins can access the API.

Local development requires the frontend origin:

```text
http://localhost:5173
```

The production frontend origin must also be allowed by the backend.

If the Vercel deployment URL changes, the backend CORS configuration must be updated accordingly unless a stable custom domain is used.

## Development Workflow

A recommended development workflow is:

```text
Create Feature
    ↓
Implement Frontend
    ↓
Implement API
    ↓
Implement Backend Logic
    ↓
Test Locally
    ↓
Fix Errors
    ↓
Commit
    ↓
Push
    ↓
Verify Production
```

Use focused commits that describe the change being made.

Examples:

```text
feat(issues): add issue assignment
fix(comments): handle optimistic cache updates correctly
docs: add project deployment documentation
```

## Troubleshooting

### CORS Error

If the browser reports a CORS error:

1. Verify the frontend URL.
2. Verify the backend CORS configuration.
3. Confirm the frontend origin is allowed.
4. Confirm the frontend is using the correct backend API URL.

### API Not Responding

Check:

- Backend server is running
- Render deployment is healthy
- API URL is correct
- MongoDB connection is available

### Database Connection Error

Check:

- `MONGODB_URI`
- MongoDB availability
- Database network/access configuration
- Backend environment variables

### Vercel Route Returns 404

For React Router routes, verify that the Vercel rewrite configuration is present in:

```text
client/vercel.json
```

Expected configuration:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Security Notes

- Never commit `.env` files.
- Never commit real database credentials.
- Never commit production JWT secrets.
- Use secure secrets in deployment platform environment variables.
- Validate authenticated requests on the backend.
- Do not trust client-side authorization checks alone.

## Future Improvements

Potential future enhancements include:

- Issue priorities
- Due dates
- Advanced filtering and search
- Email notifications
- Activity history
- File attachments
- Role-based permissions
- Team/project management
- Automated testing expansion
- Stable custom production domain

## Live Application

Production frontend:

```text
https://issue-tracker-dun-kappa.vercel.app
```

Production API:

```text
https://issue-tracker-d4lv.onrender.com/api/v1
```

> Update the frontend URL above if the final Vercel deployment uses a different stable production URL before submitting the project.

## Repository

GitHub repository:

```text
<YOUR_GITHUB_REPOSITORY_URL>
```

Replace the placeholder with the final GitHub repository URL before submission.

## Documentation

Additional project documentation:

- [Business Requirements Document](docs/BRD.md)
- [API Documentation](docs/API.md)

## License

This project was developed as part of a technical assessment.
