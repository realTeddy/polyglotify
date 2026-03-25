---
title: "Style Conventions"
language: "javascript"
feature: "style-conventions"
category: "idioms"
applicable: true
---

The JavaScript community has converged on a set of widely followed style conventions: `camelCase` for variables and functions, `PascalCase` for classes and constructors, `UPPER_SNAKE_CASE` for true constants, and 2-space indentation. ESLint enforces rules and Prettier handles formatting; the Airbnb and Standard style guides are the most cited references.

## Example

```javascript
// Naming conventions
const maxRetries = 3;                   // camelCase for variables
const MAX_RETRIES = 3;                  // UPPER_SNAKE_CASE for module-level constants
function calculateTotal(items) {}       // camelCase for functions
class ShoppingCart {}                   // PascalCase for classes
const API_BASE_URL = "https://...";     // UPPER_SNAKE_CASE for env-style constants

// Prefer const, then let — never var
const pi = 3.14159;
let count = 0;

// Arrow functions for callbacks; named functions for methods and top-level helpers
const doubled = [1, 2, 3].map((n) => n * 2);
function parseResponse(raw) { /* ... */ }

// Strict equality always
if (value === null) {}

// Template literals over concatenation
const greeting = `Hello, ${name}!`;

// Short-circuit for simple conditionals
const display = isLoggedIn && <UserMenu />;

// Trailing commas (prettier default — cleaner diffs)
const obj = {
  a: 1,
  b: 2,
};

// Semicolons — both "always" and "never" are common; be consistent within a project
```

## Gotchas

- JavaScript has no single official style guide; teams choose between Airbnb, Standard, Google, or their own — establish one early and enforce it with ESLint
- Prettier deliberately limits configuration to prevent style debates; let it own formatting and use ESLint only for logic rules
- Automatic Semicolon Insertion (ASI) means semicolons are technically optional, but omitting them can cause subtle bugs at line boundaries starting with `(`, `[`, or `` ` ``
- File and folder names vary by project: React projects commonly use `PascalCase.jsx` for components and `camelCase.js` for utilities
