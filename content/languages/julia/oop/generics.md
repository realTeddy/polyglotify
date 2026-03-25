---
title: "Generics"
language: "julia"
feature: "generics"
category: "oop"
applicable: true
---

Julia supports parametric types and parametric methods using type parameters in curly braces `{T}`. This is Julia's equivalent of generics — type parameters can be constrained with `<:` (subtype) and `>:` (supertype). Parametric dispatch allows specialization on the type parameter itself. Julia generates specialized compiled code for each concrete type instantiation.

## Example

```julia
# Parametric struct
struct Stack{T}
    data::Vector{T}
    Stack{T}() where T = new(T[])
end

push_item!(s::Stack{T}, item::T) where T = push!(s.data, item)
pop_item!(s::Stack)  = pop!(s.data)
peek(s::Stack)       = last(s.data)
Base.isempty(s::Stack) = isempty(s.data)

# Parametric function with type constraint
function largest(a::T, b::T) where T <: Real
    a > b ? a : b
end

# Multiple type parameters
function zip_pair(a::A, b::B) where {A, B}
    (a, b)
end

# Constrained to Number subtypes
function inner_product(v::Vector{T}) where T <: Number
    sum(x -> x^2, v)
end

# Usage
s = Stack{Int}()
push_item!(s, 1)
push_item!(s, 2)
println(peek(s))          # 2

println(largest(3, 7))    # 7
println(largest(3.1, 2.7)) # 3.1
println(inner_product([1, 2, 3]))  # 14
```

## Gotchas

- `where T` constraints apply at the method level; `{T}` in a struct is the type parameter.
- `Vector{Int}` and `Vector{Float64}` are distinct types; `Vector{Int}` is not a subtype of `Vector{Number}`.
- Use `T <: AbstractArray` rather than concrete types in constraints to support all array-like types.
