---
title: "Interfaces & Traits"
language: "elixir"
feature: "interfaces"
category: "oop"
applicable: true
---

Elixir has two interface mechanisms: **Protocols** (ad-hoc polymorphism, open to extension) and **Behaviours** (callback contracts for modules, like Java interfaces). Protocols dispatch at runtime on the data type; Behaviours are checked at compile time.

## Example

```elixir
# --- Protocol: open polymorphism ---
defprotocol Serializable do
  @doc "Converts a value to a string representation"
  def serialize(value)
end

defimpl Serializable, for: Integer do
  def serialize(n), do: "int:#{n}"
end

defimpl Serializable, for: BitString do
  def serialize(s), do: "str:#{s}"
end

defimpl Serializable, for: List do
  def serialize(list), do: "[#{Enum.map_join(list, ",", &Serializable.serialize/1)}]"
end

IO.puts Serializable.serialize(42)         # int:42
IO.puts Serializable.serialize("hello")    # str:hello
IO.puts Serializable.serialize([1, "a"])   # [int:1,str:a]

# --- Behaviour: compile-time callback contract ---
defmodule Cache do
  @callback get(key :: term()) :: {:ok, term()} | {:error, :not_found}
  @callback put(key :: term(), value :: term()) :: :ok
  @callback delete(key :: term()) :: :ok
end

defmodule MemoryCache do
  @behaviour Cache
  # ... implement all callbacks
  def get(_key), do: {:error, :not_found}
  def put(_key, _val), do: :ok
  def delete(_key), do: :ok
end
```

## Gotchas

- Protocols are open: you can add implementations for any type, including third-party or built-in types, without modifying the original module
- Behaviours require all `@callback` functions to be implemented; missing implementations generate a compile-time warning
- Use `@impl true` before callback implementations to get compile-time verification that the function matches a declared callback
