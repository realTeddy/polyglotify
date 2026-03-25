---
title: "Control Flow"
language: "javascript"
feature: "control-flow"
category: "basics"
applicable: true
---

JavaScript supports the standard set of control-flow constructs: `if/else`, `switch`, `for`, `while`, and `do/while`. Modern additions include `for...of` for iterables and `for...in` for object keys. Labeled breaks and continues allow escaping nested loops.

## Example

```javascript
// if / else if / else
const score = 72;
if (score >= 90) {
  console.log("A");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}

// switch (uses strict equality internally)
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  default:
    console.log("Weekday");
}

// for...of — iterate values of any iterable
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

// for...in — iterate own enumerable keys of an object
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}

// while
let i = 0;
while (i < 3) {
  console.log(i++);
}
```

## Gotchas

- `switch` uses `===` for case matching, so `switch ("1") { case 1: }` does not match
- Forgetting `break` in a `switch` causes fall-through to the next case — often a bug
- `for...in` also iterates inherited enumerable properties; guard with `Object.hasOwn(obj, key)` when needed
- `for...of` does not work on plain objects (they are not iterable); use `Object.entries()` to iterate key-value pairs
