---
title: "Operators"
language: "erlang"
feature: "operators"
category: "basics"
applicable: true
---

Erlang provides arithmetic (`+`, `-`, `*`, `/`, `div`, `rem`), comparison (`==`, `/=`, `=:=`, `=/=`, `<`, `>`, `=<`, `>=`), logical (`and`, `or`, `not`, `xor` and short-circuit `andalso`, `orelse`), and bitwise (`band`, `bor`, `bxor`, `bnot`, `bsl`, `bsr`) operators. The `=` operator is pattern matching, not assignment. `=:=` tests both value and type equality.

## Example

```erlang
-module(ops_demo).
-export([run/0]).

run() ->
    %% Arithmetic
    io:format("~p~n", [10 + 3]),    % 13
    io:format("~p~n", [10 div 3]),  % 3  (integer division)
    io:format("~p~n", [10 rem 3]),  % 1  (remainder)
    io:format("~p~n", [10 / 3]),    % 3.3333... (float division)

    %% Comparison — value equality vs. exact equality
    io:format("~p~n", [1 == 1.0]),   % true  (value equal)
    io:format("~p~n", [1 =:= 1.0]),  % false (different types)
    io:format("~p~n", [1 =/= 1.0]),  % true

    %% Short-circuit logical
    X = 5,
    Result = (X > 0) andalso (10 div X > 1),
    io:format("~p~n", [Result]).
```

## Gotchas

- `=<` is "less than or equal" (not `<=` as in most languages).
- `/=` is "not equal" (not `!=`).
- `=:=` and `=/=` compare value *and* type; prefer them over `==` and `/=` when type matters.
- `and`/`or` evaluate both sides; use `andalso`/`orelse` to short-circuit.
