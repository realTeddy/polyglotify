---
title: "Project Structure"
language: "javascript"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

JavaScript projects do not impose a mandatory directory layout, but community conventions have converged on predictable patterns. Source files live in `src/`, tests in `src/__tests__/` or alongside source as `*.test.js`, and built output in `dist/`. Configuration files accumulate at the project root. Monorepos commonly use a `packages/` or `apps/` directory.

## Example

```
my-app/
├── package.json          # metadata, scripts, dependencies
├── package-lock.json     # locked dependency tree
├── .gitignore
├── .eslintrc.js          # linter config
├── vite.config.js        # bundler / dev-server config
├── tsconfig.json         # TypeScript config (if used)
├── src/
│   ├── index.js          # entry point
│   ├── main.js
│   ├── components/
│   │   └── Button.js
│   ├── utils/
│   │   └── formatDate.js
│   └── __tests__/
│       └── formatDate.test.js
├── public/               # static assets copied verbatim
│   └── favicon.ico
└── dist/                 # build output (git-ignored)
```

```javascript
// ES module imports (the modern standard)
import { formatDate } from "./utils/formatDate.js";
export function greet(name) { return `Hello, ${name}`; }

// CommonJS (Node.js legacy)
const { formatDate } = require("./utils/formatDate");
module.exports = { greet };
```

## Gotchas

- JavaScript has two module systems: ES Modules (`import/export`) and CommonJS (`require/module.exports`); mixing them in a single project requires care — set `"type": "module"` in `package.json` to default to ESM
- Configuration file proliferation is common (`.eslintrc`, `prettier.config.js`, `tsconfig.json`, `vite.config.js`, etc.); tools like biome attempt to consolidate these
- The `dist/` folder should be in `.gitignore` and rebuilt on deploy, not committed
- There is no enforced convention for folder names — different frameworks (React, Vue, Next.js) all suggest slightly different layouts
