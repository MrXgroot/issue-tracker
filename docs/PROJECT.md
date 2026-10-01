# Issue Tracker System

## Goal

Build a simple full-stack Issue Tracker System.

The application allows users to:

- Register
- Login
- Create issues
- Edit issues
- Delete issues
- Assign issues to users
- Change issue status
- Add comments
- View dashboard statistics
- Search and filter issues

This is a simple portfolio/project application.

Do NOT over-engineer it.

---

## Technology

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- dotenv
- cors

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- TanStack React Query
- Lucide React

Use JavaScript, NOT TypeScript.

---

## Product

Application name:

Trackr

The dashboard is the main application screen.

The provided HTML prototype is the visual reference for the dashboard.

Do not redesign the application unnecessarily.

Keep the visual language:

- Minimal
- Clean
- Gray/white
- Small typography
- Rounded cards
- Subtle borders
- Simple status badges
- Compact dashboard

---

## Core entities

### User

- id
- name
- email
- password
- role
- createdAt
- updatedAt

### Issue

- id
- title
- description
- status
- priority
- assignee
- createdBy
- createdAt
- updatedAt

### Comment

- id
- issue
- author
- text
- createdAt
- updatedAt

---

## Issue statuses

Only:

- Open
- In Progress
- Closed

## Issue priorities

Only:

- Low
- Medium
- High

---

## Important

The goal is to finish a working application quickly.

Prefer simple working code over abstractions.

Do not introduce:

- Redux
- Zustand
- TypeScript
- unnecessary design patterns
- unnecessary services
- unnecessary libraries
- complex state management
- premature optimization
