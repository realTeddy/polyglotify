---
title: "Tuples"
language: "julia"
feature: "tuples"
category: "data-structures"
applicable: true
---

Julia has two tuple types: plain `Tuple` (heterogeneous, immutable, fixed-length) and `NamedTuple` (with field names accessible by symbol or dot syntax). Tuples are commonly used for multiple return values. `NTuple{N, T}` is a homogeneous tuple of N elements of type T.

## Example

```julia
# Plain tuple
t = (1, "hello", 3.14)
println(t[1])           # 1 (1-indexed)
println(t[2])           # "hello"

# Tuple type
println(typeof(t))      # Tuple{Int64, String, Float64}

# Destructuring
a, b, c = t
println(a, b, c)

# Named tuple
person = (name="Alice", age=30, active=true)
println(person.name)       # "Alice"
println(person[:age])      # 30
println(person[1])         # "Alice" (positional)

# NTuple
coords::NTuple{3, Float64} = (1.0, 2.0, 3.0)

# Tuple as multiple return
function minmax_val(v)
    minimum(v), maximum(v)    # returns Tuple
end
lo, hi = minmax_val([3, 1, 4, 1, 5])
println("$lo to $hi")

# Spread/splat
args = (2, 3)
println(+(args...))   # 5
```

## Gotchas

- Tuples are immutable; use `Vector` or `MutableNamedTuple` (external package) for mutable named collections.
- `NamedTuple` field names are `Symbol`s; access them with `.fieldname` or `[:fieldname]`.
- Unlike Python, Julia tuples require parentheses for single-element tuples: `(42,)` not `42,`.
