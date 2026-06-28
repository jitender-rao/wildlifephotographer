# CLAUDE.md — Wildlife Photographer Website

This file governs how Claude Code behaves in this project.
All rules here override Claude's default behavior.

---

## Project Overview

**Project:** Wildlife Photographer Portfolio Website
**Goal:** Build a fully functional, production-ready website from scratch to hosted.
**Stack:** _(to be decided — update this section once stack is chosen)_
**Hosting:** _(to be decided — e.g. Vercel, Netlify, GitHub Pages)_

---

## Rules

> Rules will be added and refined by the project owner over time.
> Each rule should be clear and actionable.

### General

- Always follow the architecture described in `docs/architecture.md`.
- Never delete or overwrite `docs/architecture.md` without updating it first.
- Prefer editing existing files over creating new ones.
- Do not add comments that explain WHAT the code does — only WHY when non-obvious.
- Do not add features, abstractions, or refactors beyond what the task requires.

### Code Quality

- All code must pass linting and formatting checks before commit (enforced by pre-commit hook).
- All new features must have corresponding tests.
- No hardcoded secrets, API keys, or credentials in source files — use environment variables.

### Git Workflow

- Branch naming: `feature/<name>`, `fix/<name>`, `chore/<name>`, `docs/<name>`
- Commit messages must be clear and describe the WHY, not just the WHAT.
- Never force-push to `main`.
- PRs must pass CI checks before merging.

### Architecture

- Update `docs/architecture.md` whenever you add or modify a major feature, page, or integration.
- If staged files touch `src/` and `docs/architecture.md` is not also staged, the pre-commit hook will block the commit.

### Security

- Validate all user inputs at system boundaries.
- Never introduce XSS, SQL injection, or other OWASP Top 10 vulnerabilities.
- Review third-party dependencies before adding them.

### Agents

- Use the appropriate agent for each task (see `.claude/agents/`).
- Agents must not take destructive actions (delete files, drop DB tables, force-push) without explicit user confirmation.

---

## Stack Decisions Log

| Date        | Decision            | Reason            |
| ----------- | ------------------- | ----------------- |
| _(pending)_ | Framework choice    | _(to be decided)_ |
| _(pending)_ | Hosting platform    | _(to be decided)_ |
| _(pending)_ | CSS approach        | _(to be decided)_ |
| _(pending)_ | CMS / content layer | _(to be decided)_ |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values. Never commit `.env.local`.

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

# Run tests
npm test

# Build for production
npm run build
```

_(Update commands once stack is finalized.)_
