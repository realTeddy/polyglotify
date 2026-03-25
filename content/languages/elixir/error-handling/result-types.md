---
title: "Result Types"
language: "elixir"
feature: "result-types"
category: "error-handling"
applicable: true
---

Elixir's idiomatic result type is the tagged tuple: `{:ok, value}` for success and `{:error, reason}` for failure. The `with` construct chains these elegantly, short-circuiting on the first non-matching pattern.

## Example

```elixir
# Basic {:ok, val} / {:error, reason} pattern
defmodule UserService do
  def find_user(id) when id > 0 do
    # Simulate DB lookup
    {:ok, %{id: id, name: "Alice"}}
  end
  def find_user(_), do: {:error, :invalid_id}

  def activate(%{id: _} = user) do
    {:ok, Map.put(user, :active, true)}
  end
end

# Chain with case
case UserService.find_user(1) do
  {:ok, user} ->
    case UserService.activate(user) do
      {:ok, active_user} -> IO.inspect active_user
      {:error, reason}   -> IO.puts "Activation failed: #{reason}"
    end
  {:error, reason} -> IO.puts "User not found: #{reason}"
end

# Chain with with (cleaner)
with {:ok, user}        <- UserService.find_user(1),
     {:ok, active_user} <- UserService.activate(user) do
  IO.inspect active_user
else
  {:error, :invalid_id} -> IO.puts "Bad ID"
  {:error, reason}      -> IO.puts "Error: #{reason}"
end

# OK / error helpers
defmodule Result do
  def map({:ok, val}, f), do: {:ok, f.(val)}
  def map(err, _),        do: err

  def flat_map({:ok, val}, f), do: f.(val)
  def flat_map(err, _),        do: err

  def ok!(result) do
    {:ok, val} = result
    val
  end
end
```

## Gotchas

- `with` only catches clauses that **don't match** the pattern; exceptions still propagate normally
- The `else` block in `with` should handle all possible error shapes; unmatched patterns raise `CaseClauseError`
- Bang functions (`File.read!/1`) raise on error; non-bang (`File.read/1`) return `{:ok, _}` or `{:error, _}` — choose based on whether the error is recoverable
