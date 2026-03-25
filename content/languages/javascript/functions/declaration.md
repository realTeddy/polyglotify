---
title: "Function Declaration"
language: "javascript"
feature: "declaration"
category: "functions"
applicable: true
---

JavaScript functions can be written as declarations, expressions, or arrow functions. Function declarations are hoisted to the top of their scope, allowing them to be called before they appear in source order. Arrow functions have a shorter syntax and do not bind their own `this`, making them ideal for callbacks and methods that need to capture the surrounding context.

## Example

```javascript
// Function declaration (hoisted)
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression (not hoisted)
const square = function (n) {
  return n * n;
};

// Arrow function (concise, no own `this`)
const double = (n) => n * 2;

// Arrow function with body
const clamp = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

// Immediately Invoked Function Expression (IIFE)
const result = (() => {
  const x = 10;
  return x * x;
})();
```

## Gotchas

- Only `function` declarations are hoisted; `const fn = function(){}` and arrow functions are not
- Arrow functions cannot be used as constructors (`new arrowFn()` throws a TypeError)
- Regular functions have their own `this` bound at call time; arrow functions inherit `this` from the enclosing lexical scope
- The `arguments` object is not available inside arrow functions
