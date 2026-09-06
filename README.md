# 🏢 Dia Desk — Employee HRM System
### Turborepo Monorepo | Next.js · Express.js · MongoDB · TypeScript

> A production-grade Employee HRM platform covering Timesheets, Leave Management, Attendance, and Payroll — built as a Turborepo monorepo.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16.3.4, TypeScript, Tailwind CSS, TanStack Query |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT |
| **Monorepo** | Turborepo, npm Workspaces |
| **Validation** | Zod |

---

## 🗂️ Structure

```
dia-desk/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── types/
│   └── utils/
├── package.json
├── turbo.json
└── .gitignore
```

---

## ⚙️ Environment Variables

**`apps/api/.env`**
```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
```

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🛠️ Commands

| Command | Action |
|---|---|
| `npm install` | Install all dependencies |
| `npm run dev` | Start all apps |
| `npm run build` | Build all apps |
