---
title: "Return Values"
language: "julia"
feature: "return-values"
category: "functions"
applicable: true
---

Julia functions return the value of the last expression, or use an explicit `return` statement for early exit. Multiple values are returned as a tuple and can be destructured by the caller. Return type annotations use `::` after the parameter list. A function that returns nothing returns `nothing` (of type `Nothing`).

## Example

```julia
# Implicit return (last expression)
function double(x)
    x * 2
end

# Explicit return
function safe_divide(a, b)
    b == 0 && return nothing
    a / b
end

# Multiple return values (tuple)
function minmax(v::Vector)
    minimum(v), maximum(v)
end

# Return type annotation
function add(a::Int, b::Int)::Int
    a + b
end

# Destructuring the return
lo, hi = minmax([3, 1, 4, 1, 5, 9])
println("min=$lo, max=$hi")

result = safe_divide(10, 0)
println(result === nothing ? "division by zero" : result)

println(add(3, 4))
println(double(7))
```

## Gotchas

- Returning multiple values is syntactic sugar for returning a `Tuple`; `a, b = f()` unpacks it.
- A return type annotation does not create a new copy; it asserts the return value is convertible to that type.
- Functions implicitly return `nothing` when the last expression is a side-effectful statement like `println`.
