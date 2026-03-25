---
title: "Interfaces & Traits"
language: "julia"
feature: "interfaces"
category: "oop"
applicable: false
---

Julia has no formal interface or trait syntax. Interfaces are defined implicitly: a type "implements an interface" by having the required methods defined for it. The `AbstractArray`, `AbstractDict`, and iterator interfaces are documented contracts — implement the required methods and your type works throughout the Julia ecosystem. Packages like `Interfaces.jl` provide optional formal checking.

## Example

```julia
# Julia interface: implement required methods for a type

struct RingBuffer{T}
    data::Vector{T}
    head::Ref{Int}
    RingBuffer{T}(n) where T = new(Vector{T}(undef, n), Ref(1))
end

# Implement the iterator interface
Base.iterate(r::RingBuffer) = iterate(r.data)
Base.iterate(r::RingBuffer, state) = iterate(r.data, state)
Base.length(r::RingBuffer) = length(r.data)
Base.eltype(::Type{RingBuffer{T}}) where T = T

# Now RingBuffer works with all iterator-based functions
rb = RingBuffer{Int}(3)
rb.data .= [10, 20, 30]

for x in rb
    println(x)
end

println(collect(rb))
println(sum(rb))
```

## Gotchas

- Julia interfaces are "duck-typed" — there is no compile-time check that all required methods are defined.
- Use `hasmethod(methodname, (Type,))` or `applicable` at runtime to test if a method exists.
- The `Base` module documents required methods for built-in abstractions; follow them for ecosystem compatibility.
