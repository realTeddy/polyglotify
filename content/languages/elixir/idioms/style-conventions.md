---
title: "Style Conventions"
language: "elixir"
feature: "style-conventions"
category: "idioms"
applicable: true
---

The Elixir community follows the official [Elixir style guide](https://github.com/christopheradams/elixir_style_guide). `mix format` is the standard auto-formatter; **Credo** provides linting and style checks.

## Example

```elixir
# Naming conventions
my_variable = "snake_case for variables and functions"
MY_CONSTANT = :not_a_thing  # use module attributes: @max_size 100
defmodule MyModule do        # PascalCase for modules
  @moduledoc "Module docs go here"

  # Function names: snake_case
  # Predicate functions end with ?
  def valid?(input), do: is_binary(input) and byte_size(input) > 0

  # Dangerous/raising functions end with !
  def parse!(data) do
    case parse(data) do
      {:ok, val}   -> val
      {:error, e}  -> raise "Parse error: #{e}"
    end
  end

  # Private functions: defp
  defp internal(x), do: x * 2
end

# Spacing: 2-space indentation, spaces around operators
result = 1 + 2
list = [1, 2, 3]

# do/end for multi-line, do: for single line
def greet(name) do
  "Hello, #{name}"
end
def short(x), do: x * 2

# Trailing comma in multi-line lists/maps
config = %{
  host: "localhost",
  port: 4000,   # trailing comma OK
}

# Parentheses: required in most function definitions; optional for macros
if true do
  IO.puts "hello"   # no parens on macro-like calls
end
```

```bash
mix format              # auto-format
mix credo --strict      # lint
mix credo --config-file .credo.exs
```

## Gotchas

- `mix format` is opinionated; configure `.formatter.exs` for line length and which files to format
- Credo distinguishes consistency, design, and readability checks; configure severity per team preference
- Guard expressions are limited to a whitelist of pure BIF functions; avoid calling custom functions in `when` guards
