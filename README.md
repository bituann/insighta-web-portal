# Insighta Web Portal

A web portal for the Insighta Labs Intelligent Query System — built for non-technical users to browse, search, filter, and export profile data.

🔗 [Live Demo](https://insighta-web-portal-beta.vercel.app)

---

## Features

- GitHub OAuth authentication with HTTP-only cookies
- Role-based access control (admin / analyst)
- Dashboard with profile metrics
- Profiles list with filters, sorting, and pagination
- Profile detail view
- Natural language profile search
- Account page with session management
- Automatic token refresh on expiry

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Prerequisites

- Node.js 20+
- The [Insighta backend](https://github.com/bituann/insighta-backend) running and accessible

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bituann/insighta-web-portal.git
cd insighta-web-portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file at the root:

```env
API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Authentication Flow

1. User clicks **Sign in with GitHub**
2. Browser redirects to GitHub OAuth
3. GitHub redirects to the backend callback
4. Backend sets HTTP-only cookies and redirects to `/api/auth/callback`
5. Next.js reads the cookies, fetches the user role, and redirects to `/dashboard`

Tokens are stored in HTTP-only cookies — never accessible via JavaScript.

---

## Project Structure

```
insighta-web-portal/
├── .github/
│   └── workflows/
│       └── ci.yml
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── callback/
│   │       │   └── route.ts
│   │       ├── logout/
│   │       │   └── route.ts
│   │       └── unauthorized/
│   │           └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── profiles/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── search/
│   │   └── page.tsx
│   ├── account/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── BackButton.tsx
│   ├── LogoutButton.tsx
│   ├── Pagination.tsx
│   ├── ProfileFilters.tsx
│   └── SearchInput.tsx
├── lib/
│   ├── api.ts
│   └── types.ts
├── proxy.ts
├── next.config.ts
└── package.json
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `API_BASE_URL` | Backend base URL (server-side) |
| `NEXT_PUBLIC_API_BASE_URL` | Backend base URL (client-side) |

---

## CI/CD

GitHub Actions runs on every pull request to `main`:

- **Lint** — ESLint check
- **Build** — Next.js production build (runs only if lint passes)

---

## Related Repositories

- [insighta-backend](https://github.com/bituann/intelligence-query-engine) — Spring Boot API
- [insighta-cli](https://github.com/bituann/insighta-cli) — CLI tool