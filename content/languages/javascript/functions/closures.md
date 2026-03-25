---
title: "Closures & Lambdas"
language: "javascript"
feature: "closures"
category: "functions"
applicable: true
---

A closure is a function that retains access to variables from the scope in which it was defined, even after that outer scope has finished executing. In JavaScript every function forms a closure over its enclosing scope. Arrow functions serve as lightweight lambdas and are especially common in higher-order functions like `map`, `filter`, and `reduce`.

## Example

```javascript
// Closure over a private counter
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}
const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.value();     // 12

// Partial application via closure
function multiply(factor) {
  return (n) => n * factor;
}
const triple = multiply(3);
triple(7);  // 21

// Lambdas in higher-order functions
const numbers = [1, 2, 3, 4, 5];
const evens  = numbers.filter((n) => n % 2 === 0);  // [2, 4]
const doubled = numbers.map((n) => n * 2);           // [2, 4, 6, 8, 10]
const total  = numbers.reduce((acc, n) => acc + n, 0); // 15
```

## Gotchas

- Classic `var`-in-loop bug: a closure over a `var` loop variable captures the variable itself, not its value at iteration time; use `let` or wrap in an IIFE to capture the current value
- Closures keep their enclosing scope alive, which can cause memory leaks if long-lived closures hold references to large objects
- Each call to a factory function (like `makeCounter`) creates a fresh closure — the enclosed variables are not shared between instances
