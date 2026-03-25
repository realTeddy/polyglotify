---
title: "Package Manager"
language: "erlang"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Erlang's package manager is **Hex** (shared with Elixir) accessed via the **Rebar3** build tool. Rebar3 handles dependency fetching, compilation, testing, and releases. Dependencies are declared in `rebar.config`. Alternatively, **Erlang.mk** (Makefile-based) is used in some projects.

## Example

```erlang
%% rebar.config
{erl_opts, [debug_info]}.

{deps, [
    {cowboy, "2.10.0"},        %% HTTP server
    {jsx,    "3.1.0"},         %% JSON library
    {hackney, "1.18.2"}        %% HTTP client
]}.

{shell, [
    {apps, [my_app]}
]}.
```

```bash
# Initialize a new project
rebar3 new app my_app
cd my_app

# Fetch and compile dependencies
rebar3 deps
rebar3 compile

# Run tests
rebar3 eunit
rebar3 ct

# Start an interactive shell with the app loaded
rebar3 shell

# Build a release
rebar3 release
```

## Gotchas

- Hex packages are hosted at hex.pm; use `rebar3 search <name>` to find packages.
- Lock files (`rebar.lock`) pin exact dependency versions; commit them to version control.
- OTP applications inside `_build/` are isolated per profile (default, test, prod).
