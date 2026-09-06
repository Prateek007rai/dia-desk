# 🏢 Dia Desk — Employee HRM System
### Turborepo Monorepo | Next.js · Express.js · MongoDB · TypeScript

> A production-grade Employee HRM platform covering Timesheets, Leave Management, Attendance, and Payroll — built as a Turborepo monorepo to learn modern full-stack architecture.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14+ (App Router), TypeScript, Tailwind CSS, TanStack Query |
| **Backend** | Node.js + Express.js, TypeScript, MVC + Service Architecture |
| **Database** | MongoDB (Mongoose ODM) — URL provided separately via `.env` |
| **Auth** | JWT (Access + Refresh Tokens) |
| **Monorepo** | Turborepo + npm Workspaces |
| **Validation** | Zod (shared between FE & BE via `@repo/types`) |

---

## 🤔 Can I Use Python or Go as a Backend Too?

**Yes! Turborepo is completely language-agnostic.**

In a monorepo, you can have multiple backend services written in different languages. Each `apps/` folder is its own independent app. Turborepo just orchestrates the tasks.

### Example Multi-Backend Setup (Future):

```
apps/
├── api/              ← Node.js + Express (Main API — auth, HRM, timesheets, leaves)
├── analytics/        ← Python + FastAPI   (Reports, data analytics, ML predictions)
└── notifications/    ← Go + Fiber         (High-speed real-time push notifications)
```

**Recommendation for now:** Start with Node.js/Express as your single backend. Once you're comfortable, add a Python or Go microservice for a specific feature (e.g., analytics reports). This is how real companies scale.

---

## 📐 Monorepo Architecture

```
dia-desk/  (1 GitHub Repo)
│
├── apps/
│   ├── web/                    # Next.js 14+ Frontend (TypeScript)
│   └── api/                    # Node.js + Express.js Backend (TypeScript)
│
├── packages/
│   ├── types/                  # Shared TypeScript interfaces + Zod schemas
│   └── utils/                  # Shared helpers (date formatters, constants)
│
├── turbo.json                  # Turborepo pipeline & caching config
├── package.json                # Root — npm workspaces definition
└── README.md
```

---

## 🗂️ Folder Structure Detail

### Backend — `apps/api/` (MVC + Service Architecture)

```
apps/api/
└── src/
    ├── controllers/            # Handle HTTP request/response (thin layer)
    │   ├── auth.controller.ts
    │   ├── employee.controller.ts
    │   ├── timesheet.controller.ts
    │   └── leave.controller.ts
    │
    ├── services/               # Business logic lives here (fat layer)
    │   ├── auth.service.ts
    │   ├── employee.service.ts
    │   ├── timesheet.service.ts
    │   └── leave.service.ts
    │
    ├── models/                 # Mongoose schemas & MongoDB models
    │   ├── user.model.ts
    │   ├── employee.model.ts
    │   ├── timesheet.model.ts
    │   └── leave.model.ts
    │
    ├── routes/                 # Express route definitions
    │   ├── auth.routes.ts
    │   ├── employee.routes.ts
    │   ├── timesheet.routes.ts
    │   └── leave.routes.ts
    │
    ├── middlewares/            # Auth guard, error handler, request validation
    │   ├── auth.middleware.ts
    │   ├── error.middleware.ts
    │   └── validate.middleware.ts
    │
    ├── config/
    │   ├── db.ts               # MongoDB connection (Mongoose)
    │   └── env.ts              # Typed env variables (using Zod)
    │
    ├── app.ts                  # Express app setup, middleware mounting
    └── server.ts               # Entry point — starts HTTP server
```

> **MVC + Service Pattern:**
> - **Controller** → receives request, calls service, sends response
> - **Service** → all business logic, calls model
> - **Model** → Mongoose schema, talks to MongoDB

### Frontend — `apps/web/` (Next.js App Router)

```
apps/web/
└── src/
    ├── app/
    │   ├── (auth)/
    │   │   └── login/          # Login page
    │   ├── (dashboard)/
    │   │   ├── dashboard/      # Overview + quick stats
    │   │   ├── timesheets/     # Weekly timesheet grid + timer
    │   │   ├── leaves/         # Leave form + balance + approvals
    │   │   ├── employees/      # Employee directory + profiles
    │   │   └── settings/       # Company & policy settings
    │   └── layout.tsx
    │
    ├── components/             # Page-specific components
    ├── lib/
    │   ├── api.ts              # Axios instance with auth interceptors
    │   └── queryClient.ts      # TanStack Query setup
    │
    └── hooks/                  # Custom React hooks (useAuth, useTimesheets...)
```

### Shared Packages — `packages/`

```
packages/
├── types/
│   ├── src/
│   │   ├── employee.types.ts   # Employee, Department, Role interfaces
│   │   ├── timesheet.types.ts  # TimesheetEntry, WeeklyLog interfaces
│   │   ├── leave.types.ts      # LeaveRequest, LeaveBalance interfaces
│   │   └── index.ts
│   └── package.json
│
└── utils/
    ├── src/
    │   ├── date.utils.ts       # Format dates, calculate working days
    │   ├── string.utils.ts     # Name formatting, slugify
    │   └── index.ts
    └── package.json
```

---

## 🌟 HRM Features

### 1. 👥 Employee Management
- RBAC: Admin, HR Manager, Department Manager, Employee
- Employee profiles, departments, designations, reporting hierarchy

### 2. ⏱️ Timesheet Tracking
- Clock in / clock out with live timer
- Daily task logs linked to projects
- Weekly timesheet submission → Manager approval

### 3. 🏖️ Leave Management
- Apply for Paid / Sick / Casual / Unpaid leave
- Quota & balance tracking per employee
- Multi-level approval: Manager → HR

### 4. 📊 Attendance & Reports
- Daily attendance log
- Export reports (CSV / PDF) for payroll
- Dashboard analytics for HR & Executives

---

## 🚀 Development Phases

### Phase 1 — Monorepo Foundation
- [ ] Initialize root `package.json` with npm workspaces
- [ ] Configure `turbo.json` pipelines
- [ ] Set up shared `packages/types` and `packages/utils`

### Phase 2 — Backend API (`apps/api`)
- [ ] Express.js server with TypeScript + `ts-node-dev`
- [ ] MongoDB connection via Mongoose
- [ ] JWT Auth (register, login, refresh token)
- [ ] Employee CRUD endpoints
- [ ] Timesheet endpoints (log, submit, approve)
- [ ] Leave endpoints (apply, approve, balance check)

### Phase 3 — Frontend (`apps/web`)
- [ ] Next.js 14 App Router setup with TypeScript
- [ ] Tailwind CSS + Shadcn UI components
- [ ] Auth pages (Login, protected routes)
- [ ] Dashboard overview page
- [ ] Timesheet weekly grid with clock timer
- [ ] Leave application & approval flow
- [ ] Employee directory & profile pages

### Phase 4 — Polish & Integrate
- [ ] Connect frontend to backend via Axios + TanStack Query
- [ ] Role-based UI (admin sees different menus than employee)
- [ ] CSV/PDF export for reports
- [ ] Dark mode

---

## 🛠️ Commands Reference

| Command | Action |
|---|---|
| `npm run dev` | Start all apps (web + api) concurrently |
| `npm run dev --workspace=apps/web` | Start only frontend |
| `npm run dev --workspace=apps/api` | Start only backend |
| `npm run build` | Build all apps in correct dependency order |
| `npm run lint` | Lint all workspaces |
| `npm run type-check` | TypeScript check across all workspaces |

---

## ⚙️ Environment Variables

Create `.env` files in each app directory:

**`apps/api/.env`**
```env
PORT=5000
MONGODB_URI=          # ← Add your MongoDB Atlas URL here
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
```

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 💡 Key Turborepo Concepts

| Concept | What It Means |
|---|---|
| `dependsOn: ["^build"]` | Build shared packages BEFORE apps that use them |
| `cache: false` | Don't cache dev server — it's persistent |
| `persistent: true` | Keep the task running (dev servers) |
| `--filter web` | Run command only in the `web` workspace |
| Cache hit | Code unchanged → Turborepo reuses last build instantly |

---

## 📝 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Prateek007rai/dia-desk.git
cd dia-desk

# 2. Install all dependencies (from root)
npm install

# 3. Add your MongoDB URL to apps/api/.env

# 4. Start everything
npm run dev
```

Happy coding! 🚀
