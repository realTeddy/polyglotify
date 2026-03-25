---
title: "Variables & Declaration"
language: "mojo"
feature: "variables"
category: "basics"
applicable: true
---

Mojo uses `var` for mutable variables and `alias` for compile-time constants. Variables are statically typed with type inference. Mojo also supports Python-compatible untyped variables at module scope (for interop). Ownership and lifetimes are tracked for `struct` types, similar to Rust. Immutable bindings use `let` (in older Mojo) — in current Mojo, `var` is the primary declaration keyword and variables are mutable.

## Example

```mojo
fn main():
    # var — mutable, type-inferred
    var x = 42
    var name = String("Alice")
    var flag = True

    # Explicit type annotation
    var score: Float64 = 3.14

    # Mutation
    x += 1

    # alias — compile-time constant
    alias MAX_SIZE = 1024
    alias PI = 3.14159265358979

    # Multiple assignment
    var a = 1
    var b = 2
    a, b = b, a   # swap

    # Underscore to discard
    var _ = some_side_effect()

    print(x, name, flag, score)

fn some_side_effect() -> Int:
    return 0
```

## Gotchas

- Mojo is rapidly evolving; the `let` keyword for immutable bindings was removed in favor of `var` in recent versions — check the current Mojo changelog.
- `alias` is strictly a compile-time constant; its value must be known at compile time.
- Mojo variables of `struct` types follow ownership rules — they are moved or copied depending on whether the type conforms to `Copyable`.
