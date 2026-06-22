# PaviTech Employee Hub

A corporate internal-tools web app built with React.js and Framer Motion — Managerial Project III.

A frontend-only productivity hub that any company could plug into their internal tools: employees can sign in, check their dashboard, manage meetings on a calendar, run a personal to-do list, view their profile, and see basic analytics on their own activity.

---

## 🛠️ Tools & Libraries Used

| Tool | Why it's here |
|---|---|
| **React.js** | Core UI library — components, state, and rendering |
| **Vite** | Dev server + build tool. Much faster hot-reload than Create React App |
| **Framer Motion** | All animations — page transitions, hover/tap feedback, list enter/exit, staggered reveals |
| **React Router DOM** | Client-side routing between pages (Home, Sign In, Dashboard, Tasks, etc.) without full page reloads |
| **react-calendar** | The calendar UI on the Meetings page, customized with CSS and wrapped in Framer Motion |
| **localStorage (browser API)** | Acts as a lightweight "backend" — persists tasks, meetings, and user info across refreshes, no server needed |

### React hooks used
- `useState` — form inputs, task/meeting lists, animation replay keys
- `useEffect` — syncing state to `localStorage` whenever tasks/meetings change
- `useNavigate` — programmatic redirects (e.g. after login, after logout, 404 → home)
- `useLocation` — used to detect route changes so Framer Motion knows when to animate a page transition

---

## ✨ Most useful part of the library (Framer Motion)

The single most useful feature was `AnimatePresence`, paired with the `exit` prop. Normal CSS transitions can only animate something *appearing* — once a React element unmounts, it's just gone instantly. `AnimatePresence` keeps the element around just long enough to play its `exit` animation before removing it. That's what makes the to-do list items, meeting cards, and entire page transitions feel like they're sliding/fading away instead of snapping out of existence.

Combined with `variants` and `staggerChildren`, it also made multi-card layouts (dashboard stats, feature cards, employee info cards) animate in one after another with a single parent prop, instead of hand-writing a delay for every card.

---


## 🚀 Features

- **Authentication (frontend-only)** — Sign up and sign in, credentials stored in `localStorage` (no real backend, by design — this is a frontend project)
- **Dashboard** — Personalized greeting based on time of day, live stats (meetings, pending/completed tasks, productivity %), upcoming meetings preview
- **Calendar** — Add/delete meetings per date, mark them upcoming/completed/cancelled, all persisted
- **To-Do List** — Full CRUD: create, edit, delete, and toggle-complete tasks, persisted
- **Employee Profile** — Static-but-styled profile, employment details, performance summary, company overview
- **Analytics** — Visual breakdown of task completion and meeting status using a pie chart and animated bars
- **404 Page** — Friendly animated "page not found" screen for any unmatched route, with a button back home

---

## 🧑‍💻 Running the project locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).
