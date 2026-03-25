---
title: "Control Flow"
language: "elixir"
feature: "control-flow"
category: "basics"
applicable: true
---

Elixir provides `if`, `unless`, `cond`, `case`, and `with` for control flow. `case` with pattern matching is the most idiomatic choice. `with` chains pattern-matched operations, short-circuiting on the first mismatch. All control structures are expressions.

## Example

```elixir
# if / unless
score = 85
if score >= 60 do
  IO.puts "Pass"
else
  IO.puts "Fail"
end

unless score < 60, do: IO.puts("Pass")

# cond: multi-branch (like if/elseif chain)
grade =
  cond do
    score >= 90 -> "A"
    score >= 80 -> "B"
    score >= 70 -> "C"
    true        -> "F"   # default
  end

# case: pattern matching
result = {:ok, 42}
case result do
  {:ok, value}       -> IO.puts("Got: #{value}")
  {:error, reason}   -> IO.puts("Error: #{reason}")
  _                  -> IO.puts("Unexpected")
end

# case with guards
case score do
  s when s >= 90 -> "A"
  s when s >= 80 -> "B"
  _              -> "C or lower"
end

# with: chain pattern matches, short-circuit on mismatch
with {:ok, user}  <- fetch_user(1),
     {:ok, order} <- fetch_order(user),
     :ok          <- validate(order) do
  process(order)
else
  {:error, reason} -> "Failed: #{reason}"
  _                -> "Unknown error"
end
```

## Gotchas

- `if` with no `else` returns `nil` on the unmatched branch
- `cond` raises `CondClauseError` if no branch matches; always include a `true ->` catch-all
- `with` only catches mismatches in the `else` block; exceptions still propagate
