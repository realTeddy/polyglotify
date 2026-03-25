---
title: "Tuples"
language: "vlang"
feature: "tuples"
category: "data-structures"
applicable: false
---

V does not have a dedicated tuple type. Multiple return values from functions use a parenthesized list of types `(T1, T2)` in the signature, but this is syntactic sugar for multiple returns, not a first-class tuple value. Structs or arrays are used when a "tuple-like" container is needed.

## Example

```v
// Multiple return values (closest thing to tuples)
fn divmod(a int, b int) (int, int) {
    return a / b, a % b
}

fn main() {
    // Destructuring multiple returns
    q, r := divmod(17, 5)
    println('$q remainder $r')  // 3 remainder 2

    // Struct as named tuple
    struct Point {
        x f64
        y f64
    }
    p := Point{x: 3.0, y: 4.0}
    println('${p.x}, ${p.y}')  // 3.0, 4.0

    // Array as homogeneous tuple
    rgb := [255, 128, 0]
    println(rgb[0])  // 255
}
```

## Gotchas

- V's multi-return syntax only works in function return positions; you cannot create a tuple value in general code.
- There is no structural tuple type like Rust's `(i32, &str)`; use a struct for clarity.
- Destructuring assignment requires exactly the right number of variables on the left side to match the number of return values.
