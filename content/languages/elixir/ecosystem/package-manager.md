---
title: "Package Manager"
language: "elixir"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

**Mix** is Elixir's built-in build tool and package manager. Dependencies are fetched from **Hex.pm** (the Elixir/Erlang package repository). `mix.exs` is the project manifest; `mix.lock` pins exact versions for reproducibility.

## Example

```bash
# Create a new Mix project
mix new my_app
mix new my_app --sup   # with OTP supervision tree

# Install dependencies
mix deps.get

# Update dependencies
mix deps.update --all
mix deps.update some_dep

# List dependencies
mix deps

# Clean build artefacts
mix deps.clean --all

# Add to Hex registry
mix hex.publish
```

```elixir
# mix.exs
defmodule MyApp.MixProject do
  use Mix.Project

  def project do
    [
      app: :my_app,
      version: "0.1.0",
      elixir: "~> 1.16",
      deps: deps()
    ]
  end

  def application do
    [extra_applications: [:logger]]
  end

  defp deps do
    [
      {:jason, "~> 1.4"},          # JSON library
      {:httpoison, "~> 2.0"},      # HTTP client
      {:ecto, "~> 3.11"},          # database
      {:ex_doc, "~> 0.31", only: :dev, runtime: false},
      {:credo, "~> 1.7", only: [:dev, :test], runtime: false}
    ]
  end
end
```

## Gotchas

- Version requirements use `~>` (pessimistic) for minor: `~> 1.4` means `>= 1.4.0 and < 2.0.0`; `~> 1.4.1` means `>= 1.4.1 and < 1.5.0`
- Always commit `mix.lock` to version control for reproducible builds
- `:only` restricts a dependency to specific Mix environments (`:dev`, `:test`, `:prod`)
