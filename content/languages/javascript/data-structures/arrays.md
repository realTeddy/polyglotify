---
title: "Arrays & Lists"
language: "javascript"
feature: "arrays"
category: "data-structures"
applicable: true
---

JavaScript arrays are ordered, zero-indexed, dynamically sized collections that can hold values of any type. They are objects under the hood and ship with a rich built-in API covering iteration, transformation, searching, and mutation. The spread operator and destructuring make working with arrays concise.

## Example

```javascript
// Creation
const empty = [];
const fruits = ["apple", "banana", "cherry"];
const matrix = Array.from({ length: 3 }, () => new Array(3).fill(0));

// Access and mutation
fruits[0];            // "apple"
fruits.push("date");  // add to end → ["apple","banana","cherry","date"]
fruits.pop();         // remove from end → "date"
fruits.unshift("avocado"); // add to front
fruits.shift();            // remove from front

// Transformation (returns a new array)
const upper = fruits.map((f) => f.toUpperCase());
const long  = fruits.filter((f) => f.length > 5);
const total = [1, 2, 3].reduce((sum, n) => sum + n, 0); // 6

// Searching
fruits.includes("banana");      // true
fruits.indexOf("cherry");       // 2
fruits.find((f) => f.startsWith("b")); // "banana"

// Spread and destructuring
const combined = [...fruits, "elderberry"];
const [first, second, ...rest] = fruits;
```

## Gotchas

- Arrays are objects: `typeof []` returns `"object"`; use `Array.isArray()` to test
- Accessing an out-of-bounds index returns `undefined` rather than throwing
- `sort()` converts elements to strings by default — `[10, 9, 2].sort()` gives `[10, 2, 9]`; always pass a comparator for numbers: `.sort((a, b) => a - b)`
- `splice()` mutates the original array in place, while `slice()` returns a new array
