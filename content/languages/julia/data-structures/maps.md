---
title: "Maps & Dictionaries"
language: "julia"
feature: "maps"
category: "data-structures"
applicable: true
---

Julia's dictionary type is `Dict{K, V}` — a hash map with O(1) average-case access. Keys can be any hashable type. `OrderedDict` from the `OrderedCollections` package preserves insertion order. Use `get(d, key, default)` for safe access and `haskey(d, key)` to test membership.

## Example

```julia
# Create
d = Dict("name" => "Alice", "age" => 30)
typed = Dict{String, Int}("a" => 1, "b" => 2)

# Access
println(d["name"])                  # "Alice"
println(get(d, "missing", "N/A"))   # "N/A" — safe access

# Insert / update
d["city"] = "NYC"
d["age"]  = 31

# Delete
delete!(d, "city")

# Membership
println(haskey(d, "name"))   # true

# Iterate
for (k, v) in d
    println("$k => $v")
end

# Keys and values
println(keys(d))
println(values(d))

# Merge
d2 = Dict("x" => 1, "y" => 2)
merged = merge(d, d2)

# Comprehension
squares = Dict(x => x^2 for x in 1:5)
println(squares)
```

## Gotchas

- Accessing a missing key with `d[key]` throws a `KeyError`; use `get(d, key, default)` to avoid it.
- `Dict` is unordered; use `OrderedDict` from `OrderedCollections.jl` for insertion-order iteration.
- `Dict` type parameters must match: inserting a `Float64` into a `Dict{String, Int}` throws a `MethodError`.
