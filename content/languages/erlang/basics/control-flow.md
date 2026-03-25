---
title: "Control Flow"
language: "erlang"
feature: "control-flow"
category: "basics"
applicable: true
---

Erlang favors pattern matching and recursion over traditional loops. `case` expressions match a value against multiple patterns with optional guards. `if` expressions evaluate boolean guards (no pattern matching). `receive` is the primitive for process message handling. There is no `for` or `while` loop — iteration is achieved through tail-recursive functions or list comprehensions.

## Example

```erlang
-module(flow_demo).
-export([run/0, loop/1]).

classify(N) ->
    if
        N > 0  -> positive;
        N < 0  -> negative;
        true   -> zero      % 'true' acts as else
    end.

describe(Shape) ->
    case Shape of
        {circle, R}    -> {area, 3.14159 * R * R};
        {rect, W, H}   -> {area, W * H};
        _              -> unknown
    end.

%% Tail-recursive loop (replaces for/while)
loop(0) -> done;
loop(N) ->
    io:format("~p~n", [N]),
    loop(N - 1).

run() ->
    io:format("~p~n", [classify(5)]),
    io:format("~p~n", [describe({circle, 3.0})]),
    loop(3),
    %% List comprehension
    Squares = [X * X || X <- lists:seq(1, 5)],
    io:format("~p~n", [Squares]).
```

## Gotchas

- `if` branches must be exhaustive; add a `true ->` clause as a catch-all, or it crashes at runtime.
- There are no mutable loop variables; use accumulators passed through recursion.
- `case` and `if` are expressions (they return values), not statements.
