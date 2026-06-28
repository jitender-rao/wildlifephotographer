# CLAUDE.md — Wild Wanderings by Sudiip

This file governs how Claude Code behaves in this project.
All rules here override Claude's default behavior.

---

## Project Overview

**Project:** Wild Wanderings by Sudiip — Wildlife Photography Website
**Client:** Sudiip (@wild_wanderings_sudiip, 30.6K Instagram followers)
**Goal:** Production-ready website for fine art print sales, wildlife tours, and workshops.
**Live URL:** https://wildlifephotographer-qz281so0e-jr-dev.vercel.app
**Repository:** https://github.com/jitender-rao/wildlifephotographer
**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 · Sanity CMS · Stripe · Zustand · Framer Motion
**Hosting:** Vercel (auto-deploys on push to `main`)

---

## Rules

### General

- Always follow the architecture described in `docs/architecture.md`.
- Never delete or overwrite `docs/architecture.md` without updating it first.
- Prefer editing existing files over creating new ones.
- Do not add comments that explain WHAT the code does — only WHY when non-obvious.
- Do not add features, abstractions, or refactors beyond what the task requires.
- Theme tokens live in `styles/themes/tokens.css` and `app/globals.css` — never hardcode hex colours in components; always use `var(--ww-*)`.

### Code Quality

- All code must pass linting and formatting checks before commit (enforced by pre-commit hook).
- All new features must have corresponding tests before merging to `main`.
- No hardcoded secrets, API keys, or credentials in source files — use environment variables.

### Git Workflow

- **Never push directly to `main`** — `main` is branch-protected. All changes go through a PR.
- Branch naming: `feature/<name>`, `fix/<name>`, `chore/<name>`, `docs/<name>`
- Commit messages must describe the WHY, not just the WHAT.
- PRs must pass CI (lint → type-check → unit tests → build → e2e) before merging.
- Never force-push to `main`.
- Merge strategy: squash-and-merge for features, merge commit for releases.

### Architecture

- Update `docs/architecture.md` whenever you add or modify a major feature, page, or integration.
- New pages go under `app/(marketing)/` (public) or `app/(shop)/` (commerce).
- New components go under `components/<domain>/` — never dump everything in `components/`.
- Data fetching: server components fetch from Sanity; client components read from Zustand stores or props.
- Placeholder data lives in `lib/placeholder-*.ts` — swap for real Sanity queries when CMS is configured.

### Security

- Validate all user inputs at system boundaries (forms, API routes).
- Never introduce XSS, SQL injection, or other OWASP Top 10 vulnerabilities.
- Stripe webhook routes must use `req.text()` before signature verification — never `req.json()`.
- Razorpay HMAC verification required on all webhook routes.
- Review third-party dependencies before adding them.

### Agents

- Use the appropriate agent for each task (see `.claude/agents/`).
- Agents must not take destructive actions (delete files, drop DB tables, force-push) without explicit user confirmation.

---

## Stack Decisions Log

| Date       | Decision                          | Reason                                                               |
| ---------- | --------------------------------- | -------------------------------------------------------------------- |
| 2026-06-28 | Next.js 16 App Router             | RSC for fast page loads, ISR for Sanity content, SEO-friendly        |
| 2026-06-28 | Tailwind CSS v4                   | `@theme inline` for design tokens, no config file needed             |
| 2026-06-28 | CSS custom properties for theming | Runtime theme switching without JS bundle overhead                   |
| 2026-06-28 | next-themes + direct DOM toggle   | next-themes for architecture; direct classList for RSC compatibility |
| 2026-06-28 | Zustand with skipHydration        | Avoids SSR/client cart mismatch; rehydrate() called in useEffect     |
| 2026-06-28 | Sanity.io CMS                     | Structured content for photos, tours, prints; GROQ queries           |
| 2026-06-28 | Stripe (intl) + Razorpay (India)  | Razorpay loaded only when x-vercel-ip-country === 'IN'               |
| 2026-06-28 | Vercel hosting                    | Auto-deploy from main, bom1 Mumbai region for India latency          |
| 2026-06-28 | Placeholder data pattern          | Site runs without Sanity configured; swap lib/placeholder-*.ts       |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. Never commit `.env.local`.

| Variable                             | Required  | Notes                                      |
| ------------------------------------ | --------- | ------------------------------------------ |
| `NEXT_PUBLIC_APP_URL`                | Yes       | Full URL of the deployed site              |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`        | Yes       | Sudiip's WhatsApp number with country code |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`      | CMS only  | Leave empty to use placeholder data        |
| `NEXT_PUBLIC_SANITY_DATASET`         | CMS only  | Usually `production`                       |
| `SANITY_API_TOKEN`                   | CMS only  | Write token for server mutations           |
| `SANITY_WEBHOOK_SECRET`              | CMS only  | Validates revalidation webhook             |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Shop only | Stripe frontend key                        |
| `STRIPE_SECRET_KEY`                  | Shop only | Server-only                                |
| `STRIPE_WEBHOOK_SECRET`              | Shop only | Validates Stripe webhook signatures        |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`  | Media     | CDN for optimised image delivery           |
| `NEXT_PUBLIC_MAPBOX_TOKEN`           | Tours     | Map on tour detail pages                   |
| `RESEND_API_KEY`                     | Email     | Transactional email (orders, bookings)     |

---

## Useful Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run linter
npm run lint

# Run formatter
npm run format

# Type check
npm run type-check

# Run unit tests
npm test

# Run e2e tests (requires dev server running)
npm run test:e2e

# Build for production
npm run build
```
