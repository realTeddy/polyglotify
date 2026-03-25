---
title: "Parameters & Arguments"
language: "elixir"
feature: "parameters"
category: "functions"
applicable: true
---

Elixir function parameters use pattern matching — arguments are matched against patterns in the function head. Default values use `\\`. There are no named parameters, but keyword lists and maps in the last position serve the same purpose idiomatically.

## Example

```elixir
defmodule Params do
  # Basic parameters
  def add(a, b), do: a + b

  # Default values with \\
  def greet(name, greeting \\ "Hello") do
    "#{greeting}, #{name}!"
  end

  # Pattern matching in parameters
  def first([head | _]), do: head
  def first([]),         do: nil

  def sum([]),         do: 0
  def sum([h | tail]), do: h + sum(tail)

  # Tuple pattern in parameter
  def handle({:ok, value}),    do: "Success: #{value}"
  def handle({:error, reason}), do: "Error: #{reason}"

  # Keyword list as named-parameter style (last argument convention)
  def connect(host, opts \\ []) do
    port    = Keyword.get(opts, :port, 80)
    timeout = Keyword.get(opts, :timeout, 5000)
    "#{host}:#{port} (#{timeout}ms)"
  end

  # Map destructuring in parameters
  def display(%{name: name, age: age}) do
    "#{name} is #{age}"
  end
end

IO.puts Params.greet("Alice")               # Hello, Alice!
IO.puts Params.greet("Bob", "Hi")           # Hi, Bob!
IO.puts Params.connect("localhost", port: 3000)
IO.puts Params.display(%{name: "Eve", age: 25})
```

## Gotchas

- Default values (`\\`) create a separate function head with the lower arity; `greet/1` and `greet/2` both exist
- Functions with multiple clauses and defaults need a function head without a body to declare the defaults: `def f(a, b \\ 1)`
- The last argument keyword list convention means callers can omit the square brackets: `connect("host", port: 3000)`
