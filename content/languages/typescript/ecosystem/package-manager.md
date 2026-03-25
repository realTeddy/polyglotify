---
title: "Package Manager"
language: "typescript"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

The TypeScript/Node.js ecosystem primarily uses **npm** (bundled with Node.js), **yarn**, or **pnpm** as package managers. All three read `package.json` for dependency metadata and produce a lockfile (`package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`) for reproducible installs. `pnpm` is increasingly popular for monorepos due to its content-addressable store and strict dependency isolation.

## Example

```bash
# npm — initialize project
npm init -y

# Install runtime dependency
npm install zod

# Install dev dependency (TypeScript itself is a dev dep)
npm install --save-dev typescript @types/node ts-node

# Run a script defined in package.json
npm run build

# Audit for vulnerabilities
npm audit

# pnpm equivalents (faster, stricter)
pnpm add zod
pnpm add -D typescript @types/node
pnpm run build
```

```json
// package.json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/index.ts",
    "test": "vitest"
  },
  "dependencies": {
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "ts-node": "^10.9.0",
    "vitest": "^1.4.0"
  }
}
```

## Gotchas

- Many npm packages are JavaScript-only and require a separate `@types/package-name` dev dependency for TypeScript definitions; check DefinitelyTyped (`@types/*`) when a package has no bundled types.
- Commit your lockfile to version control — without it, `npm install` can silently upgrade transitive dependencies and break builds.
