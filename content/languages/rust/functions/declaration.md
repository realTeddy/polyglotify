---
title: "Function Declaration"
language: "rust"
feature: "declaration"
category: "functions"
applicable: true
---

Functions are declared with the `fn` keyword. Parameter types and return types are mandatory annotations. The last expression in a function body is implicitly returned (no `return` keyword needed, and no trailing semicolon on the final expression). Functions that return nothing have an implicit return type of `()` (unit).

## Example

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b  // no semicolon — this is the return expression
}

fn greet(name: &str) {
    println!("Hello, {name}!"); // returns ()
}

fn apply<F: Fn(i32) -> i32>(f: F, x: i32) -> i32 {
    f(x)
}

fn main() {
    println!("{}", add(3, 4));
    greet("Rust");
    println!("{}", apply(|x| x * x, 5));
}
```

## Gotchas

- Adding a semicolon to the last expression changes it from a return value to a statement, making the function return `()` — this causes a type mismatch compile error if a non-unit return type is declared.
- Rust has no function overloading; use generics or different function names.
- Generic bounds on functions use the `where` clause for readability when there are multiple constraints.
