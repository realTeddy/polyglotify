---
title: "Maps & Dictionaries"
language: "crystal"
feature: "maps"
category: "data-structures"
applicable: true
---

Crystal's `Hash(K, V)` is a generic hash map with O(1) average access. Literals use `{key => value}`. The key and value types are inferred. `[]` raises `KeyError` on missing keys; `[]?` returns `nil`. Hashes maintain insertion order. `NamedTuple` is a compile-time hash with symbol keys and per-key types.

## Example

```crystal
# Creation
scores = {"alice" => 95, "bob" => 87, "carol" => 92}
empty = Hash(String, Int32).new
with_default = Hash(String, Int32).new(0)  # missing key => 0

# Access
scores["alice"]     # => 95
scores["dave"]?     # => nil  (safe access)
scores.fetch("dave", -1)  # => -1

# Modification
scores["dave"] = 78
scores.delete("bob")

# Querying
scores.has_key?("alice")  # => true
scores.has_value?(99)     # => false
scores.size               # => 3

# Iteration
scores.each { |k, v| puts "#{k}: #{v}" }
scores.keys    # => ["alice", "carol", "dave"]
scores.values  # => [95, 92, 78]
scores.map { |k, v| {k, v * 2} }.to_h

# Merging
h1 = {"a" => 1}
h2 = {"b" => 2}
h1.merge(h2)   # => {"a" => 1, "b" => 2}
```

## Gotchas

- `[]` raises `KeyError` for missing keys — use `[]?` or `fetch` with a default to avoid exceptions.
- The hash literal `{key => value}` infers types; if types are mixed, the inferred type becomes a union.
- `NamedTuple` (`{x: 1, y: 2}`) has symbol keys known at compile time and is stack-allocated; prefer it over `Hash` for small fixed-key records.
