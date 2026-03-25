---
title: "Build Tools"
language: "javascript"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

JavaScript build tools bundle, transpile, and optimize source code for deployment. Vite is the current standard for browser applications — it uses native ES Modules during development for near-instant startup and Rollup for production builds. esbuild is an extremely fast Go-based bundler popular as a library. Webpack remains widely used in legacy and enterprise projects.

## Example

```bash
# Vite — recommended for new projects
npm create vite@latest my-app -- --template vanilla
cd my-app && npm install
npm run dev      # dev server with HMR at http://localhost:5173
npm run build    # production bundle → dist/
npm run preview  # preview the production build locally

# esbuild — direct CLI usage
npx esbuild src/index.js --bundle --minify --outfile=dist/bundle.js

# Rollup — library bundling
npx rollup src/index.js --file dist/bundle.cjs --format cjs

# TypeScript compilation (no bundling)
npx tsc

# Biome — linter + formatter in one tool (replaces ESLint + Prettier)
npx biome check --apply .
```

```javascript
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2020",
    minify: "esbuild",
    outDir: "dist",
  },
});
```

## Gotchas

- Webpack's configuration is powerful but notoriously verbose; Vite covers most use cases with far less configuration
- Tree-shaking (dead-code elimination) requires ES Modules (`import/export`); CommonJS modules (`require`) cannot be statically analyzed and are not tree-shaken
- Source maps must be generated explicitly for production debugging; they increase deploy size but are essential for diagnosing errors
- esbuild does not perform TypeScript type checking — it only strips types; run `tsc --noEmit` separately to catch type errors
