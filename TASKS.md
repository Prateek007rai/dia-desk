# 📋 Dia Desk — Task Board

> **How this works:**
> - 🤖 = I set it up for you (scaffolding, config, boilerplate)
> - 👨‍💻 = You build it (actual feature code, learning by doing)
> - ✅ = Done
> - 🔄 = In progress
> - ⏳ = Not started yet

---

## ✅ Phase 1 — Monorepo Skeleton
| Task | Who | Status |
|---|---|---|
| Create GitHub repo `dia-desk` | 👨‍💻 You | ✅ Done |
| Root `package.json` with workspaces | 🤖 Me | ✅ Done |
| `turbo.json` pipeline config | 🤖 Me | ✅ Done |
| `.gitignore` | 🤖 Me | ✅ Done |
| `apps/` and `packages/` folders | 🤖 Me | ✅ Done |
| First push to GitHub | 👨‍💻 You | ✅ Done |

---

## ✅ Phase 2 — Frontend Base (Next.js 16)
| Task | Who | Status |
|---|---|---|
| Run `create-next-app` in `apps/web` | 🤖 Me | ✅ Done |
| Confirm it runs on `localhost:3000` | 👨‍💻 You | ⏳ |
| Delete the default boilerplate in `page.tsx` | 👨‍💻 You | ⏳ |

> **Your task:** Open terminal → `cd apps/web` → `npm run dev` → open `localhost:3000`

---

## ⏳ Phase 3 — Frontend Page Structure
| Task | Who | Status |
|---|---|---|
| Create App Router folder structure | 🤖 Me | ⏳ |
| `(auth)/login/page.tsx` — Login page shell | 👨‍💻 You | ⏳ |
| `(dashboard)/layout.tsx` — Sidebar layout shell | 👨‍💻 You | ⏳ |
| `dashboard/page.tsx` — Empty dashboard page | 👨‍💻 You | ⏳ |
| `employees/page.tsx` — Empty employees page | 👨‍💻 You | ⏳ |
| `timesheets/page.tsx` — Empty timesheets page | 👨‍💻 You | ⏳ |
| `leaves/page.tsx` — Empty leaves page | 👨‍💻 You | ⏳ |

---

## ⏳ Phase 4 — Backend Base (Express.js)
| Task | Who | Status |
|---|---|---|
| `package.json` for `apps/api` | 🤖 Me | ⏳ |
| `tsconfig.json` for `apps/api` | 🤖 Me | ⏳ |
| `src/app.ts` — Express app setup | 🤖 Me | ⏳ |
| `src/server.ts` — Entry point | 🤖 Me | ⏳ |
| `src/config/db.ts` — MongoDB connection | 🤖 Me | ⏳ |
| `src/config/env.ts` — Typed env vars | 🤖 Me | ⏳ |
| Test API runs on `localhost:5000` | 👨‍💻 You | ⏳ |
| Add `/api/health` route yourself | 👨‍💻 You | ⏳ |

> **Your task:** After setup, add a simple health check route in `src/routes/health.routes.ts`
> ```ts
> router.get('/health', (req, res) => {
>   res.json({ status: 'ok' })
> })
> ```

---

## ⏳ Phase 5 — Auth (Backend)
| Task | Who | Status |
|---|---|---|
| `User` Mongoose model | 🤖 Me | ⏳ |
| Auth service (register/login logic) | 🤖 Me | ⏳ |
| Auth controller (HTTP layer) | 🤖 Me | ⏳ |
| Auth routes | 🤖 Me | ⏳ |
| JWT middleware | 🤖 Me | ⏳ |
| Test register with Postman/Thunder Client | 👨‍💻 You | ⏳ |
| Test login with Postman/Thunder Client | 👨‍💻 You | ⏳ |

---

## ⏳ Phase 6 — Auth (Frontend)
| Task | Who | Status |
|---|---|---|
| Axios instance with interceptors | 🤖 Me | ⏳ |
| Login form UI | 👨‍💻 You | ⏳ |
| Connect login form to API | 👨‍💻 You | ⏳ |
| Store token in localStorage | 👨‍💻 You | ⏳ |
| Redirect to dashboard after login | 👨‍💻 You | ⏳ |

---

## ⏳ Phase 7 — Employee Management
| Task | Who | Status |
|---|---|---|
| Employee model (Mongoose) | 🤖 Me | ⏳ |
| Employee CRUD API | 🤖 Me | ⏳ |
| Employee list page UI | 👨‍💻 You | ⏳ |
| Employee profile page UI | 👨‍💻 You | ⏳ |

---

## ⏳ Phase 8 — Timesheets
| Task | Who | Status |
|---|---|---|
| Timesheet model & API | 🤖 Me | ⏳ |
| Weekly grid UI | 👨‍💻 You | ⏳ |
| Clock in/out button | 👨‍💻 You | ⏳ |

---

## ⏳ Phase 9 — Leave Management
| Task | Who | Status |
|---|---|---|
| Leave model & API | 🤖 Me | ⏳ |
| Leave application form UI | 👨‍💻 You | ⏳ |
| Leave balance card UI | 👨‍💻 You | ⏳ |
| Approval flow UI (manager view) | 👨‍💻 You | ⏳ |

---

## 💡 Ground Rules

1. **I scaffold, you code features** — I set up the boring config. You write the UI and connect things.
2. **One phase at a time** — Don't move to the next phase until the current one works.
3. **Test as you go** — Every phase ends with you testing it manually before we move on.
4. **Ask questions freely** — If something doesn't make sense, ask before coding.
