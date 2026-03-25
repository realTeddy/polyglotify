---
title: "Sets"
language: "julia"
feature: "sets"
category: "data-structures"
applicable: true
---

Julia's `Set{T}` is a mutable hash set with O(1) average-case membership test. Elements must be hashable. Standard set operations — union, intersection, difference — are supported both as functions and operators. `BitSet` is an efficient set for non-negative integers.

## Example

```julia
# Create
s1 = Set([1, 2, 3, 4, 5])
s2 = Set([3, 4, 5, 6, 7])

# Membership
println(3 in s1)          # true
println(in(3, s1))        # true

# Add / remove
push!(s1, 10)
delete!(s1, 10)

# Set operations
println(union(s1, s2))
println(intersect(s1, s2))
println(setdiff(s1, s2))    # s1 - s2
println(issubset(Set([1,2]), s1))

# In-place operations
union!(s1, s2)          # modifies s1

# BitSet — efficient for non-negative integers
bs = BitSet([2, 4, 6, 8, 10])
push!(bs, 12)
println(8 in bs)    # true

# Construct from any iterable
words = Set(split("the quick brown fox the quick"))
println(length(words))   # 4 unique words
```

## Gotchas

- `Set` is unordered; there is no guaranteed iteration order.
- `Set{T}` requires elements to implement `hash` and `==`; custom types need these defined.
- `setdiff(a, b)` returns elements in `a` not in `b` (not symmetric difference); use `symdiff(a, b)` for symmetric.
