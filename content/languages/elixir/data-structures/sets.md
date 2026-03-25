---
title: "Sets"
language: "elixir"
feature: "sets"
category: "data-structures"
applicable: true
---

Elixir provides `MapSet` as its built-in set type — an immutable set backed by a map. Elements must be comparable. The `MapSet` module provides all standard set operations.

## Example

```elixir
# Create a MapSet
s1 = MapSet.new([1, 2, 3, 4, 5])
s2 = MapSet.new([3, 4, 5, 6, 7])

# From a list (duplicates removed)
s = MapSet.new(["apple", "banana", "apple"])
# MapSet<["apple", "banana"]>

# Membership check (O(1))
MapSet.member?(s1, 3)   # true
MapSet.member?(s1, 9)   # false

# Add / delete (returns new MapSet)
s3 = MapSet.put(s1, 6)
s4 = MapSet.delete(s1, 1)

# Set operations
MapSet.union(s1, s2)        # {1,2,3,4,5,6,7}
MapSet.intersection(s1, s2) # {3,4,5}
MapSet.difference(s1, s2)   # {1,2}

# Predicates
MapSet.subset?(MapSet.new([1,2]), s1)   # true
MapSet.disjoint?(MapSet.new([9,10]), s1) # true
MapSet.equal?(s1, MapSet.new([1,2,3,4,5]))  # true

# Size and conversion
MapSet.size(s1)        # 5
MapSet.to_list(s1)     # [1, 2, 3, 4, 5]  (order not guaranteed)

# Iteration (Enumerable)
Enum.map(s1, &(&1 * 2))  # [2, 4, 6, 8, 10]
```

## Gotchas

- `MapSet` iteration order is not guaranteed; do not rely on insertion order
- Any term can be a set member (MapSet uses structural equality `===`)
- For large sets of integers, consider using the Erlang `:gb_sets` module for sorted operations
