---
title: "Variables & Declaration"
language: "elixir"
feature: "variables"
category: "basics"
applicable: true
---

Elixir variables are immutable bindings that use single assignment per scope. Variable names use `snake_case`. The `=` operator is a **match operator**, not just assignment — it can destructure and pattern match on the right-hand side.

## Example

```elixir
# Simple binding
name = "Alice"
age = 30
is_active = true

# The = is a match operator
{a, b} = {1, 2}    # destructuring
IO.puts(a)          # 1
IO.puts(b)          # 2

# Re-binding rebinds the name (does not mutate)
x = 1
x = 2   # x now points to 2; the value 1 is unchanged

# Pin operator ^ prevents rebinding; forces a match
expected = 42
^expected = 42   # OK
# ^expected = 43  # raises MatchError

# Unused variables: prefix with _ to suppress warnings
{_, second} = {"ignored", "kept"}
IO.puts(second)  # kept

# Constants are module attributes
defmodule MyApp do
  @max_retries 3

  def retry_limit, do: @max_retries
end
```

## Gotchas

- Variables in Elixir are immutable per binding, but a name can be rebound in the same scope — use `^` to prevent accidental rebinding in patterns
- `=` is a match, not just assignment: `1 = 1` is valid; `2 = 1` raises `MatchError`
- Module attributes (`@name`) are compile-time constants, not runtime variables
