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

