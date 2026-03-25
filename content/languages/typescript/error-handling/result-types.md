---
title: "Result Types"
language: "typescript"
feature: "result-types"
category: "error-handling"
applicable: true
---

TypeScript has no built-in `Result` type, but the pattern is easy to implement with discriminated unions. Returning `{ ok: true; value: T } | { ok: false; error: E }` instead of throwing makes error paths explicit in function signatures. Libraries such as `neverthrow` and `fp-ts` provide polished implementations, but the hand-rolled pattern is common and zero-dependency.

## Example

```typescript
// Discriminated union Result type
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Usage
function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return err("Division by zero");
  return ok(a / b);
}

const result = divide(10, 2);
if (result.ok) {
  console.log("Value:", result.value); // 5
} else {
  console.error("Error:", result.error);
}

// Chaining results
function sqrt(n: number): Result<number, string> {
  if (n < 0) return err("Cannot take sqrt of negative number");
  return ok(Math.sqrt(n));
}

function pipeline(a: number, b: number): Result<number, string> {
  const divided = divide(a, b);
  if (!divided.ok) return divided;
  return sqrt(divided.value);
}

const final = pipeline(16, 4);
// final.ok === true, final.value === 2
```

## Gotchas

- This pattern adds verbosity compared to throwing; use it selectively for expected, recoverable errors (validation, parsing) and continue throwing for truly unexpected conditions.
- Without a chainable API (like `map`/`flatMap`), deep pipelines become nested `if (!result.ok)` ladders. Consider a small helper or a library if the pattern is used extensively.
