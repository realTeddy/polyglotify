---
title: "Closures & Lambdas"
language: "erlang"
feature: "closures"
category: "functions"
applicable: true
---

Erlang has anonymous functions (funs) that close over variables in their enclosing scope. Funs are created with the `fun(...) -> ... end` syntax and are first-class values. They can be passed to higher-order functions like `lists:map/2`, `lists:filter/2`, or stored in variables. Named funs allow recursion within the anonymous function.

## Example

```erlang
-module(closure_demo).
-export([run/0]).

run() ->
    %% Simple lambda
    Square = fun(X) -> X * X end,
    io:format("~p~n", [Square(5)]),

    %% Closure capturing a variable
    Factor = 3,
    Multiply = fun(X) -> X * Factor end,
    io:format("~p~n", [Multiply(7)]),

    %% Higher-order usage
    Numbers = [1, 2, 3, 4, 5],
    Squared = lists:map(fun(X) -> X * X end, Numbers),
    Evens   = lists:filter(fun(X) -> X rem 2 =:= 0 end, Numbers),
    io:format("Squared: ~p~n", [Squared]),
    io:format("Evens: ~p~n", [Evens]),

    %% Named fun for recursion
    Fact = fun F(0) -> 1; F(N) -> N * F(N-1) end,
    io:format("5! = ~p~n", [Fact(5)]).
```

## Gotchas

- Funs capture the *value* of variables at creation time (immutable), not a reference to a mutable cell.
- Named funs (`fun F(...) -> ...`) allow self-recursion but `F` is not visible outside the fun.
- A fun's arity matters: `fun(X) -> X end` is different from `fun(X, Y) -> X + Y end`.
