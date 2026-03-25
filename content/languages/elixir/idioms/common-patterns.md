---
title: "Common Patterns"
language: "elixir"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Elixir idioms are shaped by immutability, pattern matching, the pipeline operator, and the "let it crash" philosophy. Key patterns include tagged tuples, `with` chains, the pipeline, module attributes as constants, and GenServer for stateful processes.

## Example

```elixir
# 1. Pipeline operator for data transformation
result =
  "  Hello, World!  "
  |> String.trim()
  |> String.downcase()
  |> String.split(", ")
# ["hello", "world!"]

# 2. with for sequential fallible operations
def create_user(params) do
  with {:ok, name}  <- validate_name(params["name"]),
       {:ok, email} <- validate_email(params["email"]),
       {:ok, user}  <- User.insert(%{name: name, email: email}) do
    {:ok, user}
  else
    {:error, :blank_name}  -> {:error, "Name is required"}
    {:error, :invalid_email} -> {:error, "Invalid email"}
    {:error, db_error}     -> {:error, "DB error: #{db_error}"}
  end
end

# 3. Module attribute constants
defmodule HTTP do
  @default_timeout 5_000
  @max_retries 3

  def get(url, timeout \\ @default_timeout) do
    # ...
  end
end

# 4. Guard clauses for input validation
def process(data) when is_map(data) and map_size(data) > 0 do
  # safe to proceed
end

# 5. Reduce to build accumulator
word_count =
  ["hello", "world", "hello", "elixir"]
  |> Enum.reduce(%{}, fn word, acc ->
    Map.update(acc, word, 1, &(&1 + 1))
  end)
# %{"elixir" => 1, "hello" => 2, "world" => 1}

# 6. Stream for lazy computation over large data
File.stream!("large.log")
|> Stream.filter(&String.contains?(&1, "ERROR"))
|> Stream.map(&String.trim/1)
|> Enum.take(10)
```

## Gotchas

- Pipelines work best when each step takes and returns the same type of data; introducing an `{:ok, val}` wrapper mid-pipeline requires a helper to unwrap
- `with` is for sequential operations where each step depends on the previous; for parallel work, use `Task.async_stream`
- `Stream` is lazy and efficient for large inputs; `Enum` is eager and simpler for small lists
