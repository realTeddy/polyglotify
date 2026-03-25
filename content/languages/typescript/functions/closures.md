---
title: "Closures"
language: "typescript"
feature: "closures"
category: "functions"
applicable: true
---

A closure is a function that captures variables from its enclosing lexical scope. In TypeScript, closures are fundamental — every function defined inside another function automatically closes over the outer variables. TypeScript infers the types of captured variables, so closures are fully type-safe without extra annotations.

## Example

```typescript
// Simple counter closure
function makeCounter(initial: number = 0) {
  let count = initial;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}

const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.decrement(); // 11
console.log(counter.value()); // 11

// Closure for partial application
function multiply(factor: number) {
  return (value: number): number => value * factor;
}

const double = multiply(2);
const triple = multiply(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15

// Memoization using closure
function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  const cache = new Map<T, R>();
  return (arg: T): R => {
    if (!cache.has(arg)) cache.set(arg, fn(arg));
    return cache.get(arg)!;
  };
}

const expensiveCalc = memoize((n: number) => n * n);
```

## Gotchas

- Classic `var`-in-loop closure bug: `var` is function-scoped, so all closures share the same variable. Use `let` or `const` in loops to give each iteration its own binding.
