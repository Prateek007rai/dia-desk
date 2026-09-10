# Dia Desk — Tasks

## Monorepo Setup
- ✅ create github repo — single repo for everything
- ✅ root package.json with workspaces — tells npm about apps/ and packages/
- ✅ turbo.json — tells turborepo the build order
- ✅ .gitignore — keeps node_modules and .env off github
- ✅ apps/ and packages/ folder structure — skeleton of the monorepo

---

## Frontend Setup
- ✅ next.js 16 in apps/web — base project created with create-next-app
- ✅ fix turbo 2.x workspace error — added packageManager field to root package.json
- ✅ run on localhost:3000 — confirmed working
- ✅ delete default boilerplate in page.tsx — start with a blank page
- [ ] create page folder structure — all the routes the app will have
- [ ] (auth)/login/page.tsx — the login screen
- [ ] (dashboard)/layout.tsx — the shared sidebar + navbar that wraps all pages
- [ ] (dashboard)/dashboard/page.tsx — home screen after login
- [ ] (dashboard)/employees/page.tsx — list of all employees
- [ ] (dashboard)/employees/[id]/page.tsx — individual employee profile
- [ ] (dashboard)/timesheets/page.tsx — weekly time log
- [ ] (dashboard)/leaves/page.tsx — leave applications and status
- [ ] (dashboard)/settings/page.tsx — company and policy config
- [ ] globals.css cleanup — remove unused styles
- [ ] custom fonts — add a proper font (inter or outfit via google fonts)
- [ ] tailwind theme config — custom colors and spacing in tailwind.config

---

## Frontend — Components
- [ ] sidebar — left nav with links to all pages
- [ ] topbar — top bar with user avatar and notifications
- [ ] stat card — reusable card showing a number + label (used on dashboard)
- [ ] data table — table with sort, search, pagination
- [ ] modal — popup dialog used for forms
- [ ] input — styled text input used in all forms
- [ ] button — primary, secondary, danger variants
- [ ] badge — small colored label (e.g. "Pending", "Approved")
- [ ] avatar — user profile picture with fallback initials
- [ ] loading spinner — shown while fetching data
- [ ] empty state — shown when a list has no items
- [ ] pagination — next/prev buttons for tables

---

## Frontend — Auth
- [ ] login form — email and password fields
- [ ] form validation — show errors if fields are empty or wrong
- [ ] api call on submit — POST to /api/auth/login
- [ ] store token — save jwt in localstorage after login
- [ ] redirect — go to /dashboard after successful login
- [ ] protected routes — if no token, redirect to /login (middleware.ts)
- [ ] logout — clear token and redirect to login

---

## Frontend — Dashboard
- [ ] total employees card — fetch count from api
- [ ] pending leaves card — how many leaves waiting for approval
- [ ] hours this week card — total hours logged by logged-in user
- [ ] recent activity — list of latest actions

---

## Frontend — Employees
- [ ] employee list — table of all employees with search and department filter
- [ ] employee row component — one row in the table
- [ ] employee detail — full profile page for a single employee
- [ ] add employee form — admin fills this to create a new employee
- [ ] edit employee — update name, department, role etc
- [ ] deactivate employee — soft delete, does not remove from db

---

## Frontend — Timesheets
- [ ] weekly grid — 7 columns (mon to sun) with hours logged per day
- [ ] add entry form — date, project, task, hours
- [ ] edit / delete entry — only allowed for draft entries
- [ ] submit button — submits the whole week for manager review
- [ ] total hours — live counter of hours logged that week
- [ ] manager view — table of submitted timesheets to approve or reject

---

## Frontend — Leaves
- [ ] balance cards — shows remaining days for paid, sick, casual
- [ ] apply form — type, start date, end date, reason
- [ ] my leaves list — history of all leave requests
- [ ] cancel leave — only for pending requests
- [ ] manager approval list — pending leaves from team members
- [ ] approve / reject — manager clicks a button with optional note

---

## Frontend — API Connection
- [ ] axios instance — base url set, ready to make requests
- [ ] request interceptor — automatically adds auth token to every request
- [ ] response interceptor — if 401 received, log user out
- [ ] react query setup — for caching and syncing server data
- [ ] auth hooks — useLogin, useRegister, useLogout
- [ ] employee hooks — useEmployees, useEmployee, useCreateEmployee
- [ ] timesheet hooks — useTimesheet, useAddEntry, useSubmitWeek
- [ ] leave hooks — useLeaves, useApplyLeave, useReviewLeave

---

## Backend Setup
- [ ] package.json — dependencies: express, mongoose, jwt, bcrypt, cors, helmet, zod
- [ ] tsconfig.json — typescript config for node
- [ ] server.ts — starts the http server on PORT from .env
- [ ] app.ts — express app, registers middleware and routes
- [ ] cors — allow requests from frontend url
- [ ] helmet — adds security headers
- [ ] morgan — logs every incoming request
- ✅ mongodb uri — saved in apps/api/.env
- [ ] mongodb connection — connect to atlas using MONGODB_URI from .env
- [ ] env validation — fail at startup if any required env var is missing
- [ ] confirm api runs on localhost:5000

---

## Backend — Middlewares
- [ ] error handler — catches all errors and sends clean json response
- [ ] jwt auth — verifies token on protected routes
- [ ] role guard — blocks access if user role is not allowed
- [ ] request validator — validates req.body using zod schema

---

## Backend — Auth
- ✅ enums — UserRole, Gender, EmploymentType, EmploymentStatus in src/enums/index.ts
- ✅ user interface — IUser in src/interfaces/user.interface.ts
- ✅ user model — name, email, password (hashed), role, department, joinDate
- ✅ hash password on save — bcrypt pre-save hook in mongoose
- ✅ company enums — CompanyPlan, CompanySize added to enums
- ✅ company interface — ICompany in src/interfaces/company.interface.ts
- ✅ company model — src/models/company.model.ts
- ✅ department model
- [ ] register — create user, return tokens
- [ ] login — check password, return tokens
- [ ] refresh token — issue new access token using refresh token
- [ ] logout — clear refresh token in db
- [ ] get me — return logged-in user's profile
- [ ] test register in postman
- [ ] test login in postman

---

## Backend — Employees
- [ ] get all — paginated list with department and role filter
- [ ] get one — single employee by id
- [ ] create — admin/hr only
- [ ] update — change name, department, designation etc
- [ ] deactivate — set isActive to false
- [ ] test all endpoints in postman

---

## Backend — Timesheets
- [ ] timesheet model — employeeId, date, project, task, hours, status, weekStart
- [ ] add entry — create a draft entry
- [ ] get weekly — fetch all entries for a given week
- [ ] submit week — change all drafts for that week to "submitted"
- [ ] approve — manager sets status to "approved"
- [ ] reject — manager sets status to "rejected"
- [ ] delete entry — only if status is "draft"
- [ ] test all endpoints

---

## Backend — Leaves
- ✅ leave policy model
- [ ] leave model — employeeId, type, startDate, endDate, totalDays, status
- [ ] apply — create new leave request, check for overlaps
- [ ] get my leaves — all leaves for logged-in user
- [ ] get pending — all pending leaves (for managers)
- [ ] manager approve/reject — first level approval
- [ ] hr approve/reject — second level approval
- [ ] cancel — employee cancels their own pending leave
- [ ] test all endpoints

---

## Shared Packages
- [ ] packages/types — Employee, TimesheetEntry, LeaveRequest interfaces
- [ ] packages/types — zod schemas used in both api validation and frontend forms
- [ ] packages/utils — getWeekStart, formatDate, getWorkingDays
- [ ] packages/utils — getInitials, toTitleCase

---

## Deployment
- [ ] deploy apps/web to vercel — connect github repo, auto deploys on push
- [ ] deploy apps/api to render — connect github repo, set start command
- [ ] set render env vars — MONGODB_URI, JWT_SECRET, JWT_REFRESH_SECRET, NODE_ENV
- [ ] set vercel env vars — NEXT_PUBLIC_API_URL pointing to render url
- [ ] test api on render url
- [ ] test frontend on vercel url
- [ ] confirm login flow works on production
- [ ] confirm data loads from real mongodb atlas

---

## Final Polish
- [ ] add loading skeletons on all data tables
- [ ] add error messages when api calls fail
- [ ] test all pages on mobile screen size
- [ ] fix any layout issues
- [ ] review all forms for edge cases
