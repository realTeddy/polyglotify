---
title: "Operators"
language: "javascript"
feature: "operators"
category: "basics"
applicable: true
---

JavaScript provides arithmetic, comparison, logical, bitwise, and assignment operators. The language is notable for having both strict equality (`===`) and loose equality (`==`), where the loose form triggers type coercion. The nullish coalescing (`??`) and optional chaining (`?.`) operators are modern additions that handle `null`/`undefined` safely.

## Example

```javascript
// Arithmetic
const sum = 10 + 3;   // 13
const rem = 10 % 3;   // 1
const exp = 2 ** 10;  // 1024

// Strict vs loose equality
1 === 1      // true
1 === "1"    // false
1 == "1"     // true (coercion — avoid)

// Logical operators (short-circuit)
const a = null ?? "default";   // "default" (nullish coalescing)
const b = 0 || "fallback";     // "fallback" (|| treats 0 as falsy)
const c = 0 ?? "fallback";     // 0 (only null/undefined trigger ??)

// Optional chaining
const city = user?.address?.city;  // undefined instead of TypeError

// Logical assignment
x ||= 10;   // assign 10 if x is falsy
x ??= 10;   // assign 10 if x is null/undefined
x &&= 10;   // assign 10 only if x is truthy
```

## Gotchas

- Always prefer `===` over `==`; the coercion rules for `==` are complex and surprising
- `+` is overloaded: `"3" + 1` gives `"31"`, not `4`; use `Number()` or the unary `+` to convert first
- `NaN === NaN` is `false`; use `Number.isNaN()` to test for NaN
- Bitwise operators convert their operands to signed 32-bit integers, truncating large values and decimals
