# API Contract

Base URL:

/api/v1

---

# Authentication

## Register

POST /auth/register

Body:

{
"name": "Alex Lee",
"email": "alex@example.com",
"password": "password123"
}

Response:

{
"success": true,
"data": {
"user": {
"id": "...",
"name": "Alex Lee",
"email": "alex@example.com",
"role": "USER"
},
"token": "..."
}
}

---

## Login

POST /auth/login

Body:

{
"email": "alex@example.com",
"password": "password123"
}

Response:

{
"success": true,
"data": {
"user": {
"id": "...",
"name": "Alex Lee",
"email": "alex@example.com",
"role": "USER"
},
"token": "..."
}
}

---

# Users

## Get users

GET /users

Used for issue assignment.

---

## Get user

GET /users/:id

---

# Issues

## Create issue

POST /issues

Authentication required.

Body:

{
"title": "Fix login bug",
"description": "Login fails when token expires",
"priority": "High",
"status": "Open",
"assignee": "USER_ID"
}

---

## Get issues

GET /issues

Optional query parameters:

?status=Open

?status=In%20Progress

?status=Closed

?assignedTo=USER_ID

?search=login

Parameters can be combined.

---

## Get issue

GET /issues/:id

---

## Update issue

PATCH /issues/:id

Possible fields:

{
"title": "...",
"description": "...",
"status": "In Progress",
"priority": "High",
"assignee": "USER_ID"
}

---

## Delete issue

DELETE /issues/:id

---

# Dashboard

GET /issues/dashboard-summary

Expected response:

{
"success": true,
"data": {
"total": 10,
"open": 4,
"inProgress": 3,
"closed": 3
}
}

---

# Comments

## Get comments

GET /issues/:issueId/comments

---

## Add comment

POST /issues/:issueId/comments

Body:

{
"text": "Confirmed in staging."
}

---

## Delete comment

DELETE /comments/:id

---

# Authentication

Protected endpoints require:

Authorization: Bearer <JWT>
