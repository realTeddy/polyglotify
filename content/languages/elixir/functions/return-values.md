---
title: "Return Values"
language: "elixir"
feature: "return-values"
category: "functions"
applicable: true
---

Elixir functions return the value of their last expression. There is no explicit `return` keyword. The idiomatic convention for fallible functions is to return tagged tuples: `{:ok, value}` on success and `{:error, reason}` on failure.

## Example

```elixir
defmodule ReturnDemo do
  # Last expression is the return value
  def add(a, b) do
    result = a + b
    result   # returned
  end

  # Compact form
  def square(x), do: x * x

  # Tagged tuple convention
  def safe_divide(_x, 0), do: {:error, "division by zero"}
  def safe_divide(x, y),  do: {:ok, x / y}

  # Multiple values via tuple
  def min_max([]), do: {:error, "empty list"}
  def min_max(list) do
    {:ok, Enum.min(list), Enum.max(list)}
  end
end

# Handling tagged tuples with case
case ReturnDemo.safe_divide(10, 2) do
  {:ok, val}       -> IO.puts("Result: #{val}")
  {:error, reason} -> IO.puts("Error: #{reason}")
end

# Handling with pattern match + bang functions
{:ok, val} = ReturnDemo.safe_divide(10, 2)

# Bang convention: raise on error
defmodule Files do
  def read(path) do
    case File.read(path) do
      {:ok, content}   -> {:ok, content}
      {:error, reason} -> {:error, reason}
    end
  end

  def read!(path) do
    case read(path) do
      {:ok, content}   -> content
      {:error, reason} -> raise "Cannot read #{path}: #{reason}"
    end
  end
end
```

## Gotchas

- There is no `return` statement; the last evaluated expression is always the return value
- The `{:ok, value}` / `{:error, reason}` convention is enforced by most Elixir/Erlang libraries; follow it consistently
- Bang functions (`!` suffix) raise exceptions on failure; use them when the error is truly unrecoverable at that point
