---
title: "Control Flow"
language: "typescript"
feature: "control-flow"
category: "basics"
applicable: true
---

TypeScript supports the full JavaScript control-flow toolkit — `if/else`, `switch`, `for`, `for...of`, `for...in`, `while`, and `do...while` — and enhances them with narrowing: the compiler tracks which types are possible inside each branch. Exhaustiveness checking in `switch` statements is a key TypeScript pattern for discriminated unions.

## Example

```typescript
type Shape = { kind: "circle"; radius: number } | { kind: "rect"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
    default:
      // Exhaustiveness check: if Shape gains a new variant this line fails to compile
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}

// for...of iterates values
const items = [10, 20, 30];
for (const item of items) {
  console.log(item);
}

// for...in iterates keys (use sparingly on objects)
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key, obj[key as keyof typeof obj]);
}

// while with break
let n = 0;
while (true) {
  if (n++ >= 5) break;
}
```

## Gotchas

- `for...in` iterates over all enumerable string keys including inherited ones; use `Object.keys()` or `for...of` on `Object.entries()` for own properties only.
- Without `strict` mode, TypeScript's narrowing is less powerful; enable `"strict": true` in `tsconfig.json`.
