---
title: "Maps & Dictionaries"
language: "elixir"
feature: "maps"
category: "data-structures"
applicable: true
---

Elixir's `Map` is an immutable hash map. Atom-keyed maps have special dot-access syntax. The `Map` module provides functional update operations. `Keyword` lists provide ordered, duplicate-key maps (mainly for options).

## Example

```elixir
# Map literal
person = %{name: "Alice", age: 30}   # atom keys (shorthand)
coords = %{"x" => 10, "y" => 20}     # string keys

# Access
person.name          # Alice   (dot syntax, atom keys only)
person[:age]         # 30      (bracket syntax, any key)
coords["x"]          # 10

# Access with default (no KeyError)
Map.get(person, :email, "N/A")  # "N/A"

# Update: creates a new map
older = %{person | age: 31}    # update syntax (key must exist)
with_email = Map.put(person, :email, "alice@example.com")

# Delete
Map.delete(person, :age)

# Merge (right takes precedence on conflict)
Map.merge(%{a: 1, b: 2}, %{b: 99, c: 3})
# %{a: 1, b: 99, c: 3}

# Pattern matching on maps
%{name: name} = person
IO.puts name  # Alice

# Map in function head
def greet(%{name: n, age: a}) do
  "#{n} is #{a}"
end

# Iteration
person
|> Enum.each(fn {k, v} -> IO.puts("#{k}: #{v}") end)

Map.keys(person)    # [:age, :name]
Map.values(person)  # [30, "Alice"]
```

## Gotchas

- The `%{map | key: value}` update syntax raises a `KeyError` if the key doesn't exist; use `Map.put/3` to add new keys
- `Map.get/2` returns `nil` for missing keys; use `Map.fetch/2` (returns `{:ok, val}` or `:error`) for explicit handling
- Large maps use a HAMT (hash array mapped trie) internally; they are efficient but not ordered — use `Enum.sort/1` to iterate in order
