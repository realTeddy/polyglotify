---
title: "Operators"
language: "vlang"
feature: "operators"
category: "basics"
applicable: true
---

V operators are similar to C and Go. Arithmetic, comparison, and logical operators are standard. V does not allow implicit type conversions in expressions — mixed-type arithmetic requires explicit casts. There is no operator overloading. The `or` keyword is used to handle optionals and results (unwrap or provide a fallback).

## Example

```v
fn main() {
    // Arithmetic
    println(10 + 3)   // 13
    println(10 - 3)   // 7
    println(10 * 3)   // 30
    println(10 / 3)   // 3  (integer division)
    println(10 % 3)   // 1
    println(2 << 4)   // 32 (left shift)

    // No implicit conversion — must cast explicitly
    a := 5
    b := f64(a) * 2.5  // explicit cast required

    // Comparison
    println(1 < 2)   // true
    println(1 == 1)  // true
    println(1 != 2)  // true

    // Logical
    println(true && false)  // false
    println(true || false)  // true
    println(!true)          // false

    // Bitwise
    println(0b1010 & 0b1100)  // 8
    println(0b1010 | 0b1100)  // 14
    println(0b1010 ^ 0b1100)  // 6

    // or — optional/result unwrap with fallback
    val := some_optional_fn() or { -1 }
}

fn some_optional_fn() ?int {
    return none
}
```

## Gotchas

- Integer division truncates toward zero; there is no separate `//` operator as in Python.
- V prohibits mixed-type arithmetic without explicit casts — `int + f64` is a compile error.
- `or { }` is not a normal else; it is only valid after an optional/result expression.
