---
title: "Variables & Declaration"
language: "erlang"
feature: "variables"
category: "basics"
applicable: true
---

Erlang variables are single-assignment and must start with an uppercase letter or underscore. Once bound, a variable cannot be rebound — attempting to do so either pattern-matches (if the new value equals the existing one) or raises a `badmatch` error. The underscore `_` is the anonymous variable that discards a value without binding it.

## Example

```erlang
-module(vars_demo).
-export([run/0]).

run() ->
    Name = "Alice",        % bound, cannot be changed
    Age  = 30,
    _Ignored = some_value, % _ prefix: intentionally unused

    %% Pattern match — succeeds only if Name is still "Alice"
    Name = "Alice",

    io:format("~s is ~p years old~n", [Name, Age]).
```

## Gotchas

- Variables start with uppercase or `_`; lowercase names are atoms, not variables.
- Rebinding a variable to a *different* value is a runtime `badmatch` error, not a compile error.
- Use `_VarName` (underscore prefix) to suppress unused-variable warnings while keeping a meaningful name.
