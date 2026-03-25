---
title: "Build Tools"
language: "erlang"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

The primary build tool for modern Erlang is **Rebar3**, which manages compilation, dependencies (via Hex), testing, releases, and plugins. **Erlang.mk** is a Makefile-based alternative popular in some projects. The BEAM compiler (`erlc`) can be used directly for simple cases. Rebar3 supports profiles (dev, test, prod) and OTP release packaging.

## Example

```bash
# Create a new OTP application
rebar3 new app my_app

# Create a release project
rebar3 new release my_release

# Compile
rebar3 compile

# Run EUnit tests
rebar3 eunit

# Run Common Test suites
rebar3 ct

# Run Dialyzer static analysis
rebar3 dialyzer

# Build an OTP release (self-contained deployable)
rebar3 release

# Start a release
./_build/default/rel/my_app/bin/my_app start

# Interactive shell
rebar3 shell

# Clean build artifacts
rebar3 clean
```

```erlang
%% rebar.config — build profiles
{profiles, [
    {prod, [
        {erl_opts, [no_debug_info]},
        {relx, [{dev_mode, false}, {include_erts, true}]}
    ]},
    {test, [
        {erl_opts, [debug_info]},
        {deps, [{meck, "0.9.2"}]}
    ]}
]}.
```

## Gotchas

- Rebar3 stores compiled artifacts in `_build/`; never commit this directory.
- The `relx` tool (bundled with Rebar3) creates self-contained OTP releases including ERTS.
- Hot upgrades require `appup` files; plan for them in long-running production systems.
