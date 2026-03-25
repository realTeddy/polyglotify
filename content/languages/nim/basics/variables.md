---
title: "Variables & Declaration"
language: "nim"
feature: "variables"
category: "basics"
applicable: true
---

Nim has three variable declaration keywords: `let` (immutable binding, assigned once), `var` (mutable), and `const` (compile-time constant). Type is inferred from the initializer or can be stated explicitly. Identifiers use `camelCase` by convention and are case-insensitive with underscores ignored (`myVar`, `my_var`, and `myvar` are the same identifier). Nim is statically typed.

## Example

```nim
# let — immutable (like Rust's let)
let name = "Alice"
let age: int = 30

# var — mutable
var counter = 0
counter += 1

# const — compile-time constant
const MaxSize = 1024
const Pi = 3.14159

# Type is inferred
let x = 42          # int
let y = 3.14        # float
let flag = true     # bool

# Multiple declaration
var a, b, c: int
a = 1; b = 2; c = 3

# Tuple unpacking
let (first, second) = (10, "hello")

echo name, " is ", age
echo "counter=", counter
```

## Gotchas

- `let` is not the same as `const`: `let` bindings are runtime values that cannot be reassigned; `const` is evaluated at compile time.
- Nim's identifier equality ignores case and underscores after the first character: `myVar` and `my_var` are the same.
- Declaring a `var` without an initializer gives it the zero value for its type (0, "", false, nil).
