---
title: "Inheritance"
language: "elixir"
feature: "inheritance"
category: "oop"
applicable: false
---

Elixir has no class inheritance. Code reuse is achieved through **module composition**, **use** (which injects code via macros), and **behaviours** (interface contracts with default implementations). This deliberate design avoids the fragile base-class problem.

## Example

```elixir
# use: inject code from another module (like a mixin)
defmodule Greetable do
  defmacro __using__(_opts) do
    quote do
      def greet(name), do: "Hello, #{name}, from #{__MODULE__}!"
      defoverridable greet: 1   # allow submodules to override
    end
  end
end

defmodule SpanishGreeter do
  use Greetable

  # Override the injected function
  def greet(name), do: "Hola, #{name}!"
end

defmodule DefaultGreeter do
  use Greetable
  # Inherits greet/1 as-is
end

IO.puts SpanishGreeter.greet("Ana")       # Hola, Ana!
IO.puts DefaultGreeter.greet("Alice")     # Hello, Alice, from DefaultGreeter!

# Delegation via explicit function calls
defmodule Animal do
  defstruct name: ""
  def speak(%Animal{name: n}), do: "#{n} makes a sound"
end

defmodule Dog do
  defstruct animal: %Animal{}, breed: ""

  def speak(%Dog{animal: a}), do: Animal.speak(a) <> " (woof!)"
end

dog = %Dog{animal: %Animal{name: "Rex"}, breed: "Lab"}
IO.puts Dog.speak(dog)
```

## Gotchas

- `use` injects code at **compile time** via macros; changes to the used module require recompilation of all modules that `use` it
- `defoverridable` must be explicitly declared to allow overriding injected functions
- Prefer composition over `use`-based "inheritance" for most cases; reserve `use` for framework integration (GenServer, etc.)
