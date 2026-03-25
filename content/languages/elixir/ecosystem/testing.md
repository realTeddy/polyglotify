---
title: "Testing"
language: "elixir"
feature: "testing"
category: "ecosystem"
applicable: true
---

**ExUnit** is Elixir's built-in test framework — no additional dependencies needed. It provides `assert`, `refute`, `assert_raise`, doctests, and async test support. **Mox** is the standard mocking library.

## Example

```elixir
# test/my_app/math_test.exs
defmodule MyApp.MathTest do
  use ExUnit.Case, async: true   # async: true = parallel with other async tests

  # Basic assertions
  test "add two numbers" do
    assert MyApp.Math.add(2, 3) == 5
  end

  test "divide returns float" do
    assert_in_delta MyApp.Math.divide(10, 3), 3.333, 0.001
  end

  # Test exceptions
  test "divide by zero raises" do
    assert_raise ArgumentError, "division by zero", fn ->
      MyApp.Math.divide!(10, 0)
    end
  end

  # Pattern match in assert
  test "safe divide returns ok tuple" do
    assert {:ok, 5.0} = MyApp.Math.safe_divide(10, 2)
  end

  # Setup and context
  setup do
    user = %{name: "Alice", age: 30}
    {:ok, user: user}   # context passed to each test
  end

  test "greet user", %{user: user} do
    assert MyApp.greet(user) =~ "Alice"
  end
end

# Doctests (run code examples in @doc)
defmodule MyApp.Math do
  @doc """
  Adds two numbers.

      iex> MyApp.Math.add(1, 2)
      3
  """
  def add(a, b), do: a + b
end

defmodule MyApp.MathDocTest do
  use ExUnit.Case
  doctest MyApp.Math
end
```

```bash
mix test                        # run all tests
mix test test/my_app/math_test.exs  # specific file
mix test --only integration     # tagged tests
mix test --cover                # with coverage
```

## Gotchas

- `async: true` runs test cases concurrently with other async cases; never use it if tests share global state (database, ETS tables)
- `assert` pattern-matches on the left side; `assert {:ok, val} = result` is idiomatic
- Use `ExUnit.Callbacks.setup_all/1` for expensive setup that is shared across all tests in a module
