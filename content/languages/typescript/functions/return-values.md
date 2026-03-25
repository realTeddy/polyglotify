---
title: "Return Values"
language: "typescript"
feature: "return-values"
category: "functions"
applicable: true
---

TypeScript infers return types from the function body, but annotating them explicitly is good practice for public APIs — it serves as documentation and catches accidental type widening. Functions that never return (throw or loop forever) use the `never` return type. Functions returning nothing use `void`, while `undefined` is for functions that explicitly return `undefined`.

## Example

```typescript
// Explicit return type annotation
function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

// Returning a union type
function findUser(id: number): { name: string } | null {
  const users = [{ id: 1, name: "Alice" }];
  return users.find((u) => u.id === id) ?? null;
}

// void vs undefined
function logMessage(msg: string): void {
  console.log(msg);
  // no return statement needed
}

// never — function that always throws
function fail(message: string): never {
  throw new Error(message);
}

// Returning a tuple
function minMax(nums: number[]): [number, number] {
  return [Math.min(...nums), Math.max(...nums)];
}

const [lo, hi] = minMax([3, 1, 4, 1, 5, 9]);
```

## Gotchas

- A function annotated as returning `void` can still return a value — TypeScript ignores it. This allows callbacks typed as `() => void` to be satisfied by functions that happen to return a value.
- `never` is assignable to every type but no type is assignable to `never`, making it useful for exhaustiveness guards.
