---
title: "Operators"
language: "typescript"
feature: "operators"
category: "basics"
applicable: true
---

TypeScript inherits all JavaScript operators and adds type-level operators such as `typeof`, `keyof`, `in`, and `as` (type assertion). Arithmetic, comparison, logical, bitwise, and assignment operators behave identically to JavaScript. TypeScript's strict mode makes `===` the idiomatic equality check, avoiding the coercion-prone `==`.

## Example

```typescript
// Arithmetic
const sum = 10 + 3;   // 13
const mod = 10 % 3;   // 1
const pow = 2 ** 8;   // 256

// Strict equality (preferred)
console.log(1 === 1);   // true
console.log(1 === "1"); // false

// Logical with short-circuit
const user = null;
const name = user ?? "Guest";          // nullish coalescing
const upper = user?.toString() ?? "";  // optional chaining + nullish

// Type-level operators
type Keys = keyof { a: number; b: string }; // "a" | "b"

function getType(x: unknown) {
  if (typeof x === "number") return x * 2;
  return 0;
}

// Bitwise (common for flags)
const READ = 1 << 0;  // 1
const WRITE = 1 << 1; // 2
const perms = READ | WRITE; // 3
const canRead = (perms & READ) !== 0; // true
```

## Gotchas

- `==` performs type coercion (`0 == false` is `true`); always use `===` unless you explicitly need coercion.
- The nullish coalescing operator `??` only short-circuits on `null`/`undefined`, unlike `||` which short-circuits on any falsy value.
