---
title: "Types & Type Systems"
language: "elixir"
feature: "types"
category: "basics"
applicable: true
---

Elixir is dynamically typed and runs on the BEAM VM. Core types include integers, floats, booleans, atoms, strings (UTF-8 binaries), lists, tuples, maps, and functions. Elixir also has a gradual type system via Typespecs and Dialyzer for optional static analysis.

## Example

```elixir
# Integers (arbitrary precision)
n = 42
big = 1_000_000   # underscores for readability

# Floats
f = 3.14
scientific = 1.0e10

# Atoms (symbolic constants, like Ruby symbols)
status = :ok
error  = :error
bool_atom = true    # true and false are atoms :true and :false

# Strings (UTF-8 binary)
s = "Hello, World!"
multi = """
  Multi-line
  string
  """

# Lists (linked list)
list = [1, 2, 3]

# Tuples (fixed-size, contiguous)
point = {3, 4}
result = {:ok, "data"}

# Maps
person = %{name: "Alice", age: 30}

# Typespecs (optional, for Dialyzer)
@spec add(integer(), integer()) :: integer()
def add(a, b), do: a + b

# Check type at runtime
is_integer(42)     # true
is_binary("hello") # true
is_list([1,2,3])   # true
```

## Gotchas

- `true`, `false`, and `nil` are atoms (`:true`, `:false`, `:nil`) — this matters in pattern matching
- Strings are UTF-8 binaries (`<<...>>`), not character lists; character lists `'hello'` exist but are mainly for Erlang interop
- Integer arithmetic is arbitrary precision; there is no overflow
