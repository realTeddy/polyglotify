---
title: "Types & Type Systems"
language: "javascript"
feature: "types"
category: "basics"
applicable: true
---

JavaScript is dynamically typed with automatic type coercion. It has 7 primitive types and objects. TypeScript (a superset of JavaScript) adds static typing.

## Example

```javascript
// Primitive types
const text = "hello";       // string
const number = 42;          // number
const decimal = 3.14;       // number (no separate float)
const flag = true;          // boolean
const empty = null;         // null
const missing = undefined;  // undefined
const id = Symbol("id");    // symbol
const big = 9007199254740991n; // bigint

// typeof operator
typeof "hello"  // "string"
typeof 42       // "number"
typeof true     // "boolean"

// Type coercion (implicit conversion)
"5" + 3    // "53" (string concatenation)
"5" - 3    // 2 (numeric subtraction)
```

## Gotchas

- `typeof null` returns `"object"` — a famous JavaScript bug from 1995
- `NaN` (Not a Number) is of type `number`
- Loose equality (`==`) coerces types: `"0" == false` is `true`; always use `===`
- JavaScript has no integer type — all numbers are 64-bit floats
