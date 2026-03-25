---
title: "Tuples"
language: "typescript"
feature: "tuples"
category: "data-structures"
applicable: true
---

TypeScript tuples are fixed-length arrays where each index has a specific type. They are declared with bracket notation and support optional elements, rest elements, and labels (TypeScript 4.0+). Tuples are widely used for multiple return values, destructured patterns, and typed variadic generic utilities.

## Example

```typescript
// Basic tuple
const point: [number, number] = [10, 20];
const [x, y] = point;

// Labeled tuple (improves readability in IDE hints)
type HttpResponse = [status: number, body: string, headers?: Record<string, string>];
const res: HttpResponse = [200, '{"ok":true}'];

// Optional element
type MaybeString = [string, number?];
const a: MaybeString = ["hello"];
const b: MaybeString = ["hello", 42];

// Rest element
type StringThenNumbers = [string, ...number[]];
const c: StringThenNumbers = ["label", 1, 2, 3];

// Tuple as multiple return values
function divmod(a: number, b: number): [quotient: number, remainder: number] {
  return [Math.floor(a / b), a % b];
}
const [q, r] = divmod(17, 5); // q=3, r=2

// Readonly tuple
const immutable: readonly [number, string] = [1, "one"];
// immutable[0] = 2; // Error
```

## Gotchas

- At runtime, tuples are plain JavaScript arrays — there is no length or type enforcement at runtime, only at compile time.
- TypeScript can widen a tuple literal to `number[]` without a type annotation; annotate explicitly or use `as const` when you need the tuple type preserved.
