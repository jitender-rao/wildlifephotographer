# Architecture — Wild Wanderings by Sudiip

> Keep this document up to date whenever a major feature, page, or integration is added or changed.

---

## Overview

Wildlife photography portfolio and commerce site for Sudiip (@wild_wanderings_sudiip).
Three revenue streams: **fine art print sales**, **wildlife photography tours**, **field workshops**.

- **Live:** https://wildlifephotographer-qz281so0e-jr-dev.vercel.app
- **Repo:** https://github.com/jitender-rao/wildlifephotographer
- **Deploys:** every push to `main` via Vercel CI/CD

---

## Tech Stack

| Layer         | Choice                           | Notes                                             |
| ------------- | -------------------------------- | ------------------------------------------------- |
| Framework     | Next.js 16.2 (App Router)        | RSC + ISR; TypeScript strict                      |
| Styling       | Tailwind CSS v4                  | `@theme inline` tokens; CSS custom properties     |
| Theming       | CSS vars + next-themes           | `:root` / `.dark` blocks in `globals.css`         |
| UI primitives | shadcn/ui                        | Forms, dialogs, toasts only                       |
| Animation     | Framer Motion                    | Parallax, stagger, lightbox transitions           |
| State         | Zustand                          | Cart + UI (lightbox, drawers, mobile menu)        |
| Forms         | React Hook Form + Zod            | All user-facing forms                             |
| CMS           | Sanity.io                        | Photos, tours, prints, blog, site settings        |
| Payments      | Stripe (intl) + Razorpay (IN)    | Razorpay loaded only for Indian IPs               |
| Images        | Next.js `<Image>` + Cloudinary   | Unsplash placeholders during dev                  |
| Email         | Resend                           | Orders, tour bookings, newsletter                 |
| Maps          | Mapbox GL JS                     | Tour detail pages; `ssr: false` dynamic import    |
| Auth          | NextAuth.js                      | Google + magic link; guards `/account/*`          |
| Testing       | Vitest (unit) + Playwright (e2e) |                                                   |
| Hosting       | Vercel — region `bom1` Mumbai    | Auto-deploy from `main`; Preview deploys from PRs |
| CI/CD         | GitHub Actions                   | lint → type-check → unit tests → build → e2e      |

---

## Folder Structure

```
wildlifephotographer/
├── .claude/
│   ├── agents/                  # Claude agent definitions
│   ├── hooks/                   # pre-commit, pre-push scripts
│   └── skills/                  # Claude skill scripts
├── .github/workflows/ci.yml     # GitHub Actions CI pipeline
├── app/
│   ├── (marketing)/             # Public pages (Navbar + Footer layout)
│   │   ├── page.tsx             # Home
│   │   ├── portfolio/           # /portfolio — masonry grid + lightbox
│   │   ├── tours/               # /tours — listing + detail (TODO)
│   │   ├── about/               # /about (TODO)
│   │   ├── blog/                # /blog (TODO)
│   │   └── contact/             # /contact (TODO)
│   ├── (shop)/                  # Commerce pages (same nav + cart)
│   │   ├── shop/                # /shop — print listing
│   │   ├── shop/[slug]/         # /shop/:slug — product detail
│   │   ├── cart/                # /cart (TODO)
│   │   └── checkout/            # /checkout (TODO)
│   ├── api/
│   │   ├── newsletter/          # POST — Resend / ConvertKit opt-in
│   │   ├── revalidate/          # POST — Sanity webhook → ISR revalidation
│   │   ├── stripe/              # checkout + webhook routes (TODO)
│   │   └── razorpay/            # order + webhook routes (TODO)
│   ├── globals.css              # Tailwind imports + CSS token system
│   └── layout.tsx               # Root layout: fonts, ThemeProvider, CartDrawer
├── components/
│   ├── home/                    # HeroSection, FeaturedGallery, StatsBar, etc.
│   ├── layout/                  # Navbar, NavbarClient, Footer
│   ├── portfolio/               # CategoryFilter, MasonryGrid, PhotoCard, Lightbox
│   ├── shared/                  # ThemeProvider, ThemeToggle, WhatsAppButton
│   ├── shop/                    # PrintCard, ProductSelector, WallPreview, CartDrawer, etc.
│   └── ui/                      # shadcn/ui primitives
├── docs/
│   └── architecture.md          # This file
├── lib/
│   ├── placeholder-photos.ts    # Dev placeholder data — swap for Sanity queries
│   ├── placeholder-prints.ts    # Dev placeholder data — swap for Sanity queries
│   ├── theme.ts                 # Theme constants (THEME_STORAGE_KEY, DEFAULT_THEME)
│   ├── fonts.ts                 # next/font exports (Playfair, Inter, Space Mono)
│   ├── utils.ts                 # cn() helper
│   └── sanity/
│       ├── client.ts            # Sanity client with SANITY_CONFIGURED guard
│       ├── queries.ts           # All GROQ queries using safeQuery / safeQueryOne
│       └── image.ts             # urlFor() helper
├── store/
│   ├── cartStore.ts             # Zustand cart (persist + skipHydration)
│   └── uiStore.ts               # Zustand UI (lightbox, cartDrawer, mobileMenu)
├── styles/
│   └── themes/tokens.css        # Canonical CSS token source (edit tokens here)
├── types/
│   ├── portfolio.ts             # Photo, PhotoCategory, PhotoExif, PhotoSummary
│   ├── shop.ts                  # Print, PrintSize, PaperMedium, CartItem, Order
│   ├── tour.ts                  # Tour, TourSummary
│   └── sanity.ts                # Sanity base types
├── tests/                       # Vitest unit tests
├── e2e/                         # Playwright e2e specs (TODO)
├── public/                      # Static assets
├── .env.example                 # All env var keys (never commit .env.local)
├── CLAUDE.md                    # Claude Code rules
└── next.config.ts               # Image domains, security headers, Turbopack
```

---

## Pages & Routes

| Route           | Status  | Description                                              |
| --------------- | ------- | -------------------------------------------------------- |
| `/`             | ✅ Live | Hero, stats, featured gallery, print CTA, tours teaser   |
| `/portfolio`    | ✅ Live | Masonry grid, category filter, lightbox with EXIF        |
| `/shop`         | ✅ Live | Print listing with edition badges, trust bar             |
| `/shop/[slug]`  | ✅ Live | Size/medium selector, wall preview, COA, specs accordion |
| `/cart`         | 🔜 TODO | Full cart page                                           |
| `/checkout`     | 🔜 TODO | Stripe / Razorpay checkout                               |
| `/tours`        | 🔜 TODO | Tour listing with map                                    |
| `/tours/[slug]` | 🔜 TODO | Tour detail, itinerary, booking form                     |
| `/about`        | 🔜 TODO | Photographer bio, gear, philosophy                       |
| `/blog`         | 🔜 TODO | Field notes and stories                                  |
| `/contact`      | 🔜 TODO | Contact form (rate-limited)                              |
| `/account`      | 🔜 TODO | Order history (NextAuth protected)                       |

---

## Key Components

| Component                            | Type   | Purpose                                             |
| ------------------------------------ | ------ | --------------------------------------------------- |
| `components/shared/ThemeToggle`      | Client | Sun/moon toggle; direct classList + localStorage    |
| `components/shared/ThemeProvider`    | Client | next-themes wrapper at root layout                  |
| `components/layout/Navbar`           | Server | Static structure; passes children to NavbarClient   |
| `components/layout/NavbarClient`     | Client | Scroll blur, cart count, mobile menu                |
| `components/portfolio/MasonryGrid`   | Client | 3-column CSS masonry via column distribution        |
| `components/portfolio/Lightbox`      | Client | createPortal; keyboard nav; body scroll lock        |
| `components/shop/ProductSelector`    | Client | Size + medium picker; live price; Add to Cart       |
| `components/shop/WallPreview`        | Client | CSS-positioned print on room scene image            |
| `components/shop/CartDrawer`         | Client | Zustand cart; rehydrates from localStorage on mount |
| `components/shop/CertificatePreview` | Server | COA preview for limited editions                    |

---

## Theming System

All colour tokens live in two places (kept in sync):

- `styles/themes/tokens.css` — canonical source, edit tokens here
- `app/globals.css` — inlined copy (required; Tailwind v4 can't `@import` from `styles/`)

**Light:** `:root { --ww-bg: #fafaf8; ... }`
**Dark:** `.dark { --ww-bg: #0a0a0a; ... }`

`@theme inline {}` in `globals.css` maps `--ww-*` vars to Tailwind colour utilities.
Components use `[color:var(--ww-*)]` arbitrary values — never hardcoded hex.

---

## Sanity / Placeholder Data Pattern

The site runs without Sanity configured:

- `lib/sanity/client.ts` checks `SANITY_CONFIGURED` — falls back to no-op
- `lib/sanity/queries.ts` uses `safeQuery<T>()` / `safeQueryOne<T>()` — returns `[]` / `null`
- `lib/placeholder-photos.ts` and `lib/placeholder-prints.ts` provide dev data

When Sanity is configured, replace placeholder imports with real GROQ queries.

---

## Deployment

| Environment | Trigger        | URL                                                      |
| ----------- | -------------- | -------------------------------------------------------- |
| Production  | Push to `main` | https://wildlifephotographer-qz281so0e-jr-dev.vercel.app |
| Preview     | Push to any PR | Auto-generated Vercel preview URL per PR                 |
| Local       | `npm run dev`  | http://localhost:3000                                    |

**Vercel region:** `bom1` (Mumbai) for lowest latency to Indian visitors.

---

## Change Log

| Date       | Section Changed | Summary                                                   |
| ---------- | --------------- | --------------------------------------------------------- |
| 2026-06-28 | Initial         | Architecture doc created                                  |
| 2026-06-28 | Full rewrite    | Stack finalised — Next.js 16, Tailwind v4, Sanity, Vercel |
| 2026-06-28 | Theme system    | CSS custom properties, next-themes, ThemeToggle component |
| 2026-06-28 | Portfolio       | Masonry grid, category filter, lightbox with EXIF         |
| 2026-06-28 | Shop            | Print listing, product detail, wall preview, cart drawer  |
| 2026-06-28 | Deployed        | Live on Vercel; branch protection enabled on main         |
