---
title: "Generics"
language: "elixir"
feature: "generics"
category: "oop"
applicable: true
---

Elixir is dynamically typed, so all functions are generic by default — they work on any data that satisfies their structural expectations. Protocols provide open dispatch for type-specific behaviour. Typespecs with `@spec` provide optional static analysis via Dialyzer.

## Example

```elixir
# All functions are implicitly "generic"
defmodule Container do
  # Works for any type
  def wrap(value), do: {:wrapped, value}
  def unwrap({:wrapped, value}), do: value
  def unwrap(_), do: {:error, :not_wrapped}
end

IO.inspect Container.wrap(42)        # {:wrapped, 42}
IO.inspect Container.wrap("hello")   # {:wrapped, "hello"}
IO.inspect Container.wrap([1,2,3])   # {:wrapped, [1, 2, 3]}

# Protocol for type-specific dispatch (like generic interfaces)
defprotocol Measurable do
  @spec measure(t) :: number()
  def measure(thing)
end

defimpl Measurable, for: List do
  def measure(list), do: length(list)
end

defimpl Measurable, for: BitString do
  def measure(s), do: byte_size(s)
end

defimpl Measurable, for: Map do
  def measure(m), do: map_size(m)
end

Measurable.measure([1,2,3])       # 3
Measurable.measure("hello")       # 5
Measurable.measure(%{a: 1})       # 1

# Typespec annotations for documentation and Dialyzer
@spec zip(list(a), list(b)) :: list({a, b}) when a: term, b: term
def zip([], _), do: []
def zip(_, []), do: []
def zip([h1|t1], [h2|t2]), do: [{h1,h2} | zip(t1, t2)]
```

## Gotchas

- Without type annotations, all type errors are runtime errors; add `@spec` and run Dialyzer in CI for early detection
- Protocols do not verify the input type at compile time; calling `Measurable.measure/1` with an unimplemented type raises `Protocol.UndefinedError` at runtime
- Dialyzer performs success typing (not full type checking) — it finds definite errors but may miss some
