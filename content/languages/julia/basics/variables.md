---
title: "Variables & Declaration"
language: "julia"
feature: "variables"
category: "basics"
applicable: true
---

Julia variables are dynamically typed by default but support optional type annotations. Variable names can use Unicode characters, including Greek letters commonly used in mathematics. There is no declaration keyword — assignment creates the variable. Constants are declared with `const`. Naming convention is `snake_case` for variables and functions, `CamelCase` for types.

## Example

```julia
# Simple assignment — no keyword needed
name = "Alice"
age  = 30
pi_approx = 3.14159

# Optional type annotation
x::Int = 42        # not a declaration, but a type assertion
y = 10::Int        # inline type assertion

# Unicode variable names
α = 0.5
∑ = sum([1, 2, 3])

# Constants
const MAX_SIZE = 1024
const GRAVITY = 9.81

# Multiple assignment
a, b, c = 1, 2, 3
a, b = b, a     # swap

println(name, " is ", age)
println("α = ", α, ", ∑ = ", ∑)
```

## Gotchas

- `const` prevents reassignment but does not make the *contents* of a mutable object immutable.
- Type annotations on variables (`::`  ) are assertions checked at runtime, not compile-time guarantees in the same sense as static languages.
- Global variables in Julia are slow because the compiler cannot infer types; use `const` or pass values as function arguments.
