---
title: "Function Declaration"
language: "julia"
feature: "declaration"
category: "functions"
applicable: true
---

Julia functions are defined with the `function ... end` syntax or the compact single-expression form `f(x) = expr`. Julia uses **multiple dispatch** — the most specific method matching the argument types is called. You add methods to a function by defining it multiple times with different type signatures. Functions ending with `!` mutate their arguments by convention.

## Example

```julia
# Standard form
function greet(name::String)
    println("Hello, ", name)
end

# Compact form
square(x) = x^2
cube(x::Float64) = x^3

# Multiple dispatch — different methods for different types
area(r::Float64)          = π * r^2              # circle
area(w::Float64, h::Float64) = w * h             # rectangle

# Mutating function (convention: name ends with !)
function fill_zeros!(v::Vector{Float64})
    for i in eachindex(v)
        v[i] = 0.0
    end
end

# Usage
greet("Alice")
println(square(4))
println(area(3.0))
println(area(4.0, 5.0))

v = [1.0, 2.0, 3.0]
fill_zeros!(v)
println(v)  # [0.0, 0.0, 0.0]
```

## Gotchas

- Without type annotations, a method is defined for `Any` — Julia still specializes at runtime via JIT.
- Multiple dispatch chooses the most specific matching method; ambiguities produce a runtime error.
- The `!` suffix is purely a naming convention; the language does not enforce mutating behavior.
