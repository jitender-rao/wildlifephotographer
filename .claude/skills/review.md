# Skill: review

Run a code review on the current diff or a specific PR.

## Usage

```
/review           # Review current uncommitted diff
/review pr <number>  # Review a GitHub PR
```

## What It Does

1. Gets the diff (local or PR)
2. Delegates to the `reviewer` agent
3. Reports findings grouped by severity: bug → security → style → suggestion
4. Optionally posts findings as inline PR comments (`--comment` flag)
5. Optionally applies fixes directly (`--fix` flag)

## Severity Levels

- **bug** — logic error, crash risk, wrong behaviour
- **security** — XSS, injection, exposed secret, missing validation
- **style** — violates project conventions in CLAUDE.md
- **suggestion** — improvement idea, not blocking
