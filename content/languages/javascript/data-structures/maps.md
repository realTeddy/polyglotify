---
title: "Maps & Dictionaries"
language: "javascript"
feature: "maps"
category: "data-structures"
applicable: true
---

JavaScript offers two ways to associate keys with values: plain objects (`{}`) and the `Map` class. `Map` preserves insertion order, accepts any value as a key (including objects and functions), and provides an explicit size property. Plain objects are still the idiomatic choice for static records and JSON data, while `Map` is better when keys are dynamic or non-string.

## Example

```javascript
// Plain object as a dictionary
const scores = { alice: 95, bob: 87, carol: 91 };
scores["dave"] = 78;
delete scores.bob;
"alice" in scores;          // true
Object.keys(scores);        // ["alice", "carol", "dave"]
Object.entries(scores);     // [["alice",95],["carol",91],["dave",78]]

// Map
const map = new Map();
map.set("alice", 95);
map.set({ id: 1 }, "object key");  // any value as key

map.get("alice");   // 95
map.has("alice");   // true
map.size;           // 2
map.delete("alice");

// Iterating a Map
for (const [key, value] of map) {
  console.log(key, value);
}

// Convert between Map and array of pairs
const fromEntries = new Map([["a", 1], ["b", 2]]);
const asArray = [...fromEntries]; // [["a",1],["b",2]]
```

## Gotchas

- Plain object keys are always coerced to strings; `obj[1]` and `obj["1"]` access the same property
- `Map` preserves insertion order; plain object key order is mostly stable in modern engines but was never guaranteed by the spec for all cases
- A plain object's prototype chain can shadow expected keys (e.g., `"toString"` already exists); use `Object.create(null)` for a truly keyless dictionary
- `JSON.stringify` does not serialize `Map`; convert with `Object.fromEntries(map)` first
