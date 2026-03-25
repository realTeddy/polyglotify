---
title: "Build Tools"
language: "typescript"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

TypeScript's primary build tool is the `tsc` compiler, which type-checks and emits JavaScript. For bundling browser or library code, **esbuild**, **Vite**, **Rollup**, and **webpack** are common choices — esbuild and Vite are preferred for speed. `ts-node` and `tsx` enable running TypeScript directly in development without a separate compile step. For monorepos, **Turborepo** or **Nx** orchestrate builds across packages.

## Example

```bash
# Type-check only (no emit)
npx tsc --noEmit

# Compile to dist/
npx tsc

# Watch mode
npx tsc --watch

# Run without compiling (dev only)
npx tsx src/index.ts

# esbuild — bundle in milliseconds
npx esbuild src/index.ts --bundle --platform=node --outfile=dist/index.js

# Vite — dev server + production build for browser apps
npm create vite@latest my-app -- --template vanilla-ts
npm run dev    # dev server with HMR
npm run build  # optimized production bundle
```

```json
// package.json build scripts
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "build": "tsc",
    "build:bundle": "esbuild src/index.ts --bundle --minify --outfile=dist/bundle.js",
    "dev": "tsx watch src/index.ts"
  }
}
```

## Gotchas

- `esbuild` and `swc` transpile TypeScript extremely fast by stripping types without type-checking; always run `tsc --noEmit` separately in CI to ensure correctness.
- `ts-node` defaults to CommonJS; add `"esm": true` to `tsconfig.json` or use `tsx` for ESM projects.
