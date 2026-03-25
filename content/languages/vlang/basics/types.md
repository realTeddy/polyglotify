---
title: "Types & Type Systems"
language: "vlang"
feature: "types"
category: "basics"
applicable: true
---

V is statically typed with type inference. Primitive types include `bool`, `string`, integer types (`i8`–`i64`, `u8`–`u64`, `int`=`i32`), and floating-point types (`f32`, `f64`). Sum types (tagged unions) are declared with `type A = B | C`. Optionals (`?T`) represent values that may be absent. V has no `null` — use `none` for the absent case of an optional.

## Example

```v
fn main() {
    // Integers
    a := 42       // int (i32)
    b := i64(100)
    c := u8(255)

    // Floats
    pi := 3.14159 // f64 by default
    x  := f32(1.5)

    // Bool
    flag := true

    // Strings (immutable, UTF-8)
    s := 'hello'
    t := "world"  // both quotes work

    // Type checking
    println(typeof(a))  // int

    // Sum type
    type NumberOrString = int | string
    mut val := NumberOrString(42)
    val = 'now a string'

    // Optional
    mut maybe := ?int(none)
    maybe = ?int(10)
    if v := maybe {
        println('value: $v')
    }
}
```

## Gotchas

- `int` is always 32 bits in V regardless of platform (unlike C's `int`).
- Strings in V are immutable; use `strings.Builder` for efficient construction.
- Sum types require exhaustive `match` — the compiler enforces all variants are handled.
