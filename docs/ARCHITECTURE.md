# Architecture

## General principle

Keep the architecture simple.

Backend:

Route
→ Controller
→ Service
→ Repository
→ Model
→ MongoDB

Frontend:

Page
→ Feature Hook
→ API
→ Backend

---

# Backend

Backend structure:

src/
├── app.js
├── server.js
│
├── config/
│ └── db.js
│
├── middlewares/
│ ├── authMiddleware.js
│ ├── errorMiddleware.js
│ └── notFoundMiddleware.js
│
├── utils/
│ ├── generateToken.js
│ └── ApiError.js
│
└── modules/
├── auth/
├── users/
├── issues/
└── comments/

---

## Route

Routes only define HTTP endpoints.

Example:

router.post("/", authMiddleware, issueController.createIssue);

Do not put business logic in routes.

---

## Controller

Controllers handle:

- request
- response
- basic request extraction

Example:

const { title, description } = req.body;

Then call the service.

Controllers should remain thin.

---

## Service

Services contain business logic.

Example:

- validate issue creation
- check user
- prepare issue data
- coordinate multiple repositories if necessary

Services can call repositories.

---

## Repository

Repositories communicate with MongoDB.

Repositories should contain database operations.

Example:

- findById
- findAll
- create
- updateById
- deleteById

Do not put business rules in repositories.

---

## Model

Mongoose schema only.

---

# Frontend

Recommended structure:

src/
├── app/
│ ├── App.jsx
│ └── router.jsx
│
├── pages/
│ ├── LoginPage.jsx
│ ├── RegisterPage.jsx
│ └── DashboardPage.jsx
│
├── features/
│ ├── auth/
│ │ ├── api/
│ │ ├── hooks/
│ │ └── components/
│ │
│ ├── issues/
│ │ ├── api/
│ │ ├── hooks/
│ │ └── components/
│ │
│ ├── comments/
│ │ ├── api/
│ │ └── hooks/
│ │
│ └── users/
│ ├── api/
│ └── hooks/
│
├── components/
│ ├── ui/
│ └── layout/
│
└── lib/
├── axios.js
└── queryClient.js

---

## React Query

Use React Query for server state.

Examples:

- issues
- users
- comments
- dashboard summary

Do not duplicate server data into local state.

---

## Local state

Use React useState for UI state.

Examples:

- modal open/close
- selected issue
- search input
- current tab
- form state

Do not introduce Zustand for this project.

---

## Axios

All backend requests should go through the configured Axios client.

The JWT should automatically be attached to protected requests.

---

# Authentication

Login:

Frontend
→ POST /auth/login
→ receive JWT
→ store token
→ authenticated API requests use token

The backend uses:

Authorization: Bearer <token>

---

# Important architectural rule

Do not create a separate repository for every page.

Repositories belong to backend modules/domains.

For example:

issues/
issue.repository.js

The dashboard can consume issue data without requiring a dashboard database model.
