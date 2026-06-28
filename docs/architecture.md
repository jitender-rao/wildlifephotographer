# Architecture — Wildlife Photographer Website

> Keep this document up to date. The pre-commit hook will block commits that
> touch `src/` without updating this file.

---

## Overview

_(Describe the high-level purpose and structure of the site once decided.)_

---

## Tech Stack

| Layer         | Choice         | Notes |
| ------------- | -------------- | ----- |
| Framework     | TBD            |       |
| Styling       | TBD            |       |
| CMS / Content | TBD            |       |
| Hosting       | TBD            |       |
| CI/CD         | GitHub Actions |       |
| Domain        | TBD            |       |

---

## Folder Structure

```
wildlifephotographer/
├── .claude/
│   ├── agents/         # Claude agent definitions
│   ├── hooks/          # Git hooks (pre-commit, pre-push)
│   └── skills/         # Claude skill scripts
├── docs/
│   └── architecture.md # This file
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components / routes
│   ├── styles/         # Global styles and tokens
│   ├── lib/            # Utilities and helpers
│   └── assets/         # Images, fonts, icons
├── public/             # Static assets served as-is
├── tests/              # Unit and integration tests
├── .env.example        # Environment variable template
├── CLAUDE.md           # Claude Code rules for this project
└── package.json
```

---

## Pages & Routes

| Route        | Page    | Description                        |
| ------------ | ------- | ---------------------------------- |
| `/`          | Home    | Hero, intro, featured gallery      |
| `/gallery`   | Gallery | Full photo collection with filters |
| `/about`     | About   | Photographer bio and story         |
| `/contact`   | Contact | Contact form                       |
| _(more TBD)_ |         |                                    |

---

## Key Components

_(List major reusable components as they are built.)_

---

## Data / Content Flow

_(Describe how content (photos, text) is sourced, stored, and rendered.)_

---

## Deployment

_(Describe the deployment pipeline once hosting is chosen.)_

---

## Change Log

| Date       | Section Changed | Summary                  |
| ---------- | --------------- | ------------------------ |
| 2026-06-28 | Initial         | Architecture doc created |
