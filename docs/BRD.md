# Business Requirements Document

## 1. Introduction

The Issue Tracker System is a web-based application for managing software development issues within a project. It allows authenticated users to create, assign, update, track, and discuss issues from a centralized dashboard.

## 2. Project Objective

The objective is to provide a simple issue management system that enables teams to:

- Manage issues in one place
- Assign issues to users
- Track issue status
- Communicate through comments
- Monitor project progress through dashboard statistics

## 3. Scope

The system includes:

- User registration and login
- Issue creation
- Issue editing
- Issue deletion
- Issue assignment
- Issue status management
- Comments on issues
- Dashboard issue counts

## 4. User Roles

### Authenticated User

An authenticated user can:

- Create issues
- View issues
- Edit issues
- Delete issues
- Assign issues
- Change issue status
- Add comments
- Delete comments where permitted

## 5. Functional Requirements

### 5.1 User Registration and Login

Users must be able to register an account and authenticate using their credentials.

### 5.2 Issue Management

Users must be able to create, view, edit, and delete issues.

### 5.3 Issue Assignment

Issues can be assigned to registered users so that responsibility can be tracked.

### 5.4 Status Tracking

Each issue supports the following statuses:

- Open
- In Progress
- Closed

### 5.5 Comments

Users can add comments to issues and remove comments where permitted.

### 5.6 Dashboard

The dashboard provides an overview of the project through issue counts and summary information.

## 6. Non-Functional Requirements

The application should provide:

- Responsive user interface
- Secure authentication
- Persistent database storage
- Loading and error states
- Maintainable frontend and backend architecture
- Remote deployment
- Developer-friendly documentation

## 7. System Architecture

### Frontend

The frontend follows a feature-oriented architecture.

```text
React UI
   ↓
Feature Hooks
   ↓
API Layer
   ↓
Axios
   ↓
Backend API
```

TanStack React Query is used for server-state management.

### Backend

The backend follows a layered architecture.

```text
Route
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Model
   ↓
MongoDB
```

## 8. Technology Stack

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

### Hosting

- Vercel
- Render
- MongoDB

## 9. Deployment

### 9.1 Hosting

The frontend is deployed on Vercel.

The backend API is deployed on Render.

MongoDB provides persistent database storage.

### 9.2 Deployment Architecture

```text
User Browser
     |
     v
Vercel
React Frontend
     |
     | HTTPS API Requests
     v
Render
Express Backend
     |
     v
MongoDB
Database
```

### 9.3 Required Services

The deployed application requires:

- GitHub repository
- Vercel project
- Render service
- MongoDB database
- Required environment variables

### 9.4 Deployment Steps

1. Push the project to GitHub.
2. Configure the frontend project on Vercel.
3. Set the Vercel root directory to `client`.
4. Configure frontend environment variables.
5. Configure the backend service on Render.
6. Configure backend environment variables.
7. Connect the backend to MongoDB.
8. Deploy the backend.
9. Configure the frontend API URL to point to the deployed backend.
10. Deploy the frontend.
11. Verify authentication and application functionality.

### 9.5 Updating the Application

1. Make the required changes locally.
2. Test the changes.
3. Commit the changes to Git.
4. Push the changes to GitHub.
5. Allow the configured deployment services to deploy the new version.
6. Verify the production application.

## 10. Future Enhancements

- Email notifications
- Advanced filtering
- Issue priority
- Due dates
- Activity history
- File attachments
- Role-based permissions
- Team/project management
