---
title: "Project Structure"
language: "erlang"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

An Erlang/OTP project follows a well-defined directory layout. The `src/` directory contains the source files including the application resource file (`.app.src`). `include/` holds shared header files (`.hrl`). `test/` contains EUnit or Common Test suites. `priv/` holds static assets and native libraries.

## Example

```
my_app/
├── rebar.config          # Build tool configuration
├── rebar.lock            # Locked dependency versions
├── src/
│   ├── my_app.app.src    # OTP application resource file
│   ├── my_app_app.erl    # Application callback
│   ├── my_app_sup.erl    # Top-level supervisor
│   └── my_worker.erl     # Worker module(s)
├── include/
│   └── my_app.hrl        # Shared record/macro definitions
├── test/
│   ├── my_worker_tests.erl   # EUnit tests
│   └── my_SUITE.erl          # Common Test suite
└── priv/
    └── static/           # Static files, NIFs, etc.
```

```erlang
%% src/my_app.app.src
{application, my_app, [
    {description, "My OTP Application"},
    {vsn, "0.1.0"},
    {registered, []},
    {mod, {my_app_app, []}},
    {applications, [kernel, stdlib]},
    {env, []},
    {modules, []}
]}.
```

## Gotchas

- Every OTP application needs an `.app.src` file; rebar3 generates the `.app` from it at compile time.
- Module names must match filenames exactly (`my_module.erl` defines `-module(my_module)`).
- Hot code reloading requires careful version management of the `.app` file.
