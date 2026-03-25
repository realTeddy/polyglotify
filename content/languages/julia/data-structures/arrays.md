---
title: "Arrays & Lists"
language: "julia"
feature: "arrays"
category: "data-structures"
applicable: true
---

Julia's primary sequential data structure is `Array{T,N}` — an N-dimensional mutable array. 1D arrays (`Vector{T}`) and 2D arrays (`Matrix{T}`) are the most common. Arrays are 1-indexed. Julia has no separate "list" type; `Vector` fills that role. The standard library provides extensive array operations and broadcasting via the dot operator.

## Example

```julia
# Create
v = [1, 2, 3, 4, 5]            # Vector{Int64}
w = Vector{Float64}(undef, 3)  # uninitialized
z = zeros(Int, 5)               # [0,0,0,0,0]
r = collect(1:5)                # from range

# Access (1-indexed!)
println(v[1])     # 1 (first element)
println(v[end])   # 5 (last element)
println(v[2:4])   # [2, 3, 4]

# Mutate
push!(v, 6)
pop!(v)
pushfirst!(v, 0)
deleteat!(v, 1)

# Operations
println(length(v))
println(sum(v))
println(sort(v))
println(reverse(v))

# 2D array (Matrix)
M = [1 2 3; 4 5 6; 7 8 9]
println(M[2, 3])    # 6
println(M[:, 1])    # first column

# Broadcasting
println(v .^ 2)
println(v .> 3)
```

## Gotchas

- Arrays are **1-indexed** (not 0-indexed); `v[0]` throws a `BoundsError`.
- `v[2:4]` creates a *copy* of the slice; use `@view v[2:4]` for a zero-copy view.
- Broadcasting with `.` applies element-wise; forgetting it tries to apply scalar operations to arrays.
