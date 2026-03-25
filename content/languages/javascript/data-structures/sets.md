---
title: "Sets"
language: "javascript"
feature: "sets"
category: "data-structures"
applicable: true
---

JavaScript's `Set` stores unique values of any type in insertion order. It is the go-to structure for deduplication and membership testing. `WeakSet` holds weak references to objects, allowing garbage collection, but is not iterable and has no `size`.

## Example

```javascript
// Basic Set usage
const set = new Set([1, 2, 3, 2, 1]);
set.size;          // 3 — duplicates removed

set.add(4);
set.has(2);        // true
set.delete(2);
set.has(2);        // false

// Iteration
for (const value of set) {
  console.log(value);
}

// Deduplication of an array (common pattern)
const unique = [...new Set([1, 2, 2, 3, 3, 3])]; // [1, 2, 3]

// Set operations via spread + filter
const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5, 6]);

const union        = new Set([...a, ...b]);                          // {1,2,3,4,5,6}
const intersection = new Set([...a].filter((x) => b.has(x)));       // {3,4}
const difference   = new Set([...a].filter((x) => !b.has(x)));      // {1,2}
```

## Gotchas

- `Set` uses the SameValueZero algorithm for equality, so `NaN` is treated as equal to itself (unlike `===`)
- Objects are compared by reference, not by value: `new Set([{a:1},{a:1}]).size` is `2`
- `Set` has no built-in union/intersection/difference methods in most environments (though TC39 has a Stage 4 proposal adding them)
- Converting a `Set` back to an array requires `Array.from(set)` or spread `[...set]`
