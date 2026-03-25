---
title: "Return Values"
language: "javascript"
feature: "return-values"
category: "functions"
applicable: true
---

JavaScript functions return a single value via the `return` statement. Multiple values are commonly returned as an object or array, which can be immediately destructured by the caller. Async functions always return a `Promise`, and generator functions return an iterator.

## Example

```javascript
// Single return value
function absolute(n) {
  return Math.abs(n);
}

// Return an object — destructure at the call site
function minMax(arr) {
  return { min: Math.min(...arr), max: Math.max(...arr) };
}
const { min, max } = minMax([3, 1, 4, 1, 5]);

// Return an array — positional destructuring
function swap(a, b) {
  return [b, a];
}
const [x, y] = swap(1, 2);  // x=2, y=1

// Implicit undefined return
function logOnly(msg) {
  console.log(msg);
  // no return → returns undefined
}

// Async function returns a Promise
async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();  // the resolved value of the returned Promise
}
```

## Gotchas

- A function with no `return` statement (or bare `return;`) returns `undefined`
- Automatic Semicolon Insertion (ASI) can break multi-line returns: `return` followed by a newline and an object literal inserts a semicolon, returning `undefined` instead; wrap in parentheses: `return (\n  { ... }\n)`
- Arrow functions with a concise body return the expression implicitly; wrap object literals in parentheses: `const fn = () => ({ key: val })`
