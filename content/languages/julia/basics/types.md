---
title: "Types & Type Systems"
language: "julia"
feature: "types"
category: "basics"
applicable: true
---

Julia has a rich, dynamic type system with multiple dispatch at its core. Types form a hierarchy: abstract types define interfaces, concrete types hold data. Primitive types include `Int64`, `Float64`, `Bool`, `Char`, `String`. Julia supports parametric types (generics), union types, and `Nothing`/`Missing` for null-like values. Type inference allows the JIT compiler to generate efficient native code.

## Example

```julia
# Concrete types
x::Int64   = 42
y::Float64 = 3.14
b::Bool    = true
c::Char    = 'A'
s::String  = "hello"

# Checking types
println(typeof(x))        # Int64
println(x isa Integer)    # true (Integer is an abstract type)
println(x isa Number)     # true

# Abstract type hierarchy
# Number > Real > Integer > Int64

# Parametric types
v = Vector{Int}([1, 2, 3])   # typed array
d = Dict{String, Int}()

# Union types
function maybe_int(x)::Union{Int, Nothing}
    x > 0 ? x : nothing
end

# Conversion and promotion
println(Int(3.0))          # 3
println(Float64(42))       # 42.0
println(promote(1, 2.5))   # (1.0, 2.5)
```

## Gotchas

- `Int` is an alias for the platform-native integer (32-bit on 32-bit systems, 64-bit on 64-bit).
- `Missing` (for statistical missingness) is distinct from `Nothing` (for absence of value).
- Julia's type system is *nominal*, not structural; type compatibility is based on declared relationships, not shape.
