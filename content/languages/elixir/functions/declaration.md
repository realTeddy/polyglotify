---
title: "Function Declaration"
language: "elixir"
feature: "declaration"
category: "functions"
applicable: true
---

Elixir functions are defined inside modules with `def` (public) or `defp` (private). Functions are identified by name and arity (number of arguments). Pattern matching across multiple clauses is idiomatic and replaces if/else for dispatch.

## Example

```elixir
defmodule Greeter do
  # Public function
  def hello(name) do
    "Hello, #{name}!"
  end

  # Short form for single-expression functions
  def double(x), do: x * 2

  # Multiple clauses (pattern matching on arguments)
  def greet(:english, name), do: "Hello, #{name}"
  def greet(:spanish, name), do: "Hola, #{name}"
  def greet(:french, name),  do: "Bonjour, #{name}"
  def greet(_, name),        do: "Hi, #{name}"  # catch-all

  # Guards in function clauses
  def classify(n) when n > 0, do: :positive
  def classify(0),             do: :zero
  def classify(n) when n < 0, do: :negative

  # Private function (only callable within this module)
  defp internal_helper(x), do: x * x

  # Recursive function
  def factorial(0), do: 1
  def factorial(n) when n > 0, do: n * factorial(n - 1)
end

IO.puts Greeter.hello("Alice")           # Hello, Alice!
IO.puts Greeter.greet(:spanish, "Bob")   # Hola, Bob
IO.puts Greeter.classify(-5)             # negative
IO.puts Greeter.factorial(5)             # 120
```

## Gotchas

- Clauses of the same function must be grouped together; you cannot intersperse another function's clauses between them
- The arity is part of the function identity: `hello/1` and `hello/2` are different functions
- `defp` functions are not accessible from outside the module; this is enforced at compile time
