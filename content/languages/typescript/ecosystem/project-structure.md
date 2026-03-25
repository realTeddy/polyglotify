---
title: "Project Structure"
language: "typescript"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A TypeScript project is configured by `tsconfig.json`, which controls compiler options, included files, and output directories. Source files live under `src/`, compiled output goes to `dist/` or `build/`. Modern projects separate source from output, use path aliases for clean imports, and configure `strict: true` for maximum type safety.

## Example

```
my-app/
├── src/
│   ├── index.ts          # entry point
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       └── global.d.ts
├── tests/
│   └── utils.test.ts
├── dist/                 # compiled output (git-ignored)
├── tsconfig.json
├── package.json
└── .gitignore
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "paths": {
      "@lib/*": ["src/lib/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## Gotchas

- `"module": "NodeNext"` requires file extensions in relative imports (`import { x } from "./utils.js"` — use `.js` even in `.ts` source files, because TypeScript rewrites them at emit).
- The `paths` compiler option does not affect Node.js module resolution at runtime; a bundler or `tsconfig-paths` runtime hook is also needed.
