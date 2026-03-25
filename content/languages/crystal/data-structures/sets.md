---
title: "Sets"
language: "crystal"
feature: "sets"
category: "data-structures"
applicable: true
---

Crystal's `Set(T)` is backed by a `Hash` and provides O(1) average membership tests. It is available via `require "set"`. Standard set operations (`|`, `&`, `-`, `^`) are defined. Sets maintain no guaranteed order.

## Example

```crystal
require "set"

s1 = Set{1, 2, 3, 4, 5}
s2 = Set{3, 4, 5, 6, 7}

# Membership
s1.includes?(3)   # => true
s1.includes?(9)   # => false

# Add / delete
s1.add(6)
s1.delete(1)

# Set operations
s1 | s2   # union
s1 & s2   # intersection: Set{3, 4, 5}
s1 - s2   # difference
s1 ^ s2   # symmetric difference

# Subset / superset
Set{1, 2}.subset_of?(s1)    # => true
s1.superset_of?(Set{2, 3})  # => true

# Conversion
s1.to_a   # Array (unordered)
[1, 2, 2, 3].to_set  # => Set{1, 2, 3}  (deduplication)

# Iteration
s1.each { |x| print "#{x} " }
```

## Gotchas

- `Set` is not in `prelude`; you must `require "set"` explicitly.
- Iteration order is not guaranteed (hash-based implementation).
- `add` mutates the set in place and returns the set itself; `add?` returns `nil` if the element was already present.
