---
title: "Maps"
language: "typescript"
feature: "maps"
category: "data-structures"
applicable: true
---

TypeScript provides the built-in `Map<K, V>` generic class for key-value storage with any type as the key. Unlike plain objects, `Map` maintains insertion order, accepts non-string keys, and never has prototype pollution issues. For string-keyed records, typed object literals or `Record<K, V>` are common alternatives.

## Example

```typescript
// Map<K, V>
const scores = new Map<string, number>();
scores.set("Alice", 95);
scores.set("Bob", 87);
scores.set("Carol", 91);

console.log(scores.get("Alice")); // 95
console.log(scores.has("Dave"));  // false
console.log(scores.size);         // 3

// Iterate
for (const [name, score] of scores) {
  console.log(`${name}: ${score}`);
}

// From entries
const config = new Map<string, string>([
  ["host", "localhost"],
  ["port", "8080"],
]);

// Record<K, V> — plain object with typed keys
const lookup: Record<string, number> = { a: 1, b: 2 };

// WeakMap for object keys without preventing GC
const metadata = new WeakMap<object, { created: Date }>();
const key = {};
metadata.set(key, { created: new Date() });

// Convert Map to/from object
const obj = Object.fromEntries(scores);
const restored = new Map(Object.entries(obj));
```

## Gotchas

- `Map` lookups return `V | undefined`; use `has()` before `get()` or use the non-null assertion only when you are certain the key exists.
- Plain objects have prototype properties (`constructor`, `toString`, etc.) that can collide with user-defined keys; `Map` avoids this entirely.
