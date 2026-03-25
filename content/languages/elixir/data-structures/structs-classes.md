---
title: "Structs & Classes"
language: "elixir"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Elixir structs are typed maps defined with `defstruct` inside a module. They provide compile-time key validation, default values, and a module-scoped name. They are used wherever you would use a struct in other languages.

## Example

```elixir
defmodule User do
  # defstruct with default values
  defstruct name: "Anonymous", age: 0, email: nil, active: true

  # Functions that operate on the struct (methods by convention)
  def greet(%User{name: name}), do: "Hello, #{name}!"

  def make_admin(%User{} = user), do: %{user | role: :admin}
end

# Creating a struct
alice = %User{name: "Alice", age: 30, email: "alice@example.com"}

# Accessing fields (dot syntax)
IO.puts alice.name   # Alice
IO.puts alice.age    # 30

# Update (creates a new struct)
older_alice = %{alice | age: 31}

# Pattern matching
%User{name: name, active: true} = alice
IO.puts name   # Alice

# Guard checks
case alice do
  %User{age: a} when a >= 18 -> IO.puts "Adult"
  %User{}                     -> IO.puts "Minor"
end

# Struct is a map underneath
is_map(alice)            # true
alice.__struct__         # User
Map.from_struct(alice)   # %{name: "Alice", age: 30, ...}

# Enforce required keys (Elixir 1.14+)
defmodule Order do
  @enforce_keys [:id, :customer]
  defstruct [:id, :customer, items: [], total: 0]
end
```

## Gotchas

- Accessing a key not defined in the struct raises a `KeyError` at compile time (unlike plain maps)
- Struct update syntax `%{s | key: val}` requires the key to already exist
- `@enforce_keys` ensures those fields are provided at construction time; omitting them raises `ArgumentError`
