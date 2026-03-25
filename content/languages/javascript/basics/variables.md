---
title: "Variables & Declaration"
language: "javascript"
feature: "variables"
category: "basics"
applicable: true
---

JavaScript has three ways to declare variables: `const`, `let`, and `var`. Modern JavaScript favors `const` by default and `let` when reassignment is needed. Variable names use `camelCase` by convention.

## Example

```javascript
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
```

## Gotchas

- `const` prevents reassignment but not mutation: `const arr = [1]; arr.push(2)` is valid
- `var` is function-scoped, not block-scoped — can cause surprising behavior in loops
- Undeclared variables become global properties (in non-strict mode)
