---
title: "Arrays"
language: "typescript"
feature: "arrays"
category: "data-structures"
applicable: true
---

TypeScript arrays are dynamically-sized, ordered collections typed as `T[]` or `Array<T>`. They support all standard JavaScript array methods (`map`, `filter`, `reduce`, `find`, etc.) with full type inference. The `readonly` modifier or `ReadonlyArray<T>` prevents mutation. Tuple types provide fixed-length arrays with per-index types.

## Example

```typescript
// Typed array
const scores: number[] = [90, 85, 92, 78];

// Common operations
const doubled = scores.map((s) => s * 2);           // number[]
const passing = scores.filter((s) => s >= 80);       // number[]
const total = scores.reduce((acc, s) => acc + s, 0); // number

// Spread and rest
const more = [...scores, 100, 95];
const [first, second, ...remaining] = scores;

// Readonly array
function sum(nums: readonly number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

// Tuple
const point: [number, number] = [3, 4];
const [x, y] = point;

// Named tuple (TS 4.0+)
type Range = [start: number, end: number];
const r: Range = [0, 100];

// Array of objects
interface User { id: number; name: string }
const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
const alice = users.find((u) => u.name === "Alice");
```

## Gotchas

- `Array.prototype.sort()` sorts in-place and mutates the original array; it also defaults to lexicographic order, so `[10, 9, 2].sort()` gives `[10, 2, 9]` — always provide a comparator for numbers.
