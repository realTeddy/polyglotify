---
title: "Result Types"
language: "julia"
feature: "result-types"
category: "error-handling"
applicable: true
---

Julia has no built-in `Result` type like Rust, but the `ErrorTypes.jl` and `ResultTypes.jl` packages provide one. The idiomatic Julia approach uses `Union{T, Nothing}` for optional values and exceptions for errors. Some APIs return `nothing` on failure or use `Missing` for statistical missingness. The `@something` macro and `something(x, default)` help unwrap nullable values.

## Example

```julia
# Built-in: Union{T, Nothing} as optional
function find_first(pred, v::Vector)::Union{eltype(v), Nothing}
    for x in v
        pred(x) && return x
    end
    nothing
end

result = find_first(x -> x > 3, [1, 2, 3, 4, 5])
println(result === nothing ? "not found" : result)   # 4

# something() unwraps or uses default
val = something(find_first(x -> x > 10, [1,2,3]), -1)
println(val)   # -1

# Using ResultTypes.jl (if installed)
# using ResultTypes
# function safe_div(a, b)::Result{Float64, String}
#     b == 0 && return Err("division by zero")
#     Ok(a / b)
# end

# Manual tagged-union approach
function safe_parse(s::String)
    try
        (ok=true,  value=parse(Int, s))
    catch
        (ok=false, value=nothing)
    end
end

r = safe_parse("42")
r.ok && println("Parsed: ", r.value)

r2 = safe_parse("abc")
r2.ok || println("Parse failed")
```

## Gotchas

- `nothing` is a singleton of type `Nothing`; use `isnothing(x)` or `x === nothing` to check it.
- `Missing` is for data that *should* exist but doesn't (statistics); `Nothing` is for intentional absence.
- For robust result-type patterns in production code, use the `ResultTypes.jl` or `ErrorTypes.jl` package.
