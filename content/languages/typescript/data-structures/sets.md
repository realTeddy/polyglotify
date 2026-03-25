---
title: "Sets"
language: "typescript"
feature: "sets"
category: "data-structures"
applicable: true
---

TypeScript's `Set<T>` is a collection of unique values that maintains insertion order. It provides O(1) average-time `has`, `add`, and `delete` operations. Sets are useful for deduplication, membership testing, and implementing classic set operations (union, intersection, difference) via spread and filtering.

## Example

```typescript
// Basic usage
const tags = new Set<string>(["ts", "node", "web"]);
tags.add("ts");       // duplicate — no effect
tags.add("react");
console.log(tags.size);       // 4
console.log(tags.has("node")); // true

// Deduplication
const nums = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(nums)]; // [1, 2, 3]

// Iteration
for (const tag of tags) {
  console.log(tag);
}

// Set operations
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

const union        = new Set([...a, ...b]);           // {1,2,3,4,5,6}
const intersection = new Set([...a].filter(x => b.has(x))); // {3,4}
const difference   = new Set([...a].filter(x => !b.has(x))); // {1,2}

// WeakSet — object-only, no iteration
const seen = new WeakSet<object>();
const obj = {};
seen.add(obj);
console.log(seen.has(obj)); // true
```

## Gotchas

- `Set` uses the SameValueZero algorithm for equality: `NaN` equals `NaN` (unlike `===`), and `+0` equals `-0`.
- `Set` has no built-in `union` or `intersection` methods in older runtimes; the spread-filter pattern is the standard workaround (native set methods landed in ES2025).
