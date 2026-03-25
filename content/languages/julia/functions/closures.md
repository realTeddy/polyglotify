---
title: "Closures & Lambdas"
language: "julia"
feature: "closures"
category: "functions"
applicable: true
---

Julia anonymous functions are created with `x -> expr` (single argument) or `(x, y) -> expr` (multiple arguments). The `do` block syntax creates an anonymous function as the first argument to a function call. Anonymous functions close over variables in the enclosing scope. They are first-class values and can be passed to higher-order functions.

## Example

```julia
# Arrow syntax
square = x -> x^2
println(square(5))      # 25

# Multi-argument
add = (a, b) -> a + b
println(add(3, 4))      # 7

# Closure — captures outer variable
function make_adder(n)
    x -> x + n          # closes over n
end
add10 = make_adder(10)
println(add10(5))       # 15

# Higher-order functions
nums = [1, 2, 3, 4, 5]
doubled  = map(x -> x * 2, nums)
evens    = filter(x -> x % 2 == 0, nums)
total    = reduce(+, nums)
println(doubled)
println(evens)
println(total)

# do-block syntax (anonymous function as first argument)
result = map(nums) do x
    if x % 2 == 0
        x^2
    else
        x
    end
end
println(result)
```

## Gotchas

- Closures capture variables by reference; modifying the outer variable affects the closure.
- `do` blocks create the anonymous function as the *first* argument, even though they appear after the call.
- For performance-critical closures in tight loops, annotate captured variables with their types.
