---
title: "Build Tools"
language: "elixir"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

**Mix** is Elixir's built-in all-in-one build tool: it compiles code, runs tasks, manages dependencies, runs tests, and generates releases. **Releases** (via `mix release`) package the application with the BEAM runtime for deployment without needing Elixir installed.

## Example

```bash
# Common Mix tasks
mix compile                    # compile the project
mix run                        # run the application
mix run --no-halt              # run without stopping (for servers)
mix iex -S mix                 # IEx REPL with project loaded
mix test                       # run tests
mix format                     # auto-format code
mix credo                      # static analysis
mix dialyzer                   # type checking (requires dialyxir)
mix docs                       # generate HTML docs (requires ex_doc)

# Custom Mix task
# lib/mix/tasks/greet.ex
defmodule Mix.Tasks.Greet do
  use Mix.Task
  @shortdoc "Prints a greeting"

  def run(args) do
    name = List.first(args) || "World"
    Mix.shell().info("Hello, #{name}!")
  end
end
# Usage: mix greet Alice

# Release (production deployment)
MIX_ENV=prod mix release
# Creates _build/prod/rel/my_app/

# Start the release
_build/prod/rel/my_app/bin/my_app start
_build/prod/rel/my_app/bin/my_app daemon   # background
_build/prod/rel/my_app/bin/my_app remote   # attach IEx

# Umbrella projects (monorepo)
mix new my_umbrella --umbrella
cd my_umbrella/apps
mix new api
mix new worker
```

## Gotchas

- `MIX_ENV` controls which config files are loaded; default is `:dev`, but always build releases with `MIX_ENV=prod`
- `mix format` uses `.formatter.exs` for configuration; integrate it in CI to enforce consistent formatting
- Releases include the BEAM VM but not Elixir source; hot code upgrades require careful planning with `appup` files
