# Skill: scaffold

Scaffold a new page, component, or feature from scratch following project conventions.

## Usage
```
/scaffold page <name>
/scaffold component <name>
/scaffold feature <name>
```

## Steps

### Page
1. Create `src/pages/<name>/index.<ext>`
2. Create `src/pages/<name>/<Name>.test.<ext>`
3. Register route in the router (if applicable)
4. Add entry to `docs/architecture.md` Pages & Routes table
5. Confirm with user before committing

### Component
1. Create `src/components/<Name>/<Name>.<ext>`
2. Create `src/components/<Name>/<Name>.test.<ext>`
3. Export from `src/components/index.<ext>`
4. Add to architecture doc if it's a major shared component

### Feature
1. Create `src/features/<name>/` folder
2. Scaffold sub-components, hooks, utilities inside it
3. Add feature entry to `docs/architecture.md`
4. Write at least one integration test covering the feature's main flow
