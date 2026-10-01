# TODO

## Current State

### Backend

Already created:

- Express server
- MongoDB connection
- Environment configuration
- Authentication
- User model
- User repository
- Auth service
- Auth controller
- JWT generation
- Authentication middleware
- Issue model
- Issue repository
- Issue service
- Issue controller
- Issue routes
- Comment model
- Comment repository
- Comment service
- Comment controller
- Comment routes
- Dashboard summary endpoint
- Error middleware
- 404 middleware

Backend currently runs successfully.

---

### Frontend

Already started:

- React + Vite
- Tailwind
- React Router
- Axios
- React Query
- Lucide
- Login page
- Axios API client
- Login API integration

Login currently calls:

POST /api/v1/auth/login

JWT and user are stored in localStorage.

---

# Remaining Work

## 1. Authentication

Complete:

- Login
- Register
- Persist authentication
- Protected routes
- Logout
- Axios JWT interceptor
- Get current user if required

---

## 2. Dashboard

Build dashboard from the provided HTML prototype.

Connect:

GET /issues

GET /issues/dashboard-summary

Dashboard must show:

- Total Issues
- Open
- In Progress
- Closed

---

## 3. Issue list

Implement:

- fetch issues
- render table
- status badges
- priority
- assignee
- date
- view action
- delete action

---

## 4. Search

Connect search input to issue API.

Use:

GET /issues?search=value

Debouncing is optional.

Do not over-engineer search.

---

## 5. Filters

Implement:

All
Open
In Progress
Closed

Use:

GET /issues?status=value

---

## 6. My Assigned

Implement:

GET /issues?assignedTo=currentUserId

---

## 7. Create Issue

Build modal.

Submit:

POST /issues

Fields:

- title
- description
- priority
- status
- assignee

After successful creation:

- close modal
- refresh issue list
- refresh dashboard counts

---

## 8. Issue details

When an issue is selected:

Fetch:

GET /issues/:id

Show:

- ID
- title
- description
- priority
- assignee
- status

---

## 9. Edit issue

Allow editing:

- title
- description
- priority
- assignee

Use:

PATCH /issues/:id

---

## 10. Status

Allow:

Open
In Progress
Closed

Use:

PATCH /issues/:id

Only send the changed status.

---

## 11. Comments

Load:

GET /issues/:issueId/comments

Add:

POST /issues/:issueId/comments

Delete:

DELETE /comments/:id

After adding a comment:

refresh comments.

---

## 12. Delete issue

Use:

DELETE /issues/:id

After deletion:

- close detail modal
- refresh issue list
- refresh dashboard

---

# Final flow

User opens application

↓

Login

↓

Dashboard

↓

View issue list

↓

Create issue

↓

Open issue

↓

Change status / assignment

↓

Add comments

↓

Delete/edit issue

↓

Dashboard counts update

---

# Development rules

Do not rewrite working backend code without a reason.

Do not introduce TypeScript.

Do not introduce Redux or Zustand.

Do not create unnecessary abstractions.

Do not create fake data once API integration is available.

Do not duplicate API state into useState.

Use React Query for server data.

Use useState for UI state.

Keep components reasonably small.

Prioritize completing the working application over perfect architecture.
