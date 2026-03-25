---
title: "Tuples"
language: "elixir"
feature: "tuples"
category: "data-structures"
applicable: true
---

Tuples are ordered, fixed-size, immutable collections stored contiguously in memory. They are fast for indexed access and widely used for tagged return values (`{:ok, value}`, `{:error, reason}`).

## Example

```elixir
# Tuple literal
point = {3, 4}
result = {:ok, "data"}
error  = {:error, "not found"}

# Access by index (0-based, O(1))
elem(point, 0)   # 3
elem(point, 1)   # 4

# Pattern matching (most common usage)
{x, y} = point
IO.puts "#{x}, #{y}"   # 3, 4

case result do
  {:ok, value}       -> IO.puts "Got: #{value}"
  {:error, reason}   -> IO.puts "Error: #{reason}"
end

# Tuple size
tuple_size(point)   # 2

# Updating an element (creates a new tuple)
updated = put_elem(point, 1, 99)   # {3, 99}

# Converting to/from list
Tuple.to_list(point)       # [3, 4]
List.to_tuple([3, 4])      # {3, 4}

# 3-element result tuple
case File.stat("path") do
  {:ok, %{size: size}} -> IO.puts "Size: #{size}"
  {:error, :enoent}    -> IO.puts "File not found"
  {:error, reason}     -> IO.puts "Error: #{reason}"
end
```

## Gotchas

- Tuples are stored contiguously; "updating" one element copies the entire tuple — avoid large tuples with frequent updates (use maps instead)
- Indexing out of bounds raises `ArgumentError`; use `tuple_size/1` to guard
- Prefer tuples for small, fixed-structure data (like `{:ok, val}`); prefer maps for records with named fields
