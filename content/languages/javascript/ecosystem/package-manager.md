---
title: "Package Manager"
language: "javascript"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

JavaScript's primary package registry is npm (Node Package Manager), which ships with Node.js. The ecosystem also offers yarn and pnpm as faster, more feature-rich alternatives. All three use `package.json` to declare dependencies and store resolved versions in a lock file (`package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`).

## Example

```bash
# npm — bundled with Node.js
npm init -y                    # create package.json
npm install lodash             # add runtime dependency
npm install --save-dev vitest  # add dev-only dependency
npm uninstall lodash
npm update                     # update all packages within semver range
npm run build                  # execute a script defined in package.json
npm publish                    # publish to the npm registry

# pnpm — content-addressable, saves disk space
pnpm add lodash
pnpm add -D vitest

# yarn (v1 classic)
yarn add lodash
yarn add --dev vitest
```

```json
// package.json (excerpt)
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev":   "vite",
    "build": "vite build",
    "test":  "vitest"
  },
  "dependencies":    { "lodash": "^4.17.21" },
  "devDependencies": { "vitest": "^2.0.0" }
}
```

## Gotchas

- `npm install` without arguments installs all dependencies; `npm ci` is preferred in CI because it respects the lock file exactly
- Semver ranges in `package.json` allow automatic minor/patch updates, which can introduce breaking changes if packages do not follow semver correctly
- `node_modules` is large; commit only the lock file to version control, not the folder itself
- pnpm uses a global content-addressable store and hard links, which is dramatically more disk-efficient than npm or yarn v1
