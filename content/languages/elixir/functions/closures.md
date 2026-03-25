---
title: "Closures & Lambdas"
language: "elixir"
feature: "closures"
category: "functions"
applicable: true
---

Anonymous functions (lambdas) in Elixir are defined with `fn ... end` or the capture shorthand `&(...)`. They close over variables in their enclosing scope. Named functions in modules are not closures; capture them with `&Module.function/arity`.

## Example

```elixir
# Anonymous function
greet = fn name -> "Hello, #{name}!" end
IO.puts greet.("Alice")   # note: dot syntax for anonymous functions

# Multi-clause anonymous function
classify = fn
  n when n > 0 -> :positive
  0            -> :zero
  _            -> :negative
end
IO.puts classify.(5)   # positive

# Capture shorthand & (common for simple transformations)
double = &(&1 * 2)
triple = &(&1 * 3)
IO.puts double.(5)  # 10
IO.puts triple.(5)  # 15

# Capturing named functions
square = &:math.pow(&1, 2)
IO.puts square.(4.0)  # 16.0

# Closures capture the outer scope
multiplier = fn factor ->
  fn x -> x * factor end
end

times3 = multiplier.(3)
times5 = multiplier.(5)
IO.puts times3.(7)  # 21
IO.puts times5.(7)  # 35

# Using in higher-order functions
[1, 2, 3, 4, 5]
|> Enum.map(&(&1 * &1))   # [1, 4, 9, 16, 25]
|> Enum.filter(&(&1 > 5)) # [9, 16, 25]
|> IO.inspect()

# Capture named function reference
IO.puts Enum.map(["alice", "bob"], &String.upcase/1)
# ["ALICE", "BOB"]
```

## Gotchas

- Anonymous functions are called with `.()`, not `()` — this distinguishes them from module functions
- The shorthand `&` with `&1`, `&2`... refers to the 1st, 2nd... argument; it's concise but avoid nesting
- Captured variables are immutable; the closure captures the value at creation time
