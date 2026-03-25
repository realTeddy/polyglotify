---
title: "Parameters & Arguments"
language: "javascript"
feature: "parameters"
category: "functions"
applicable: true
---

JavaScript functions accept any number of arguments regardless of how many parameters are declared — extra arguments are silently ignored and missing ones become `undefined`. Default parameter values, rest parameters (`...args`), and destructured parameters cover most practical patterns without overloading.

## Example

```javascript
// Default parameters
function greet(name = "World") {
  return `Hello, ${name}!`;
}
greet();         // "Hello, World!"
greet("Alice");  // "Hello, Alice!"

// Rest parameters — collects remaining args into an array
function sum(first, ...rest) {
  return rest.reduce((acc, n) => acc + n, first);
}
sum(1, 2, 3, 4);  // 10

// Spread operator — expands an array into arguments
const nums = [1, 2, 3];
Math.max(...nums);  // 3

// Destructured parameters
function display({ name, age = 0 }) {
  console.log(`${name} is ${age}`);
}
display({ name: "Bob", age: 25 });

// Named simulation via an options object (common pattern)
function createUser({ name, role = "user", active = true } = {}) {
  return { name, role, active };
}
```

## Gotchas

- JavaScript has no function overloading; calling a function with fewer arguments than parameters gives `undefined` for the missing ones, not an error
- Default parameter expressions are evaluated at call time, not at definition time, so `function f(arr = [])` creates a fresh array each call
- Rest parameters must come last; `function f(...a, b)` is a syntax error
- `arguments` (available in regular functions only) is array-like but not a real array; prefer rest parameters in modern code
