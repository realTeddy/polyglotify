---
title: "Operators"
language: "fsharp"
feature: "operators"
category: "basics"
applicable: true
---

F# provides standard arithmetic and comparison operators, plus function composition (`>>`, `<<`) and pipeline (`|>`, `<|`) operators. Operators can be defined and overloaded. Integer and float operators are distinct (`/` vs `/`; types matter).

## Example

```fsharp
// Arithmetic
let a = 10 + 3    // 13
let b = 10 - 3    // 7
let c = 10 * 3    // 30
let d = 10 / 3    // 3  (integer division, truncates)
let e = 10 % 3    // 1
let f = 10.0 / 3.0  // 3.333...
let g = 2.0 ** 10.0  // 1024.0 (power, floats only)
let h = pown 2 10    // 1024   (integer power)

// Comparison
1 = 1         // true   (structural equality)
1 <> 2        // true   (not equal)
1 < 2         // true
1 >= 1        // true

// Boolean
true && false   // false
true || false   // true
not true        // false

// String concatenation
"Hello" + ", " + "World!"

// Pipeline (forward pipe)
[1..10]
|> List.filter (fun x -> x % 2 = 0)
|> List.map (fun x -> x * x)
|> List.sum
// 220

// Function composition
let addOneThenDouble = (+) 1 >> (*) 2
addOneThenDouble 3   // (3+1)*2 = 8

// Custom operator
let (>>=) opt f = Option.bind f opt
Some 5 >>= (fun x -> if x > 0 then Some (x * 2) else None)
// Some 10
```

## Gotchas

- Integer `/` truncates; use `float x / float y` for true division
- `=` is structural equality (like `==` in most languages); reference equality is `obj.ReferenceEquals`
- `|>` passes the left-hand value as the **last** argument to the function on the right; `<|` goes the other way
