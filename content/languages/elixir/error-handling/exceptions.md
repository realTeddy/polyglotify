---
title: "Exceptions & Try/Catch"
language: "elixir"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Elixir supports exceptions via `raise`/`rescue`, `throw`/`catch`, and `exit`/`catch`. The idiomatic approach is to use tagged tuples (`{:ok, v}` / `{:error, r}`) for expected errors and reserve exceptions for truly exceptional conditions. The BEAM "let it crash" philosophy means many errors are better handled by supervisors.

## Example

```elixir
# raise / rescue
try do
  raise "something went wrong"
rescue
  e in RuntimeError -> IO.puts "RuntimeError: #{e.message}"
end

# Custom exception
defmodule ValidationError do
  defexception message: "validation failed", field: nil

  def exception(opts) do
    field = Keyword.get(opts, :field, "unknown")
    msg   = Keyword.get(opts, :message, "invalid value")
    %ValidationError{message: msg, field: field}
  end
end

try do
  raise ValidationError, field: :email, message: "invalid format"
rescue
  e in ValidationError ->
    IO.puts "#{e.field}: #{e.message}"
end

# rescue multiple exception types
try do
  File.read!("missing.txt")
rescue
  e in File.Error    -> IO.puts "File error: #{e.message}"
  e in RuntimeError  -> IO.puts "Runtime: #{e.message}"
end

# ensure: always executed (like finally)
try do
  do_work()
rescue
  e -> IO.puts "Error: #{inspect e}"
after
  IO.puts "Cleanup always runs"
end

# throw / catch (for non-local exits, rarely used)
result = catch :done do
  Enum.each(1..100, fn i ->
    if i == 5, do: throw(:done)
  end)
  :not_found
end
```

## Gotchas

- Prefer `{:ok, val}` / `{:error, reason}` for expected failures; use `raise` only for programming errors or truly unrecoverable states
- `rescue` catches exceptions; `catch` catches throws and exits — they are different mechanisms
- `after` (like `finally`) runs even if an exception is raised, but the exception still propagates unless explicitly rescued
