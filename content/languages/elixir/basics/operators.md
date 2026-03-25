---
title: "Operators"
language: "elixir"
feature: "operators"
category: "basics"
applicable: true
---

Elixir provides standard arithmetic and comparison operators, plus functional pipeline (`|>`), list cons (`[h | t]`), string concatenation (`<>`), and match (`=`). Comparison operators work across different types using Erlang's term ordering.

## Example

```elixir
# Arithmetic
IO.puts 10 + 3    # 13
IO.puts 10 - 3    # 7
IO.puts 10 * 3    # 30
IO.puts 10 / 3    # 3.3333... (always float)
IO.puts div(10, 3) # 3  (integer division)
IO.puts rem(10, 3) # 1  (remainder)
IO.puts 2 ** 10   # 1024.0

# Comparison
1 == 1.0    # true   (value equality, type coercion)
1 === 1.0   # false  (strict equality, no coercion)
1 != 2      # true
1 !== 1.0   # true
1 < 2       # true

# Boolean
true and false   # false
true or false    # true
not true         # false
# && and || are short-circuit; require boolean left operand
true && false    # false
false || true    # true

# String concatenation
"Hello" <> ", " <> "World"   # "Hello, World"

# Pipeline operator (passes left as first arg to right)
result =
  [1, 2, 3, 4, 5]
  |> Enum.filter(&rem(&1, 2) == 0)
  |> Enum.map(&(&1 * 2))
  |> Enum.sum()
# result == 12
```

## Gotchas

- `/` always returns a float; use `div/2` and `rem/2` for integer arithmetic
- `==` compares values across types (`1 == 1.0` is true); `===` requires same type
- `and`/`or`/`not` require boolean operands; `&&`/`||`/`!` accept any value (falsy: `nil` and `false`)
