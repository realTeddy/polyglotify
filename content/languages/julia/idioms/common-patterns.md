---
title: "Common Patterns"
language: "julia"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Julia idioms include broadcasting (`.` operator), multiple dispatch for polymorphism, in-place mutation with `!` functions, comprehensions, piping with `|>`, and leveraging the type system for zero-cost abstractions. Julia code is often written in a MATLAB-influenced numerical style, with heavy use of vectorized operations.

## Example

```julia
# 1. Broadcasting — apply f element-wise
x = [1.0, 2.0, 3.0, 4.0]
println(sin.(x))         # vectorized sin
println(x .^ 2 .+ 1)    # element-wise operations

# 2. Pipe operator
result = [1,2,3,4,5] |> x -> filter(iseven, x) |> sum
println(result)    # 6

# 3. Comprehension with condition
primes_ish = [n for n in 2:30 if all(n % d != 0 for d in 2:n-1)]
println(primes_ish)

# 4. Multiple dispatch polymorphism
abstract type Drawable end
draw(d::Drawable) = error("not implemented")

struct Dot <: Drawable; x::Float64; y::Float64 end
draw(d::Dot) = println("Dot at ($(d.x), $(d.y))")

draw(Dot(1.0, 2.0))

# 5. In-place (!) pattern
v = [3, 1, 4, 1, 5, 9]
sort!(v)    # mutates v; sort(v) would return a copy
println(v)

# 6. do-block for resource management
open("/dev/null") do f
    # f is automatically closed when block exits
end

# 7. @views for zero-copy slices
A = rand(1000, 1000)
col = @view A[:, 1]    # no copy
println(sum(col))
```

## Gotchas

- Forgetting the `.` in broadcasting calls a scalar function on an array, usually resulting in a `MethodError`.
- `!`-functions mutate their first argument; calling `sort(v)` returns a new array while `sort!(v)` modifies in place.
- Julia's `|>` pipes a single value; for more complex pipelines, use anonymous functions or `Chain.jl`.
