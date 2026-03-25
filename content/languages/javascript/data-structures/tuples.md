---
title: "Tuples"
language: "javascript"
feature: "tuples"
category: "data-structures"
applicable: false
---

JavaScript does not have a built-in tuple type. Fixed-length, immutable ordered collections are typically represented with plain frozen arrays or objects. The TC39 "Record & Tuple" proposal (Stage 2 as of 2025) would introduce a native `#[1, 2, 3]` tuple primitive with value-based equality, but it is not yet part of the standard.

## Example

```javascript
// Common workaround: a frozen array
const point = Object.freeze([10, 20]);
// point[0] = 99; // silently fails (throws in strict mode)

// Destructuring still works
const [x, y] = point;

// Object as a named tuple
const rgb = Object.freeze({ r: 255, g: 128, b: 0 });

// TypeScript provides typed tuples
// const pair: [string, number] = ["Alice", 30];

// Future syntax (TC39 Record & Tuple proposal — not yet available)
// const t = #[1, 2, 3];
// #[1, 2, 3] === #[1, 2, 3];  // true (value equality)
```

## Gotchas

- `Object.freeze` is shallow: nested arrays or objects inside a frozen array remain mutable
- Two frozen arrays with the same contents are not `===` equal — JavaScript arrays use reference equality
- Without TypeScript, there is no way to enforce a fixed length or element types at compile time
- The TC39 proposal introduces `#[...]` tuple and `#{ }` record syntax; polyfills exist but the syntax is not natively supported yet
