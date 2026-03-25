---
title: "Arrays & Lists"
language: "elixir"
feature: "arrays"
category: "data-structures"
applicable: true
---

Elixir uses **linked lists** as the primary sequential data structure. Lists are immutable and efficient for prepend/deconstruct (O(1)) but O(n) for indexed access. For array-like O(1) access, use `:array` (Erlang) or tuples for small fixed-size collections.

## Example

```elixir
# List literal
fruits = ["apple", "banana", "cherry"]

# Head and tail deconstruction
[head | tail] = fruits
IO.puts head   # apple
IO.inspect tail # ["banana", "cherry"]

# Prepend (O(1))
more = ["avocado" | fruits]

# Length, access (O(n))
IO.puts length(fruits)  # 3
IO.puts Enum.at(fruits, 1)  # banana

# Common Enum operations
Enum.map(fruits, &String.upcase/1)          # ["APPLE", "BANANA", "CHERRY"]
Enum.filter(fruits, &(String.length(&1) > 5))  # ["banana", "cherry"]
Enum.reduce([1,2,3,4], 0, &+/2)            # 10

# Comprehension
squares = for x <- 1..5, do: x * x
# [1, 4, 9, 16, 25]

filtered = for x <- 1..10, rem(x, 2) == 0, do: x
# [2, 4, 6, 8, 10]

# List operations
[1, 2] ++ [3, 4]   # [1, 2, 3, 4]  (concatenation, O(n))
[1, 2, 1] -- [1]   # [2, 1]        (first occurrence removed)

# Pattern matching
case fruits do
  []          -> "empty"
  [only]      -> "one: #{only}"
  [f | _rest] -> "starts with #{f}"
end
```

## Gotchas

- Appending to a list (`list ++ [x]`) is O(n); prepend (`[x | list]`) is O(1) — build lists in reverse then `Enum.reverse/1`
- `Enum.at/2` is O(n); avoid it in tight loops on large lists
- `--` removes the first occurrence of each element in the right operand, not all occurrences
