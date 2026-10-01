# UI Specification

The provided Issue Tracker HTML prototype is the visual reference.

Use it as the source of truth for the dashboard design.

---

# Overall style

Application:

Trackr

Visual style:

- Minimal
- Professional
- White background
- Light gray borders
- Gray text
- Black/dark primary buttons
- Small typography
- Rounded corners
- Subtle shadows

Do not introduce colorful dashboards.

---

# Layout

Desktop:

Left sidebar

- Main content

Sidebar contains:

- Trackr logo
- Dashboard
- All Issues
- My Assigned
- Team / Users
- Settings

Bottom of sidebar:

- current user
- role
- logout

---

# Dashboard

Header:

Dashboard

Subtitle:

Overview of project issues and milestones

Right side:

- Search issues
- New Issue button

---

# Summary cards

Four cards:

Total Issues
Open
In Progress
Closed

Each card displays a number.

---

# Issue tabs

Tabs:

- All
- Open
- In Progress
- Closed

Also support:

My Assigned

---

# Issue table

Columns:

- Issue
- Status
- Priority
- Assignee
- Date
- Actions

Issue row should show:

- issue ID
- title
- status badge
- priority
- assignee
- date
- view action
- delete action

---

# Create Issue

Clicking "New Issue" opens a modal.

Fields:

Title
Description
Priority
Assignee
Initial Status

Priority:

- Low
- Medium
- High

Status:

- Open
- In Progress
- Closed

Actions:

Cancel
Create Issue

---

# Issue Details

Clicking an issue opens a detail modal.

Display:

- Issue ID
- Priority
- Title
- Description
- Assignee
- Status controls
- Comments
- Delete Issue
- Done

Status buttons:

Open
In Progress
Closed

---

# Comments

Inside issue details:

Activity & Comments

Display existing comments.

Each comment shows:

- author
- time
- text

At bottom:

text input

- Reply button

  ***

# Responsive behavior

The application must work on smaller screens.

Do not let the desktop sidebar/table destroy the mobile layout.

Use responsive Tailwind classes.

---

# Important

Do not redesign the existing UI unless necessary.

The goal is to convert the prototype into a real React application connected to the backend.
