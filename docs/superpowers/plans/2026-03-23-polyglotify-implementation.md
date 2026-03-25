# Polyglotify Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an open-source web app that teaches programming languages by comparing them side-by-side to a language the user already knows.

**Architecture:** Astro static site with React islands for interactivity. Markdown content files per language per feature, paired at build time. Local storage for progress, optional accounts for sync, BYOK or paid AI chat.

**Tech Stack:** Astro 5, React 19, TypeScript, Tailwind CSS, Vitest, @testing-library/react, js-yaml

---

## File Structure

```
polyglotify/
  src/
    components/
      LanguagePicker.tsx        # "I know X, learning Y" selector with autocomplete
      ComparisonView.tsx        # Side-by-side (desktop) / tabbed (mobile) comparison
      ComparisonPanel.tsx       # Single language panel (description, code, gotchas)
      Dashboard.tsx             # Feature grid with progress, filters, resume
      FeatureNav.tsx            # Previous / Next bottom navigation
      Breadcrumb.tsx            # Category > Feature breadcrumb
      ProgressBar.tsx           # Visual progress indicator
      MarkComplete.tsx          # "Mark as complete" button
      AiChat.tsx                # Chat panel (floating + contextual)
      AiChatButton.tsx          # Floating chat FAB
      AiKeyPrompt.tsx           # BYOK key entry / paid upsell
    layouts/
      BaseLayout.astro          # Shared shell: nav, footer, global styles
      LessonLayout.astro        # Comparison page: breadcrumb, sidebar, feature nav
    pages/
      index.astro               # Landing page with hero + language picker
      learn/
        [known]/
          [learning]/
            index.astro         # Dashboard for language pair
            [feature].astro     # Individual comparison page
    lib/
      content.ts                # Load, validate, and pair markdown content
      features.ts               # Parse features.yaml, get ordered feature list
      languages.ts              # Discover available languages from content dir
      progress.ts               # Local storage progress read/write
      ai.ts                     # Chat client (BYOK client-side + paid server proxy)
    types.ts                    # Shared TypeScript types
  content/
    languages/
      python/
        basics/
          variables.md
          types.md
          operators.md
          control-flow.md
        functions/
          declaration.md
          parameters.md
          return-values.md
          closures.md
      javascript/
        basics/
          variables.md
          types.md
          operators.md
          control-flow.md
        functions/
          declaration.md
          parameters.md
          return-values.md
          closures.md
    features.yaml               # Canonical feature list with categories and order
  scripts/
    new-language.ts             # Scaffold empty files for a new language
    new-feature.ts              # Scaffold files across all languages
    validate-content.ts         # CI: validate coverage + frontmatter
  tests/
    lib/
      content.test.ts
      features.test.ts
      languages.test.ts
      progress.test.ts
      ai.test.ts
    components/
      LanguagePicker.test.tsx
      ComparisonView.test.tsx
      Dashboard.test.tsx
      FeatureNav.test.tsx
      MarkComplete.test.tsx
      AiChat.test.tsx
    scripts/
      validate-content.test.ts
  public/
    favicon.svg
  astro.config.mjs
  tailwind.config.mjs
  tsconfig.json
  vitest.config.ts
  package.json
  CONTRIBUTING.md
```

---

## Task 1: Project Scaffold

Set up the Astro project with React, TypeScript, Tailwind, and Vitest.

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `src/lib/.gitkeep`
- Create: `public/favicon.svg`

- [ ] **Step 1: Initialize Astro project**

```bash
cd d:/repos/polyglotify
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install @astrojs/react @astrojs/tailwind react react-dom tailwindcss @tailwindcss/typography
npm install -D @types/react @types/react-dom vitest @testing-library/react @testing-library/jest-dom jsdom js-yaml @types/js-yaml happy-dom
```

- [ ] **Step 3: Configure Astro with React and Tailwind**

Update `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
});
```

- [ ] **Step 4: Configure Tailwind**

Create `tailwind.config.mjs`:

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
```

- [ ] **Step 5: Configure Vitest**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

Create `tests/setup.ts`:

```typescript
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 6: Add test and build scripts to package.json**

Add to `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "new-language": "npx tsx scripts/new-language.ts",
    "new-feature": "npx tsx scripts/new-feature.ts",
    "validate-content": "npx tsx scripts/validate-content.ts"
  }
}
```

- [ ] **Step 7: Add path alias to tsconfig.json**

Update `tsconfig.json` to include:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 8: Verify build works**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro project with React, Tailwind, Vitest"
```

---

## Task 2: Content Schema & Sample Data

Define `features.yaml`, TypeScript types, and create sample content for two languages (Python, JavaScript) with a few features.

**Files:**
- Create: `content/features.yaml`
- Create: `src/types.ts`
- Create: `content/languages/python/basics/variables.md`
- Create: `content/languages/python/basics/types.md`
- Create: `content/languages/javascript/basics/variables.md`
- Create: `content/languages/javascript/basics/types.md`

- [ ] **Step 1: Define TypeScript types**

Create `src/types.ts`:

```typescript
export interface FeatureDefinition {
  slug: string;
  title: string;
  category: string;
  order: number;
}

export interface CategoryDefinition {
  slug: string;
  title: string;
  order: number;
  features: FeatureDefinition[];
}

export interface FeaturesConfig {
  categories: CategoryDefinition[];
}

export interface FeatureFrontmatter {
  title: string;
  language: string;
  feature: string;
  category: string;
  applicable: boolean;
}

export interface FeatureContent {
  frontmatter: FeatureFrontmatter;
  body: string;
}

export interface ComparisonPair {
  feature: FeatureDefinition;
  known: FeatureContent;
  learning: FeatureContent;
}

export interface LanguageInfo {
  slug: string;
  name: string;
  featureCount: number;
}

export interface ProgressState {
  knownLang: string;
  learningLang: string;
  completed: string[]; // feature slugs
  lastFeature: string | null;
}
```

- [ ] **Step 2: Create features.yaml**

Create `content/features.yaml`:

```yaml
categories:
  - slug: basics
    title: Basics
    order: 1
    features:
      - slug: variables
        title: Variables & Declaration
        order: 1
      - slug: types
        title: Types & Type Systems
        order: 2
      - slug: operators
        title: Operators
        order: 3
      - slug: control-flow
        title: Control Flow
        order: 4

  - slug: functions
    title: Functions
    order: 2
    features:
      - slug: declaration
        title: Function Declaration
        order: 1
      - slug: parameters
        title: Parameters & Arguments
        order: 2
      - slug: return-values
        title: Return Values
        order: 3
      - slug: closures
        title: Closures & Lambdas
        order: 4

  - slug: data-structures
    title: Data Structures
    order: 3
    features:
      - slug: arrays
        title: Arrays & Lists
        order: 1
      - slug: maps
        title: Maps & Dictionaries
        order: 2
      - slug: sets
        title: Sets
        order: 3
      - slug: tuples
        title: Tuples
        order: 4
      - slug: structs-classes
        title: Structs & Classes
        order: 5

  - slug: oop
    title: Object-Oriented Programming
    order: 4
    features:
      - slug: classes
        title: Classes
        order: 1
      - slug: inheritance
        title: Inheritance
        order: 2
      - slug: interfaces
        title: Interfaces & Traits
        order: 3
      - slug: generics
        title: Generics
        order: 4

  - slug: error-handling
    title: Error Handling
    order: 5
    features:
      - slug: exceptions
        title: Exceptions & Try/Catch
        order: 1
      - slug: result-types
        title: Result Types
        order: 2

  - slug: concurrency
    title: Concurrency
    order: 6
    features:
      - slug: async-await
        title: Async/Await
        order: 1
      - slug: threads
        title: Threads
        order: 2
      - slug: channels
        title: Channels & Message Passing
        order: 3

  - slug: ecosystem
    title: Ecosystem
    order: 7
    features:
      - slug: package-manager
        title: Package Manager
        order: 1
      - slug: project-structure
        title: Project Structure
        order: 2
      - slug: testing
        title: Testing
        order: 3
      - slug: build-tools
        title: Build Tools
        order: 4

  - slug: idioms
    title: Idioms
    order: 8
    features:
      - slug: common-patterns
        title: Common Patterns
        order: 1
      - slug: style-conventions
        title: Style Conventions
        order: 2
```

- [ ] **Step 3: Create sample Python content — variables**

Create `content/languages/python/basics/variables.md`:

```markdown
---
title: "Variables & Declaration"
language: "python"
feature: "variables"
category: "basics"
applicable: true
---

Variables in Python are dynamically typed. You don't need to declare a type — just assign a value. Variable names use `snake_case` by convention.

## Example

\```python
# No type declaration needed
name = "Alice"
age = 30
is_active = True

# Variables can be reassigned to different types
value = 42
value = "now a string"  # This is valid

# Multiple assignment
x, y, z = 1, 2, 3

# Constants (by convention, not enforced)
MAX_RETRIES = 3
\```

## Gotchas

- Python has no true constants — `MAX_RETRIES` is just a naming convention
- Variables can change type at any time, which can cause subtle bugs
- Variable names are case-sensitive: `name` and `Name` are different variables
```

- [ ] **Step 4: Create sample JavaScript content — variables**

Create `content/languages/javascript/basics/variables.md`:

```markdown
---
title: "Variables & Declaration"
language: "javascript"
feature: "variables"
category: "basics"
applicable: true
---

JavaScript has three ways to declare variables: `const`, `let`, and `var`. Modern JavaScript favors `const` by default and `let` when reassignment is needed. Variable names use `camelCase` by convention.

## Example

\```javascript
// const - cannot be reassigned (preferred)
const name = "Alice";
const age = 30;

// let - can be reassigned
let isActive = true;
isActive = false;

// Destructuring assignment
const [x, y, z] = [1, 2, 3];
const { firstName, lastName } = person;

// var - function-scoped, avoid in modern JS
var legacy = "old style";
\```

## Gotchas

- `const` prevents reassignment but not mutation: `const arr = [1]; arr.push(2)` is valid
- `var` is function-scoped, not block-scoped — can cause surprising behavior in loops
- Undeclared variables become global properties (in non-strict mode)
```

- [ ] **Step 5: Create sample Python content — types**

Create `content/languages/python/basics/types.md`:

```markdown
---
title: "Types & Type Systems"
language: "python"
feature: "types"
category: "basics"
applicable: true
---

Python is dynamically typed — types are checked at runtime, not compile time. Since Python 3.5, optional type hints can be added for documentation and static analysis tools like mypy.

## Example

\```python
# No type annotations (classic Python)
name = "Alice"
count = 42

# With type hints (Python 3.5+)
name: str = "Alice"
count: int = 42
scores: list[float] = [9.5, 8.7, 10.0]

# Type hints don't enforce anything at runtime
age: int = "not a number"  # No error at runtime!

# Common built-in types
text: str = "hello"
number: int = 42
decimal: float = 3.14
flag: bool = True
items: list[str] = ["a", "b"]
lookup: dict[str, int] = {"a": 1}
\```

## Gotchas

- Type hints are completely optional and not enforced at runtime
- Use `mypy` or `pyright` for static type checking
- `None` is its own type — use `Optional[str]` or `str | None` for nullable values
```

- [ ] **Step 6: Create sample JavaScript content — types**

Create `content/languages/javascript/basics/types.md`:

```markdown
---
title: "Types & Type Systems"
language: "javascript"
feature: "types"
category: "basics"
applicable: true
---

JavaScript is dynamically typed with automatic type coercion. It has 7 primitive types and objects. TypeScript (a superset of JavaScript) adds static typing.

## Example

\```javascript
// Primitive types
const text = "hello";       // string
const number = 42;          // number
const decimal = 3.14;       // number (no separate float)
const flag = true;          // boolean
const empty = null;         // null
const missing = undefined;  // undefined
const id = Symbol("id");    // symbol
const big = 9007199254740991n; // bigint

// typeof operator
typeof "hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"

// Type coercion (implicit conversion)
"5" + 3    // "53" (string concatenation)
"5" - 3    // 2 (numeric subtraction)
\```

## Gotchas

- `typeof null` returns `"object"` — a famous JavaScript bug from 1995
- `NaN` (Not a Number) is of type `number`
- Loose equality (`==`) coerces types: `"0" == false` is `true`; always use `===`
- JavaScript has no integer type — all numbers are 64-bit floats
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add content schema, types, and sample language content"
```

---

## Task 3: Content Loading Library

Build the library functions to parse `features.yaml`, discover languages, and pair content for comparison.

**Files:**
- Create: `src/lib/features.ts`
- Create: `src/lib/languages.ts`
- Create: `src/lib/content.ts`
- Create: `tests/lib/features.test.ts`
- Create: `tests/lib/languages.test.ts`
- Create: `tests/lib/content.test.ts`

- [ ] **Step 1: Write failing test for features.ts**

Create `tests/lib/features.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { loadFeatures, getFlatFeatureList, getFeatureBySlug, getAdjacentFeatures } from '@/lib/features';

describe('loadFeatures', () => {
  it('loads and parses features.yaml', async () => {
    const config = await loadFeatures();
    expect(config.categories).toBeDefined();
    expect(config.categories.length).toBeGreaterThan(0);
    expect(config.categories[0].slug).toBe('basics');
  });
});

describe('getFlatFeatureList', () => {
  it('returns features in order across categories', async () => {
    const config = await loadFeatures();
    const flat = getFlatFeatureList(config);
    expect(flat.length).toBeGreaterThan(0);
    expect(flat[0].slug).toBe('variables');
    expect(flat[0].category).toBe('basics');
  });
});

describe('getFeatureBySlug', () => {
  it('finds a feature by slug', async () => {
    const config = await loadFeatures();
    const feature = getFeatureBySlug(config, 'variables');
    expect(feature).toBeDefined();
    expect(feature!.title).toBe('Variables & Declaration');
  });

  it('returns undefined for unknown slug', async () => {
    const config = await loadFeatures();
    const feature = getFeatureBySlug(config, 'nonexistent');
    expect(feature).toBeUndefined();
  });
});

describe('getAdjacentFeatures', () => {
  it('returns previous and next features', async () => {
    const config = await loadFeatures();
    const { prev, next } = getAdjacentFeatures(config, 'types');
    expect(prev?.slug).toBe('variables');
    expect(next?.slug).toBe('operators');
  });

  it('returns null prev for first feature', async () => {
    const config = await loadFeatures();
    const { prev, next } = getAdjacentFeatures(config, 'variables');
    expect(prev).toBeNull();
    expect(next?.slug).toBe('types');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/features.test.ts`
Expected: FAIL — module `@/lib/features` not found.

- [ ] **Step 3: Implement features.ts**

Create `src/lib/features.ts`:

```typescript
import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import type { FeaturesConfig, FeatureDefinition, CategoryDefinition } from '@/types';

const FEATURES_PATH = path.resolve('content/features.yaml');

export async function loadFeatures(): Promise<FeaturesConfig> {
  const raw = await fs.readFile(FEATURES_PATH, 'utf-8');
  const parsed = yaml.load(raw) as FeaturesConfig;
  parsed.categories.sort((a, b) => a.order - b.order);
  for (const cat of parsed.categories) {
    cat.features.sort((a, b) => a.order - b.order);
    for (const f of cat.features) {
      f.category = cat.slug;
    }
  }
  return parsed;
}

export function getFlatFeatureList(config: FeaturesConfig): FeatureDefinition[] {
  return config.categories.flatMap((cat) => cat.features);
}

export function getFeatureBySlug(
  config: FeaturesConfig,
  slug: string
): FeatureDefinition | undefined {
  return getFlatFeatureList(config).find((f) => f.slug === slug);
}

export function getAdjacentFeatures(
  config: FeaturesConfig,
  slug: string
): { prev: FeatureDefinition | null; next: FeatureDefinition | null } {
  const flat = getFlatFeatureList(config);
  const index = flat.findIndex((f) => f.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/lib/features.test.ts`
Expected: All tests PASS.

- [ ] **Step 5: Write failing test for languages.ts**

Create `tests/lib/languages.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { getAvailableLanguages } from '@/lib/languages';

describe('getAvailableLanguages', () => {
  it('discovers languages from content directory', async () => {
    const langs = await getAvailableLanguages();
    expect(langs.length).toBeGreaterThanOrEqual(2);
    const slugs = langs.map((l) => l.slug);
    expect(slugs).toContain('python');
    expect(slugs).toContain('javascript');
  });

  it('returns language name derived from slug', async () => {
    const langs = await getAvailableLanguages();
    const python = langs.find((l) => l.slug === 'python');
    expect(python?.name).toBe('Python');
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run tests/lib/languages.test.ts`
Expected: FAIL — module `@/lib/languages` not found.

- [ ] **Step 7: Implement languages.ts**

Create `src/lib/languages.ts`:

```typescript
import fs from 'node:fs/promises';
import path from 'node:path';
import type { LanguageInfo } from '@/types';

const LANGUAGES_DIR = path.resolve('content/languages');

const LANGUAGE_NAMES: Record<string, string> = {
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  rust: 'Rust',
  go: 'Go',
  java: 'Java',
  csharp: 'C#',
  cpp: 'C++',
  c: 'C',
  ruby: 'Ruby',
  swift: 'Swift',
  kotlin: 'Kotlin',
  php: 'PHP',
  zig: 'Zig',
  elixir: 'Elixir',
  haskell: 'Haskell',
  lua: 'Lua',
  dart: 'Dart',
  scala: 'Scala',
  clojure: 'Clojure',
};

function toDisplayName(slug: string): string {
  return LANGUAGE_NAMES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

export async function getAvailableLanguages(): Promise<LanguageInfo[]> {
  const entries = await fs.readdir(LANGUAGES_DIR, { withFileTypes: true });
  const languages: LanguageInfo[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const langDir = path.join(LANGUAGES_DIR, entry.name);
    const files = await countMarkdownFiles(langDir);
    languages.push({
      slug: entry.name,
      name: toDisplayName(entry.name),
      featureCount: files,
    });
  }

  return languages.sort((a, b) => a.name.localeCompare(b.name));
}

async function countMarkdownFiles(dir: string): Promise<number> {
  let count = 0;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += await countMarkdownFiles(fullPath);
    } else if (entry.name.endsWith('.md')) {
      count++;
    }
  }
  return count;
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run tests/lib/languages.test.ts`
Expected: All tests PASS.

- [ ] **Step 9: Write failing test for content.ts**

Create `tests/lib/content.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { loadFeatureContent, loadComparisonPair } from '@/lib/content';

describe('loadFeatureContent', () => {
  it('loads and parses a markdown file for a language feature', async () => {
    const content = await loadFeatureContent('python', 'basics', 'variables');
    expect(content.frontmatter.title).toBe('Variables & Declaration');
    expect(content.frontmatter.language).toBe('python');
    expect(content.frontmatter.applicable).toBe(true);
    expect(content.body).toContain('dynamically typed');
    expect(content.body).toContain('<p>'); // body is rendered HTML, not raw markdown
  });
});

describe('loadComparisonPair', () => {
  it('loads both languages for a feature', async () => {
    const pair = await loadComparisonPair('python', 'javascript', 'basics', 'variables');
    expect(pair.known.frontmatter.language).toBe('python');
    expect(pair.learning.frontmatter.language).toBe('javascript');
    expect(pair.feature.slug).toBe('variables');
  });
});
```

- [ ] **Step 10: Run test to verify it fails**

Run: `npx vitest run tests/lib/content.test.ts`
Expected: FAIL — module `@/lib/content` not found.

- [ ] **Step 11: Implement content.ts**

Create `src/lib/content.ts`:

```typescript
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { loadFeatures, getFeatureBySlug } from '@/lib/features';
import type { FeatureContent, ComparisonPair, FeatureFrontmatter } from '@/types';

const LANGUAGES_DIR = path.resolve('content/languages');

export async function loadFeatureContent(
  language: string,
  category: string,
  featureSlug: string
): Promise<FeatureContent> {
  const filePath = path.join(LANGUAGES_DIR, language, category, `${featureSlug}.md`);
  const raw = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const html = await marked(content.trim());
  return {
    frontmatter: data as FeatureFrontmatter,
    body: html,
  };
}

export async function loadComparisonPair(
  knownLang: string,
  learningLang: string,
  category: string,
  featureSlug: string
): Promise<ComparisonPair> {
  const config = await loadFeatures();
  const feature = getFeatureBySlug(config, featureSlug);
  if (!feature) throw new Error(`Unknown feature: ${featureSlug}`);

  const [known, learning] = await Promise.all([
    loadFeatureContent(knownLang, category, featureSlug),
    loadFeatureContent(learningLang, category, featureSlug),
  ]);

  return { feature, known, learning };
}
```

- [ ] **Step 12: Install gray-matter and marked dependencies**

```bash
npm install gray-matter marked
```

- [ ] **Step 13: Run test to verify it passes**

Run: `npx vitest run tests/lib/content.test.ts`
Expected: All tests PASS.

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "feat: add content loading library with features, languages, and pairing"
```

---

## Task 4: Progress Tracking Library

Local storage progress management for tracking completed features.

**Files:**
- Create: `src/lib/progress.ts`
- Create: `tests/lib/progress.test.ts`

- [ ] **Step 1: Write failing test for progress.ts**

Create `tests/lib/progress.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import {
  getProgress,
  saveProgress,
  markFeatureComplete,
  isFeatureComplete,
  getCompletedCount,
  getNextIncompleteFeature,
  clearProgress,
} from '@/lib/progress';
import type { ProgressState } from '@/types';

// Mock localStorage
const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

beforeEach(() => storage.clear());

describe('getProgress', () => {
  it('returns null when no progress exists', () => {
    const progress = getProgress('python', 'rust');
    expect(progress).toBeNull();
  });

  it('returns saved progress', () => {
    const state: ProgressState = {
      knownLang: 'python',
      learningLang: 'rust',
      completed: ['variables'],
      lastFeature: 'variables',
    };
    saveProgress(state);
    const result = getProgress('python', 'rust');
    expect(result).toEqual(state);
  });
});

describe('markFeatureComplete', () => {
  it('adds a feature to completed list', () => {
    markFeatureComplete('python', 'rust', 'variables');
    const progress = getProgress('python', 'rust');
    expect(progress?.completed).toContain('variables');
    expect(progress?.lastFeature).toBe('variables');
  });

  it('does not duplicate completed features', () => {
    markFeatureComplete('python', 'rust', 'variables');
    markFeatureComplete('python', 'rust', 'variables');
    const progress = getProgress('python', 'rust');
    expect(progress?.completed.filter((f) => f === 'variables')).toHaveLength(1);
  });
});

describe('isFeatureComplete', () => {
  it('returns false for incomplete feature', () => {
    expect(isFeatureComplete('python', 'rust', 'variables')).toBe(false);
  });

  it('returns true for completed feature', () => {
    markFeatureComplete('python', 'rust', 'variables');
    expect(isFeatureComplete('python', 'rust', 'variables')).toBe(true);
  });
});

describe('getCompletedCount', () => {
  it('returns 0 with no progress', () => {
    expect(getCompletedCount('python', 'rust')).toBe(0);
  });

  it('counts completed features', () => {
    markFeatureComplete('python', 'rust', 'variables');
    markFeatureComplete('python', 'rust', 'types');
    expect(getCompletedCount('python', 'rust')).toBe(2);
  });
});

describe('getNextIncompleteFeature', () => {
  it('returns first feature when nothing completed', () => {
    const allFeatures = ['variables', 'types', 'operators'];
    const next = getNextIncompleteFeature('python', 'rust', allFeatures);
    expect(next).toBe('variables');
  });

  it('returns next incomplete feature', () => {
    markFeatureComplete('python', 'rust', 'variables');
    const allFeatures = ['variables', 'types', 'operators'];
    const next = getNextIncompleteFeature('python', 'rust', allFeatures);
    expect(next).toBe('types');
  });

  it('returns null when all complete', () => {
    markFeatureComplete('python', 'rust', 'variables');
    markFeatureComplete('python', 'rust', 'types');
    const allFeatures = ['variables', 'types'];
    const next = getNextIncompleteFeature('python', 'rust', allFeatures);
    expect(next).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/progress.test.ts`
Expected: FAIL — module `@/lib/progress` not found.

- [ ] **Step 3: Implement progress.ts**

Create `src/lib/progress.ts`:

```typescript
import type { ProgressState } from '@/types';

function storageKey(known: string, learning: string): string {
  return `polyglotify:progress:${known}:${learning}`;
}

export function getProgress(known: string, learning: string): ProgressState | null {
  const raw = localStorage.getItem(storageKey(known, learning));
  if (!raw) return null;
  return JSON.parse(raw) as ProgressState;
}

export function saveProgress(state: ProgressState): void {
  const key = storageKey(state.knownLang, state.learningLang);
  localStorage.setItem(key, JSON.stringify(state));
}

export function markFeatureComplete(known: string, learning: string, featureSlug: string): void {
  let progress = getProgress(known, learning);
  if (!progress) {
    progress = { knownLang: known, learningLang: learning, completed: [], lastFeature: null };
  }
  if (!progress.completed.includes(featureSlug)) {
    progress.completed.push(featureSlug);
  }
  progress.lastFeature = featureSlug;
  saveProgress(progress);
}

export function isFeatureComplete(known: string, learning: string, featureSlug: string): boolean {
  const progress = getProgress(known, learning);
  return progress?.completed.includes(featureSlug) ?? false;
}

export function getCompletedCount(known: string, learning: string): number {
  const progress = getProgress(known, learning);
  return progress?.completed.length ?? 0;
}

export function getNextIncompleteFeature(
  known: string,
  learning: string,
  allFeatureSlugs: string[]
): string | null {
  const progress = getProgress(known, learning);
  const completed = new Set(progress?.completed ?? []);
  return allFeatureSlugs.find((slug) => !completed.has(slug)) ?? null;
}

export function clearProgress(known: string, learning: string): void {
  localStorage.removeItem(storageKey(known, learning));
}

export function getAllProgressKeys(): { known: string; learning: string }[] {
  const results: { known: string; learning: string }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith('polyglotify:progress:')) continue;
    const parts = key.split(':');
    results.push({ known: parts[2], learning: parts[3] });
  }
  return results;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/lib/progress.test.ts`
Expected: All tests PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add local storage progress tracking library"
```

---

## Task 5: Base Layout & Landing Page

Create the shared layout and landing page with the language picker.

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/pages/index.astro`
- Create: `src/components/LanguagePicker.tsx`
- Create: `tests/components/LanguagePicker.test.tsx`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global CSS**

Create `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-950 text-gray-100 antialiased;
  }
}
```

- [ ] **Step 2: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = "Learn programming languages by comparing them to what you know" } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title} | Polyglotify</title>
  </head>
  <body class="min-h-screen flex flex-col">
    <nav class="border-b border-gray-800 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" class="text-xl font-bold text-white hover:text-emerald-400 transition-colors">
          Polyglotify
        </a>
      </div>
    </nav>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="border-t border-gray-800 px-6 py-6 text-center text-gray-500 text-sm">
      <p>Open source on GitHub. Built by the community.</p>
    </footer>
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 3: Write failing test for LanguagePicker**

Create `tests/components/LanguagePicker.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguagePicker } from '@/components/LanguagePicker';

const mockLanguages = [
  { slug: 'python', name: 'Python', featureCount: 4 },
  { slug: 'javascript', name: 'JavaScript', featureCount: 4 },
  { slug: 'rust', name: 'Rust', featureCount: 4 },
];

describe('LanguagePicker', () => {
  it('renders two select dropdowns', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    expect(screen.getByLabelText(/i know/i)).toBeDefined();
    expect(screen.getByLabelText(/i want to learn/i)).toBeDefined();
  });

  it('populates options from languages prop', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    const knownSelect = screen.getByLabelText(/i know/i) as HTMLSelectElement;
    expect(knownSelect.options.length).toBe(4); // 3 + placeholder
  });

  it('disables start button when languages not selected', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    const button = screen.getByRole('button', { name: /start learning/i });
    expect(button).toBeDisabled();
  });

  it('disables same language in learning dropdown', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    const knownSelect = screen.getByLabelText(/i know/i);
    fireEvent.change(knownSelect, { target: { value: 'python' } });
    const learningSelect = screen.getByLabelText(/i want to learn/i) as HTMLSelectElement;
    const pythonOption = Array.from(learningSelect.options).find((o) => o.value === 'python');
    expect(pythonOption?.disabled).toBe(true);
  });

  it('enables start button when both languages selected', () => {
    render(<LanguagePicker languages={mockLanguages} />);
    fireEvent.change(screen.getByLabelText(/i know/i), { target: { value: 'python' } });
    fireEvent.change(screen.getByLabelText(/i want to learn/i), { target: { value: 'rust' } });
    const button = screen.getByRole('button', { name: /start learning/i });
    expect(button).not.toBeDisabled();
  });

  it('builds correct URL on submit', () => {
    // Mock window.location
    const originalLocation = window.location;
    delete (window as any).location;
    window.location = { ...originalLocation, href: '' } as any;

    render(<LanguagePicker languages={mockLanguages} />);
    fireEvent.change(screen.getByLabelText(/i know/i), { target: { value: 'python' } });
    fireEvent.change(screen.getByLabelText(/i want to learn/i), { target: { value: 'rust' } });
    fireEvent.click(screen.getByRole('button', { name: /start learning/i }));
    expect(window.location.href).toBe('/learn/python/rust/variables');

    window.location = originalLocation;
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run tests/components/LanguagePicker.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 5: Implement LanguagePicker**

Create `src/components/LanguagePicker.tsx`:

```tsx
import { useState } from 'react';
import type { LanguageInfo } from '@/types';

interface Props {
  languages: LanguageInfo[];
  firstFeatureSlug?: string;
}

export function LanguagePicker({ languages, firstFeatureSlug = 'variables' }: Props) {
  const [known, setKnown] = useState('');
  const [learning, setLearning] = useState('');

  const canStart = known !== '' && learning !== '' && known !== learning;

  function handleStart() {
    if (!canStart) return;
    window.location.href = `/learn/${known}/${learning}/${firstFeatureSlug}`;
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <label htmlFor="known-lang" className="text-sm font-medium text-gray-300">
          I know
        </label>
        <select
          id="known-lang"
          value={known}
          onChange={(e) => {
            setKnown(e.target.value);
            if (e.target.value === learning) setLearning('');
          }}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="">Select a language...</option>
          {languages.map((lang) => (
            <option key={lang.slug} value={lang.slug}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="learning-lang" className="text-sm font-medium text-gray-300">
          I want to learn
        </label>
        <select
          id="learning-lang"
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Select a language...</option>
          {languages.map((lang) => (
            <option key={lang.slug} value={lang.slug} disabled={lang.slug === known}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleStart}
        disabled={!canStart}
        className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Start Learning
      </button>
    </div>
  );
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run tests/components/LanguagePicker.test.tsx`
Expected: All tests PASS.

- [ ] **Step 7: Create landing page**

Create `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { LanguagePicker } from '../components/LanguagePicker';
import { getAvailableLanguages } from '../lib/languages';
import { loadFeatures, getFlatFeatureList } from '../lib/features';

const languages = await getAvailableLanguages();
const config = await loadFeatures();
const firstFeature = getFlatFeatureList(config)[0];
---

<BaseLayout title="Learn by Comparing">
  <div class="max-w-4xl mx-auto px-6 py-20 text-center">
    <h1 class="text-5xl font-bold mb-6">
      Learn a new language by<br />
      <span class="text-emerald-400">comparing it to what you know</span>
    </h1>
    <p class="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
      Pick a language you know and one you want to learn. We'll show you every feature
      side-by-side with examples, descriptions, and gotchas.
    </p>
    <div class="flex justify-center">
      <LanguagePicker
        client:load
        languages={languages}
        firstFeatureSlug={firstFeature?.slug ?? 'variables'}
      />
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 8: Verify build works**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add base layout, landing page, and language picker"
```

---

## Task 6: Comparison View Component

The core side-by-side (desktop) / tabbed (mobile) comparison component.

**Files:**
- Create: `src/components/ComparisonPanel.tsx`
- Create: `src/components/ComparisonView.tsx`
- Create: `tests/components/ComparisonView.test.tsx`

- [ ] **Step 1: Write failing test for ComparisonView**

Create `tests/components/ComparisonView.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComparisonView } from '@/components/ComparisonView';
import type { FeatureContent } from '@/types';

const knownContent: FeatureContent = {
  frontmatter: {
    title: 'Variables',
    language: 'python',
    feature: 'variables',
    category: 'basics',
    applicable: true,
  },
  body: '## Example\n\n```python\nname = "hello"\n```\n\n## Gotchas\n\n- Can change type',
};

const learningContent: FeatureContent = {
  frontmatter: {
    title: 'Variables',
    language: 'rust',
    feature: 'variables',
    category: 'basics',
    applicable: true,
  },
  body: '## Example\n\n```rust\nlet name = "hello";\n```',
};

describe('ComparisonView', () => {
  it('renders both language panels', () => {
    render(
      <ComparisonView
        known={knownContent}
        learning={learningContent}
        knownName="Python"
        learningName="Rust"
      />
    );
    expect(screen.getByText('Python')).toBeDefined();
    expect(screen.getByText('Rust')).toBeDefined();
  });

  it('shows known label and learning label', () => {
    render(
      <ComparisonView
        known={knownContent}
        learning={learningContent}
        knownName="Python"
        learningName="Rust"
      />
    );
    expect(screen.getByText(/you know/i)).toBeDefined();
    expect(screen.getByText(/learning/i)).toBeDefined();
  });

  it('renders tab buttons for mobile view', () => {
    render(
      <ComparisonView
        known={knownContent}
        learning={learningContent}
        knownName="Python"
        learningName="Rust"
      />
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
  });

  it('switches tabs on click', () => {
    render(
      <ComparisonView
        known={knownContent}
        learning={learningContent}
        knownName="Python"
        learningName="Rust"
      />
    );
    const tabs = screen.getAllByRole('tab');
    fireEvent.click(tabs[1]); // Click "Learning" tab
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/components/ComparisonView.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement ComparisonPanel**

Create `src/components/ComparisonPanel.tsx`:

```tsx
import type { FeatureContent } from '@/types';

interface Props {
  content: FeatureContent;
  languageName: string;
  variant: 'known' | 'learning';
  onAskAboutThis?: () => void;
}

export function ComparisonPanel({ content, languageName, variant, onAskAboutThis }: Props) {
  const accentColor = variant === 'known' ? 'emerald' : 'amber';
  const label = variant === 'known' ? 'You know' : 'Learning';

  return (
    <div className={`bg-gray-900 rounded-xl border border-gray-800 overflow-hidden`}>
      <div className={`px-4 py-3 border-b border-gray-800 flex items-center justify-between bg-gray-900/50`}>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold uppercase tracking-wider text-${accentColor}-400`}>
            {label}
          </span>
          <span className="text-white font-semibold">{languageName}</span>
        </div>
        {onAskAboutThis && (
          <button
            onClick={onAskAboutThis}
            className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded border border-gray-700 hover:border-gray-600"
          >
            Ask about this
          </button>
        )}
      </div>
      <div className="p-5">
        {!content.frontmatter.applicable ? (
          <div className={`text-${accentColor}-400/80 text-sm italic mb-4`}>
            This concept doesn't directly exist in {languageName}.
          </div>
        ) : null}
        <div
          className="prose prose-invert prose-sm max-w-none
            prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800
            prose-code:text-emerald-300 prose-headings:text-gray-200
            prose-p:text-gray-300 prose-li:text-gray-300"
          dangerouslySetInnerHTML={{ __html: content.body }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Implement ComparisonView**

Create `src/components/ComparisonView.tsx`:

```tsx
import { useState } from 'react';
import { ComparisonPanel } from './ComparisonPanel';
import type { FeatureContent } from '@/types';

interface Props {
  known: FeatureContent;
  learning: FeatureContent;
  knownName: string;
  learningName: string;
  onAskAboutKnown?: () => void;
  onAskAboutLearning?: () => void;
}

export function ComparisonView({
  known,
  learning,
  knownName,
  learningName,
  onAskAboutKnown,
  onAskAboutLearning,
}: Props) {
  const [activeTab, setActiveTab] = useState<'known' | 'learning'>('known');

  return (
    <div>
      {/* Mobile tabs */}
      <div className="flex md:hidden mb-4 bg-gray-900 rounded-lg p-1" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'known'}
          onClick={() => setActiveTab('known')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'known'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {knownName} <span className="text-xs opacity-70">(you know)</span>
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'learning'}
          onClick={() => setActiveTab('learning')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'learning'
              ? 'bg-amber-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {learningName} <span className="text-xs opacity-70">(learning)</span>
        </button>
      </div>

      {/* Mobile view - single panel */}
      <div className="md:hidden">
        {activeTab === 'known' ? (
          <ComparisonPanel
            content={known}
            languageName={knownName}
            variant="known"
            onAskAboutThis={onAskAboutKnown}
          />
        ) : (
          <ComparisonPanel
            content={learning}
            languageName={learningName}
            variant="learning"
            onAskAboutThis={onAskAboutLearning}
          />
        )}
      </div>

      {/* Desktop view - side by side */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <ComparisonPanel
          content={known}
          languageName={knownName}
          variant="known"
          onAskAboutThis={onAskAboutKnown}
        />
        <ComparisonPanel
          content={learning}
          languageName={learningName}
          variant="learning"
          onAskAboutThis={onAskAboutLearning}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/components/ComparisonView.test.tsx`
Expected: All tests PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add comparison view with side-by-side and tabbed layouts"
```

---

## Task 7: Feature Navigation & Mark Complete

Previous/Next navigation and the "Mark as complete" button.

**Files:**
- Create: `src/components/FeatureNav.tsx`
- Create: `src/components/MarkComplete.tsx`
- Create: `src/components/Breadcrumb.tsx`
- Create: `tests/components/FeatureNav.test.tsx`
- Create: `tests/components/MarkComplete.test.tsx`

- [ ] **Step 1: Write failing test for FeatureNav**

Create `tests/components/FeatureNav.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureNav } from '@/components/FeatureNav';

describe('FeatureNav', () => {
  it('renders previous and next links', () => {
    render(
      <FeatureNav
        knownLang="python"
        learningLang="rust"
        prev={{ slug: 'variables', title: 'Variables', category: 'basics', order: 1 }}
        next={{ slug: 'operators', title: 'Operators', category: 'basics', order: 3 }}
      />
    );
    expect(screen.getByText(/variables/i)).toBeDefined();
    expect(screen.getByText(/operators/i)).toBeDefined();
  });

  it('hides previous when null', () => {
    render(
      <FeatureNav
        knownLang="python"
        learningLang="rust"
        prev={null}
        next={{ slug: 'types', title: 'Types', category: 'basics', order: 2 }}
      />
    );
    expect(screen.queryByText(/previous/i)).toBeNull();
    expect(screen.getByText(/types/i)).toBeDefined();
  });

  it('hides next when null', () => {
    render(
      <FeatureNav
        knownLang="python"
        learningLang="rust"
        prev={{ slug: 'variables', title: 'Variables', category: 'basics', order: 1 }}
        next={null}
      />
    );
    expect(screen.getByText(/variables/i)).toBeDefined();
    expect(screen.queryByText(/next/i)).toBeNull();
  });

  it('links to correct URLs', () => {
    render(
      <FeatureNav
        knownLang="python"
        learningLang="rust"
        prev={{ slug: 'variables', title: 'Variables', category: 'basics', order: 1 }}
        next={{ slug: 'operators', title: 'Operators', category: 'basics', order: 3 }}
      />
    );
    const links = screen.getAllByRole('link');
    expect(links[0].getAttribute('href')).toBe('/learn/python/rust/variables');
    expect(links[1].getAttribute('href')).toBe('/learn/python/rust/operators');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/components/FeatureNav.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement FeatureNav**

Create `src/components/FeatureNav.tsx`:

```tsx
import type { FeatureDefinition } from '@/types';

interface Props {
  knownLang: string;
  learningLang: string;
  prev: FeatureDefinition | null;
  next: FeatureDefinition | null;
}

export function FeatureNav({ knownLang, learningLang, prev, next }: Props) {
  const buildUrl = (slug: string) => `/learn/${knownLang}/${learningLang}/${slug}`;

  return (
    <nav className="flex items-center justify-between py-6 border-t border-gray-800 mt-8">
      {prev ? (
        <a
          href={buildUrl(prev.slug)}
          className="flex flex-col items-start text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-wider mb-1">Previous</span>
          <span className="font-medium">{prev.title}</span>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a
          href={buildUrl(next.slug)}
          className="flex flex-col items-end text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-wider mb-1">Next</span>
          <span className="font-medium">{next.title}</span>
        </a>
      ) : (
        <div />
      )}
    </nav>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/components/FeatureNav.test.tsx`
Expected: All tests PASS.

- [ ] **Step 5: Write failing test for MarkComplete**

Create `tests/components/MarkComplete.test.tsx`:

```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MarkComplete } from '@/components/MarkComplete';

const storage = new Map<string, string>();
const localStorageMock = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
  get length() { return storage.size; },
  key: (i: number) => Array.from(storage.keys())[i] ?? null,
};
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

beforeEach(() => storage.clear());

describe('MarkComplete', () => {
  it('renders uncompleted state by default', () => {
    render(<MarkComplete knownLang="python" learningLang="rust" featureSlug="variables" />);
    expect(screen.getByRole('button', { name: /mark as complete/i })).toBeDefined();
  });

  it('marks feature complete on click', () => {
    render(<MarkComplete knownLang="python" learningLang="rust" featureSlug="variables" />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/completed/i)).toBeDefined();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run tests/components/MarkComplete.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 7: Implement MarkComplete**

Create `src/components/MarkComplete.tsx`:

```tsx
import { useState, useEffect } from 'react';
import { isFeatureComplete, markFeatureComplete } from '@/lib/progress';

interface Props {
  knownLang: string;
  learningLang: string;
  featureSlug: string;
}

export function MarkComplete({ knownLang, learningLang, featureSlug }: Props) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(isFeatureComplete(knownLang, learningLang, featureSlug));
  }, [knownLang, learningLang, featureSlug]);

  function handleClick() {
    markFeatureComplete(knownLang, learningLang, featureSlug);
    setCompleted(true);
  }

  if (completed) {
    return (
      <div className="flex items-center gap-2 text-emerald-400 py-3">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">Completed</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 py-3 transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-medium">Mark as complete</span>
    </button>
  );
}
```

- [ ] **Step 8: Implement Breadcrumb**

Create `src/components/Breadcrumb.tsx`:

```tsx
interface Props {
  category: string;
  categoryTitle: string;
  featureTitle: string;
  knownLang: string;
  learningLang: string;
}

export function Breadcrumb({ categoryTitle, featureTitle, knownLang, learningLang }: Props) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      <a
        href={`/learn/${knownLang}/${learningLang}`}
        className="hover:text-white transition-colors"
      >
        All Topics
      </a>
      <span>/</span>
      <span>{categoryTitle}</span>
      <span>/</span>
      <span className="text-white">{featureTitle}</span>
    </nav>
  );
}
```

- [ ] **Step 9: Run all tests to verify they pass**

Run: `npx vitest run tests/components/FeatureNav.test.tsx tests/components/MarkComplete.test.tsx`
Expected: All tests PASS.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add feature navigation, mark complete, and breadcrumb components"
```

---

## Task 8: Comparison Page & Dynamic Routes

Wire up the Astro pages with dynamic routing for `[known]/[learning]/[feature]`.

**Files:**
- Create: `src/layouts/LessonLayout.astro`
- Create: `src/pages/learn/[known]/[learning]/[feature].astro`

- [ ] **Step 1: Create LessonLayout**

Create `src/layouts/LessonLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  knownLang: string;
  learningLang: string;
  knownName: string;
  learningName: string;
}

const { title, knownLang, learningLang, knownName, learningName } = Astro.props;
---

<BaseLayout title={title}>
  <div class="max-w-7xl mx-auto px-6 py-8">
    <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
      <span class="text-emerald-400 font-medium">{knownName}</span>
      <span>→</span>
      <span class="text-amber-400 font-medium">{learningName}</span>
    </div>
    <slot />
  </div>
</BaseLayout>
```

- [ ] **Step 2: Create the dynamic feature page**

Create `src/pages/learn/[known]/[learning]/[feature].astro`:

```astro
---
import LessonLayout from '../../../../layouts/LessonLayout.astro';
import { ComparisonView } from '../../../../components/ComparisonView';
import { FeatureNav } from '../../../../components/FeatureNav';
import { MarkComplete } from '../../../../components/MarkComplete';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import { loadFeatures, getFlatFeatureList, getAdjacentFeatures } from '../../../../lib/features';
import { getAvailableLanguages } from '../../../../lib/languages';
import { loadFeatureContent } from '../../../../lib/content';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
  const config = await loadFeatures();
  const languages = await getAvailableLanguages();
  const features = getFlatFeatureList(config);
  const paths = [];

  for (const known of languages) {
    for (const learning of languages) {
      if (known.slug === learning.slug) continue;
      for (const feature of features) {
        paths.push({
          params: {
            known: known.slug,
            learning: learning.slug,
            feature: feature.slug,
          },
          props: {
            knownName: known.name,
            learningName: learning.name,
            featureTitle: feature.title,
            featureCategory: feature.category,
          },
        });
      }
    }
  }

  return paths;
};

const { known, learning, feature } = Astro.params;
const { knownName, learningName, featureTitle, featureCategory } = Astro.props;

const config = await loadFeatures();
const category = config.categories.find((c) => c.slug === featureCategory);
const { prev, next } = getAdjacentFeatures(config, feature!);

// getStaticPaths already constrains valid pages, so content always exists at build time
const knownContent = await loadFeatureContent(known!, featureCategory, feature!);
const learningContent = await loadFeatureContent(learning!, featureCategory, feature!);
---

<LessonLayout
  title={featureTitle}
  knownLang={known!}
  learningLang={learning!}
  knownName={knownName}
  learningName={learningName}
>
  <Breadcrumb
    category={featureCategory}
    categoryTitle={category?.title ?? featureCategory}
    featureTitle={featureTitle}
    knownLang={known!}
    learningLang={learning!}
  />

  <h1 class="text-3xl font-bold text-white mb-8">{featureTitle}</h1>

  <ComparisonView
    client:load
    known={knownContent}
    learning={learningContent}
    knownName={knownName}
    learningName={learningName}
  />

  <MarkComplete
    client:load
    knownLang={known!}
    learningLang={learning!}
    featureSlug={feature!}
  />

  <FeatureNav
    knownLang={known!}
    learningLang={learning!}
    prev={prev}
    next={next}
  />
</LessonLayout>
```

- [ ] **Step 3: Verify build works**

Run: `npm run build`
Expected: Build succeeds. Static pages generated for all language pair + feature combinations.

- [ ] **Step 4: Verify dev server renders a comparison page**

Run: `npm run dev`
Visit: `http://localhost:4321/learn/python/javascript/variables`
Expected: Side-by-side comparison renders with Python and JavaScript variables content.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add comparison page with dynamic routes and lesson layout"
```

---

## Task 9: Dashboard Page

The language pair dashboard with feature grid, progress, and filters.

**Files:**
- Create: `src/components/Dashboard.tsx`
- Create: `src/components/ProgressBar.tsx`
- Create: `src/pages/learn/[known]/[learning]/index.astro`
- Create: `tests/components/Dashboard.test.tsx`

- [ ] **Step 1: Write failing test for Dashboard**

Create `tests/components/Dashboard.test.tsx`:

```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dashboard } from '@/components/Dashboard';
import type { CategoryDefinition } from '@/types';

const storage = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
    get length() { return storage.size; },
    key: (i: number) => Array.from(storage.keys())[i] ?? null,
  },
});

beforeEach(() => storage.clear());

const mockCategories: CategoryDefinition[] = [
  {
    slug: 'basics',
    title: 'Basics',
    order: 1,
    features: [
      { slug: 'variables', title: 'Variables', category: 'basics', order: 1 },
      { slug: 'types', title: 'Types', category: 'basics', order: 2 },
    ],
  },
  {
    slug: 'functions',
    title: 'Functions',
    order: 2,
    features: [
      { slug: 'declaration', title: 'Declaration', category: 'functions', order: 1 },
    ],
  },
];

describe('Dashboard', () => {
  it('renders all categories', () => {
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    expect(screen.getByText('Basics')).toBeDefined();
    expect(screen.getByText('Functions')).toBeDefined();
  });

  it('renders all features', () => {
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    expect(screen.getByText('Variables')).toBeDefined();
    expect(screen.getByText('Types')).toBeDefined();
    expect(screen.getByText('Declaration')).toBeDefined();
  });

  it('shows progress count', () => {
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    expect(screen.getByText(/0.*of.*3/i)).toBeDefined();
  });

  it('links features to correct URLs', () => {
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    const varLink = screen.getByText('Variables').closest('a');
    expect(varLink?.getAttribute('href')).toBe('/learn/python/rust/variables');
  });

  it('filters to show only remaining features', () => {
    // Mark one complete
    storage.set('polyglotify:progress:python:rust', JSON.stringify({
      knownLang: 'python', learningLang: 'rust', completed: ['variables'], lastFeature: 'variables',
    }));
    render(<Dashboard categories={mockCategories} knownLang="python" learningLang="rust" />);
    fireEvent.click(screen.getByText(/remaining/i));
    expect(screen.queryByText('Variables')).toBeNull();
    expect(screen.getByText('Types')).toBeDefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/components/Dashboard.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement ProgressBar**

Create `src/components/ProgressBar.tsx`:

```tsx
interface Props {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: Props) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">
          {completed} of {total} features completed
        </span>
        <span className="text-sm font-medium text-emerald-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Implement Dashboard**

Create `src/components/Dashboard.tsx`:

```tsx
import { useState, useEffect } from 'react';
import { ProgressBar } from './ProgressBar';
import { getProgress, getNextIncompleteFeature } from '@/lib/progress';
import type { CategoryDefinition } from '@/types';

interface Props {
  categories: CategoryDefinition[];
  knownLang: string;
  learningLang: string;
}

type Filter = 'all' | 'completed' | 'remaining';

export function Dashboard({ categories, knownLang, learningLang }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [completedSet, setCompletedSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    const progress = getProgress(knownLang, learningLang);
    setCompletedSet(new Set(progress?.completed ?? []));
  }, [knownLang, learningLang]);

  const allFeatures = categories.flatMap((c) => c.features);
  const completedCount = completedSet.size;
  const totalCount = allFeatures.length;
  const allSlugs = allFeatures.map((f) => f.slug);
  const nextFeature = getNextIncompleteFeature(knownLang, learningLang, allSlugs);

  function isVisible(slug: string): boolean {
    if (filter === 'all') return true;
    if (filter === 'completed') return completedSet.has(slug);
    return !completedSet.has(slug);
  }

  return (
    <div>
      <ProgressBar completed={completedCount} total={totalCount} />

      {nextFeature && (
        <a
          href={`/learn/${knownLang}/${learningLang}/${nextFeature}`}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-5 rounded-lg transition-colors mb-8"
        >
          Resume
        </a>
      )}

      <div className="flex gap-2 mb-6">
        {(['all', 'completed', 'remaining'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {categories.map((category) => {
          const visibleFeatures = category.features.filter((f) => isVisible(f.slug));
          if (visibleFeatures.length === 0) return null;

          return (
            <div key={category.slug}>
              <h2 className="text-lg font-semibold text-white mb-3">{category.title}</h2>
              <div className="grid gap-2">
                {visibleFeatures.map((feature) => (
                  <a
                    key={feature.slug}
                    href={`/learn/${knownLang}/${learningLang}/${feature.slug}`}
                    className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 hover:border-gray-700 transition-colors"
                  >
                    <span className="text-gray-200">{feature.title}</span>
                    {completedSet.has(feature.slug) && (
                      <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/components/Dashboard.test.tsx`
Expected: All tests PASS.

- [ ] **Step 6: Create dashboard Astro page**

Create `src/pages/learn/[known]/[learning]/index.astro`:

```astro
---
import LessonLayout from '../../../../layouts/LessonLayout.astro';
import { Dashboard } from '../../../../components/Dashboard';
import { loadFeatures } from '../../../../lib/features';
import { getAvailableLanguages } from '../../../../lib/languages';
import type { GetStaticPaths } from 'astro';

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = await getAvailableLanguages();
  const paths = [];

  for (const known of languages) {
    for (const learning of languages) {
      if (known.slug === learning.slug) continue;
      paths.push({
        params: { known: known.slug, learning: learning.slug },
        props: { knownName: known.name, learningName: learning.name },
      });
    }
  }

  return paths;
};

const { known, learning } = Astro.params;
const { knownName, learningName } = Astro.props;
const config = await loadFeatures();
---

<LessonLayout
  title={`${knownName} → ${learningName}`}
  knownLang={known!}
  learningLang={learning!}
  knownName={knownName}
  learningName={learningName}
>
  <h1 class="text-3xl font-bold text-white mb-2">
    {knownName} → {learningName}
  </h1>
  <p class="text-gray-400 mb-8">Track your progress through every feature comparison.</p>

  <Dashboard
    client:load
    categories={config.categories}
    knownLang={known!}
    learningLang={learning!}
  />
</LessonLayout>
```

- [ ] **Step 7: Verify build works**

Run: `npm run build`
Expected: Build succeeds. Dashboard pages generated for all language pairs.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add dashboard page with progress tracking, filters, and resume"
```

---

## Task 10: AI Chat Component

Floating chat button + contextual "Ask about this" chat panel with BYOK support.

**Files:**
- Create: `src/components/AiChat.tsx`
- Create: `src/components/AiChatButton.tsx`
- Create: `src/components/AiKeyPrompt.tsx`
- Create: `src/lib/ai.ts`
- Create: `tests/lib/ai.test.ts`
- Create: `tests/components/AiChat.test.tsx`

- [ ] **Step 1: Write failing test for ai.ts**

Create `tests/lib/ai.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { getAiConfig, saveByokKey, clearByokKey, hasAiAccess } from '@/lib/ai';

const storage = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
  },
});

beforeEach(() => storage.clear());

describe('getAiConfig', () => {
  it('returns no access by default', () => {
    const config = getAiConfig();
    expect(config.mode).toBe('none');
  });

  it('returns byok mode when key is saved', () => {
    saveByokKey('sk-test-123');
    const config = getAiConfig();
    expect(config.mode).toBe('byok');
    expect(config.apiKey).toBe('sk-test-123');
  });
});

describe('hasAiAccess', () => {
  it('returns false with no key', () => {
    expect(hasAiAccess()).toBe(false);
  });

  it('returns true with BYOK key', () => {
    saveByokKey('sk-test-123');
    expect(hasAiAccess()).toBe(true);
  });
});

describe('clearByokKey', () => {
  it('removes the stored key', () => {
    saveByokKey('sk-test-123');
    clearByokKey();
    expect(hasAiAccess()).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/ai.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement ai.ts**

Create `src/lib/ai.ts`:

```typescript
const BYOK_KEY = 'polyglotify:ai:byok-key';

export interface AiConfig {
  mode: 'none' | 'byok' | 'paid';
  apiKey?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function getAiConfig(): AiConfig {
  const byokKey = localStorage.getItem(BYOK_KEY);
  if (byokKey) return { mode: 'byok', apiKey: byokKey };
  // TODO: Check paid account auth token when auth is implemented
  return { mode: 'none' };
}

export function saveByokKey(key: string): void {
  localStorage.setItem(BYOK_KEY, key);
}

export function clearByokKey(): void {
  localStorage.removeItem(BYOK_KEY);
}

export function hasAiAccess(): boolean {
  return getAiConfig().mode !== 'none';
}

export function buildSystemPrompt(knownLang: string, learningLang: string): string {
  return `You are a programming language tutor helping someone who knows ${knownLang} learn ${learningLang}. Explain concepts by relating back to what they already know in ${knownLang}. Be concise but thorough. Use code examples in both languages when helpful.`;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  systemPrompt: string,
  config: AiConfig
): Promise<string> {
  if (config.mode === 'byok' && config.apiKey) {
    return sendByokMessage(messages, systemPrompt, config.apiKey);
  }
  if (config.mode === 'paid') {
    return sendPaidMessage(messages, systemPrompt);
  }
  throw new Error('No AI access configured');
}

async function sendByokMessage(
  messages: ChatMessage[],
  systemPrompt: string,
  apiKey: string
): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI request failed: ${error}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

async function sendPaidMessage(
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, systemPrompt }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI request failed: ${error}`);
  }

  const data = await response.json();
  return data.content;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/lib/ai.test.ts`
Expected: All tests PASS.

- [ ] **Step 5: Write failing test for AiChat**

Create `tests/components/AiChat.test.tsx`:

```tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AiChat } from '@/components/AiChat';

const storage = new Map<string, string>();
Object.defineProperty(globalThis, 'localStorage', {
  value: {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
  },
});

beforeEach(() => storage.clear());

describe('AiChat', () => {
  it('renders closed by default', () => {
    render(<AiChat knownLang="python" learningLang="rust" />);
    expect(screen.queryByPlaceholderText(/ask/i)).toBeNull();
  });

  it('opens when isOpen is true', () => {
    render(<AiChat knownLang="python" learningLang="rust" isOpen={true} />);
    expect(screen.getByPlaceholderText(/ask/i)).toBeDefined();
  });

  it('shows key prompt when no API access', () => {
    render(<AiChat knownLang="python" learningLang="rust" isOpen={true} />);
    expect(screen.getByText(/api key/i)).toBeDefined();
  });

  it('shows chat input when BYOK key is set', () => {
    storage.set('polyglotify:ai:byok-key', 'sk-test');
    render(<AiChat knownLang="python" learningLang="rust" isOpen={true} />);
    expect(screen.getByPlaceholderText(/ask/i)).toBeDefined();
    expect(screen.queryByText(/api key/i)).toBeNull();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run tests/components/AiChat.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 7: Implement AiKeyPrompt**

Create `src/components/AiKeyPrompt.tsx`:

```tsx
import { useState } from 'react';
import { saveByokKey } from '@/lib/ai';

interface Props {
  onKeySet: () => void;
}

export function AiKeyPrompt({ onKeySet }: Props) {
  const [key, setKey] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!key.trim()) return;
    saveByokKey(key.trim());
    onKeySet();
  }

  return (
    <div className="p-4">
      <p className="text-sm text-gray-300 mb-3">
        AI chat requires an API key or a paid account.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="api-key" className="text-xs text-gray-400 block mb-1">
            Anthropic API Key
          </label>
          <input
            id="api-key"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <p className="text-xs text-gray-500">
          Your key is stored locally and never sent to our servers.
        </p>
        <button
          type="submit"
          disabled={!key.trim()}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          Save Key
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 8: Implement AiChat**

Create `src/components/AiChat.tsx`:

```tsx
import { useState, useRef, useEffect } from 'react';
import { AiKeyPrompt } from './AiKeyPrompt';
import { hasAiAccess, getAiConfig, buildSystemPrompt, sendChatMessage } from '@/lib/ai';
import type { ChatMessage } from '@/lib/ai';

interface Props {
  knownLang: string;
  learningLang: string;
  isOpen?: boolean;
  onClose?: () => void;
  contextMessage?: string;
}

export function AiChat({ knownLang, learningLang, isOpen = false, onClose, contextMessage }: Props) {
  const [hasAccess, setHasAccess] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasAccess(hasAiAccess());
  }, []);

  useEffect(() => {
    if (contextMessage && hasAccess && messages.length === 0) {
      setInput(contextMessage);
    }
  }, [contextMessage, hasAccess]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const config = getAiConfig();
      const systemPrompt = buildSystemPrompt(knownLang, learningLang);
      const response = await sendChatMessage(newMessages, systemPrompt, config);
      setMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: `Error: ${err instanceof Error ? err.message : 'Something went wrong'}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-20 right-6 w-96 max-h-[70vh] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {!hasAccess ? (
        <AiKeyPrompt onKeySet={() => setHasAccess(true)} />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.length === 0 && (
              <p className="text-sm text-gray-500 text-center mt-8">
                Ask anything about {knownLang} vs {learningLang}
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm rounded-lg px-3 py-2 ${
                  msg.role === 'user'
                    ? 'bg-emerald-900/30 text-emerald-100 ml-8'
                    : 'bg-gray-800 text-gray-200 mr-8'
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-800 text-gray-400 text-sm rounded-lg px-3 py-2 mr-8 animate-pulse">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 9: Implement AiChatButton**

Create `src/components/AiChatButton.tsx`:

```tsx
interface Props {
  onClick: () => void;
  isOpen: boolean;
}

export function AiChatButton({ onClick, isOpen }: Props) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all z-50 flex items-center justify-center ${
        isOpen
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-emerald-600 hover:bg-emerald-500'
      }`}
      aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
    >
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        )}
      </svg>
    </button>
  );
}
```

- [ ] **Step 10: Run tests to verify they pass**

Run: `npx vitest run tests/lib/ai.test.ts tests/components/AiChat.test.tsx`
Expected: All tests PASS.

- [ ] **Step 11: Wire AI chat into the comparison page**

Update `src/pages/learn/[known]/[learning]/[feature].astro` to import and render the `AiChatButton` and `AiChat` components. Add a wrapper React island component that manages the open/close state and passes contextual information.

Create `src/components/AiChatWrapper.tsx`:

```tsx
import { useState } from 'react';
import { AiChat } from './AiChat';
import { AiChatButton } from './AiChatButton';

interface Props {
  knownLang: string;
  learningLang: string;
  featureContext?: string;
}

export function AiChatWrapper({ knownLang, learningLang, featureContext }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AiChat
        knownLang={knownLang}
        learningLang={learningLang}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contextMessage={featureContext}
      />
      <AiChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
}
```

Add to the bottom of `[feature].astro` (before closing `</LessonLayout>`):

```astro
<AiChatWrapper
  client:load
  knownLang={known!}
  learningLang={learning!}
  featureContext={`Help me understand "${featureTitle}" — comparing ${knownName} to ${learningName}`}
/>
```

- [ ] **Step 12: Verify build works**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: add AI chat with BYOK support and floating/contextual entry points"
```

---

## Task 11: Content Validation Script

CI script to validate that every language covers every feature and frontmatter is correct.

**Files:**
- Create: `scripts/validate-content.ts`
- Create: `tests/scripts/validate-content.test.ts`

- [ ] **Step 1: Write failing test for validate-content**

Create `tests/scripts/validate-content.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { validateContent } from '../scripts/validate-content';

describe('validateContent', () => {
  it('returns no frontmatter or consistency errors for authored content', async () => {
    const errors = await validateContent();
    // Filter out "file missing" errors since we only have sample content for a subset of features.
    // This test verifies that all *authored* files have valid frontmatter and consistent metadata.
    const nonMissingErrors = errors.filter((e) => !e.endsWith('file missing'));
    expect(nonMissingErrors).toEqual([]);
  });

  it('reports missing files for incomplete languages', async () => {
    const errors = await validateContent();
    const missingErrors = errors.filter((e) => e.endsWith('file missing'));
    // We only authored basics/variables and basics/types — the rest should be missing
    expect(missingErrors.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/scripts/validate-content.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement validate-content.ts**

Create `scripts/validate-content.ts`:

```typescript
import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import matter from 'gray-matter';
import type { FeaturesConfig } from '../src/types';

const CONTENT_DIR = path.resolve('content');
const FEATURES_PATH = path.join(CONTENT_DIR, 'features.yaml');
const LANGUAGES_DIR = path.join(CONTENT_DIR, 'languages');

const REQUIRED_FRONTMATTER = ['title', 'language', 'feature', 'category', 'applicable'];

export async function validateContent(): Promise<string[]> {
  const errors: string[] = [];

  // Load features.yaml
  let config: FeaturesConfig;
  try {
    const raw = await fs.readFile(FEATURES_PATH, 'utf-8');
    config = yaml.load(raw) as FeaturesConfig;
  } catch (e) {
    return [`Cannot read features.yaml: ${e}`];
  }

  // Discover languages
  const langEntries = await fs.readdir(LANGUAGES_DIR, { withFileTypes: true });
  const languages = langEntries.filter((e) => e.isDirectory()).map((e) => e.name);

  if (languages.length === 0) {
    return ['No languages found in content/languages/'];
  }

  // Check every language has every feature
  for (const lang of languages) {
    for (const category of config.categories) {
      for (const feature of category.features) {
        const filePath = path.join(LANGUAGES_DIR, lang, category.slug, `${feature.slug}.md`);
        try {
          const raw = await fs.readFile(filePath, 'utf-8');
          const { data } = matter(raw);

          // Validate frontmatter
          for (const field of REQUIRED_FRONTMATTER) {
            if (data[field] === undefined) {
              errors.push(`${lang}/${category.slug}/${feature.slug}.md: missing frontmatter field "${field}"`);
            }
          }

          // Validate frontmatter values
          if (data.language && data.language !== lang) {
            errors.push(`${lang}/${category.slug}/${feature.slug}.md: language "${data.language}" doesn't match directory "${lang}"`);
          }
          if (data.feature && data.feature !== feature.slug) {
            errors.push(`${lang}/${category.slug}/${feature.slug}.md: feature "${data.feature}" doesn't match expected "${feature.slug}"`);
          }
          if (data.category && data.category !== category.slug) {
            errors.push(`${lang}/${category.slug}/${feature.slug}.md: category "${data.category}" doesn't match expected "${category.slug}"`);
          }
          if (data.applicable !== undefined && typeof data.applicable !== 'boolean') {
            errors.push(`${lang}/${category.slug}/${feature.slug}.md: "applicable" must be boolean`);
          }
        } catch {
          errors.push(`${lang}/${category.slug}/${feature.slug}.md: file missing`);
        }
      }
    }
  }

  return errors;
}

// CLI entry point
const isMainModule = process.argv[1]?.endsWith('validate-content.ts');
if (isMainModule) {
  validateContent().then((errors) => {
    if (errors.length === 0) {
      console.log('Content validation passed!');
      process.exit(0);
    } else {
      console.error('Content validation failed:');
      errors.forEach((e) => console.error(`  - ${e}`));
      process.exit(1);
    }
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/scripts/validate-content.test.ts`
Expected: PASS (but will report missing files for features not yet authored — that's expected for now since we only have 2 features per language as samples).

Note: Adjust test expectation if needed — the test validates that sample content we've written is valid. Missing files for features we haven't authored yet are expected and can be filtered.

- [ ] **Step 5: Verify CLI works**

Run: `npm run validate-content`
Expected: Outputs list of missing files (for features without content yet) — this is correct behavior.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add content validation script for CI"
```

---

## Task 12: Contributor Scaffolding Scripts

Scripts to scaffold new languages and new features.

**Files:**
- Create: `scripts/new-language.ts`
- Create: `scripts/new-feature.ts`

- [ ] **Step 1: Implement new-language.ts**

Create `scripts/new-language.ts`:

```typescript
import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import type { FeaturesConfig } from '../src/types';

const CONTENT_DIR = path.resolve('content');
const FEATURES_PATH = path.join(CONTENT_DIR, 'features.yaml');
const LANGUAGES_DIR = path.join(CONTENT_DIR, 'languages');

async function main() {
  const langSlug = process.argv[2];
  if (!langSlug) {
    console.error('Usage: npm run new-language <language-slug>');
    console.error('Example: npm run new-language rust');
    process.exit(1);
  }

  const langDir = path.join(LANGUAGES_DIR, langSlug);
  try {
    await fs.access(langDir);
    console.error(`Language "${langSlug}" already exists at ${langDir}`);
    process.exit(1);
  } catch {
    // Directory doesn't exist, good
  }

  const raw = await fs.readFile(FEATURES_PATH, 'utf-8');
  const config = yaml.load(raw) as FeaturesConfig;

  let fileCount = 0;
  for (const category of config.categories) {
    const categoryDir = path.join(langDir, category.slug);
    await fs.mkdir(categoryDir, { recursive: true });

    for (const feature of category.features) {
      const filePath = path.join(categoryDir, `${feature.slug}.md`);
      const content = `---
title: "${feature.title}"
language: "${langSlug}"
feature: "${feature.slug}"
category: "${category.slug}"
applicable: true
---

TODO: Add description for ${feature.title} in ${langSlug}.

## Example

\`\`\`${langSlug}
// TODO: Add code example
\`\`\`
`;
      await fs.writeFile(filePath, content);
      fileCount++;
    }
  }

  console.log(`Scaffolded ${fileCount} files for "${langSlug}" at ${langDir}`);
  console.log('Edit each file to add descriptions, examples, and gotchas.');
}

main();
```

- [ ] **Step 2: Implement new-feature.ts**

Create `scripts/new-feature.ts`:

```typescript
import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';
import type { FeaturesConfig } from '../src/types';

const CONTENT_DIR = path.resolve('content');
const FEATURES_PATH = path.join(CONTENT_DIR, 'features.yaml');
const LANGUAGES_DIR = path.join(CONTENT_DIR, 'languages');

async function main() {
  const featurePath = process.argv[2];
  const featureTitle = process.argv[3];

  if (!featurePath || !featureTitle) {
    console.error('Usage: npm run new-feature <category/slug> "<Title>"');
    console.error('Example: npm run new-feature basics/pattern-matching "Pattern Matching"');
    process.exit(1);
  }

  const [category, slug] = featurePath.split('/');
  if (!category || !slug) {
    console.error('Feature path must be in format: category/slug');
    process.exit(1);
  }

  // Discover all languages
  const langEntries = await fs.readdir(LANGUAGES_DIR, { withFileTypes: true });
  const languages = langEntries.filter((e) => e.isDirectory()).map((e) => e.name);

  let fileCount = 0;
  for (const lang of languages) {
    const categoryDir = path.join(LANGUAGES_DIR, lang, category);
    await fs.mkdir(categoryDir, { recursive: true });

    const filePath = path.join(categoryDir, `${slug}.md`);
    const content = `---
title: "${featureTitle}"
language: "${lang}"
feature: "${slug}"
category: "${category}"
applicable: true
---

TODO: Add description for ${featureTitle} in ${lang}.

## Example

\`\`\`${lang}
// TODO: Add code example
\`\`\`
`;
    await fs.writeFile(filePath, content);
    fileCount++;
  }

  console.log(`Scaffolded ${fileCount} files for "${featureTitle}" across ${languages.length} languages.`);
  console.log(`Don't forget to add the feature to features.yaml under the "${category}" category.`);
}

main();
```

- [ ] **Step 3: Test new-language script**

Run: `npm run new-language -- rust`
Expected: Scaffolds files for Rust under `content/languages/rust/`, outputs file count.

Verify: `ls content/languages/rust/basics/`
Expected: `variables.md`, `types.md`, `operators.md`, `control-flow.md`

- [ ] **Step 4: Clean up test scaffold (or keep if desired)**

Run: `rm -rf content/languages/rust` (if you don't want to keep it yet)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add scaffolding scripts for new languages and features"
```

---

## Task 13: CONTRIBUTING.md & .gitignore

Documentation for contributors and proper .gitignore.

**Files:**
- Create: `CONTRIBUTING.md`
- Create: `.gitignore`

- [ ] **Step 1: Create .gitignore**

Create `.gitignore`:

```
node_modules/
dist/
.astro/
.superpowers/
.env
.env.*
*.local
```

- [ ] **Step 2: Create CONTRIBUTING.md**

Create `CONTRIBUTING.md`:

```markdown
# Contributing to Polyglotify

Thank you for helping build Polyglotify! This guide covers how to add content and contribute code.

## Adding a New Language

1. Fork the repo and clone it
2. Run the scaffolding script:
   ```bash
   npm run new-language <language-slug>
   ```
   This creates a markdown file for every feature.
3. Edit each file in `content/languages/<your-language>/` to add:
   - A description of the concept in your language
   - Code examples (runnable or near-runnable)
   - Optional gotchas section
4. If a feature doesn't exist in your language, set `applicable: false` in the frontmatter and explain the alternative in the body.
5. Run validation: `npm run validate-content`
6. Submit a PR

## Adding a New Feature

1. Add the feature to `content/features.yaml` under the appropriate category
2. Run the scaffolding script:
   ```bash
   npm run new-feature <category/slug> "<Feature Title>"
   ```
3. Fill in the content for every existing language
4. Run validation: `npm run validate-content`
5. Submit a PR

## Markdown File Format

Every content file follows this structure:

```markdown
---
title: "Feature Name"
language: "language-slug"
feature: "feature-slug"
category: "category-slug"
applicable: true
---

Description of the concept in this language.

## Example

\```language
// Code example here
\```

## Gotchas

- Optional list of common pitfalls
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Feature name as it applies to this language |
| language | string | Yes | Must match the directory name |
| feature | string | Yes | Must match the filename (without .md) |
| category | string | Yes | Must match the parent directory name |
| applicable | boolean | Yes | `false` if the concept doesn't exist in this language |

### When `applicable: false`

Set this when a language doesn't have the concept. In the body, explain:
- Why the concept doesn't exist
- What the language does instead
- An example of the alternative approach

## Development

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run test         # Run tests
npm run validate-content  # Validate content files
```

## Content Guidelines

- Write for someone who knows one language and is learning another
- Keep descriptions concise but complete
- Code examples should be runnable or near-runnable
- Always explain "why" not just "what"
- Use gotchas to highlight non-obvious differences
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: add CONTRIBUTING.md and .gitignore"
```

---

## Task 14: Returning User Detection on Landing Page

Update the landing page to detect returning users and show a "Continue" prompt.

**Files:**
- Create: `src/components/ReturningUserPrompt.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Implement ReturningUserPrompt**

Create `src/components/ReturningUserPrompt.tsx`:

```tsx
import { useState, useEffect } from 'react';
import { getAllProgressKeys, getProgress } from '@/lib/progress';

interface LanguageNames {
  [slug: string]: string;
}

interface Props {
  languageNames: LanguageNames;
}

export function ReturningUserPrompt({ languageNames }: Props) {
  const [sessions, setSessions] = useState<{ known: string; learning: string; lastFeature: string | null }[]>([]);

  useEffect(() => {
    const keys = getAllProgressKeys();
    const results = keys
      .map(({ known, learning }) => {
        const progress = getProgress(known, learning);
        return { known, learning, lastFeature: progress?.lastFeature ?? null };
      })
      .filter(({ lastFeature }) => lastFeature !== null);
    setSessions(results);
  }, []);

  if (sessions.length === 0) return null;

  return (
    <div className="mb-12 p-6 bg-gray-900 border border-gray-800 rounded-xl max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-white mb-3">Welcome back!</h2>
      <div className="space-y-2">
        {sessions.map(({ known, learning }) => (
          <a
            key={`${known}-${learning}`}
            href={`/learn/${known}/${learning}`}
            className="flex items-center justify-between bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg px-4 py-3 transition-colors"
          >
            <span className="text-gray-200">
              {languageNames[known] ?? known} → {languageNames[learning] ?? learning}
            </span>
            <span className="text-emerald-400 text-sm font-medium">Continue</span>
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update landing page to include ReturningUserPrompt**

Add to `src/pages/index.astro`, importing and rendering `ReturningUserPrompt` above the `LanguagePicker`:

```astro
---
import { LanguagePicker } from '../components/LanguagePicker';
import { ReturningUserPrompt } from '../components/ReturningUserPrompt';
// ... existing imports
const languageNames = Object.fromEntries(languages.map(l => [l.slug, l.name]));
---

<!-- Add before the LanguagePicker div -->
<ReturningUserPrompt client:load languageNames={languageNames} />
```

- [ ] **Step 3: Verify build works**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add returning user detection on landing page"
```

---

## Task 15: Final Integration Test & Polish

Run a full build, verify all tests pass, and do a manual smoke test.

**Files:**
- No new files

- [ ] **Step 1: Run all tests**

Run: `npm run test`
Expected: All tests PASS.

- [ ] **Step 2: Run content validation**

Run: `npm run validate-content`
Expected: Reports missing files only for features we haven't authored content for yet (expected). Sample content passes validation.

- [ ] **Step 3: Run full build**

Run: `npm run build`
Expected: Build succeeds. Static pages generated.

- [ ] **Step 4: Preview and smoke test**

Run: `npm run preview`
Manual checks:
1. Landing page loads, language picker works
2. Selecting Python → JavaScript redirects to first feature
3. Comparison view shows side-by-side on wide viewport
4. Comparison view shows tabs on narrow viewport
5. "Mark as complete" button works and persists on reload
6. Previous/Next navigation works
7. Dashboard shows feature grid with progress
8. AI chat button opens panel, shows API key prompt
9. Breadcrumb links work

- [ ] **Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final integration fixes and polish"
```
