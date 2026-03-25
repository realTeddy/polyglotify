---
title: "Tuples"
language: "erlang"
feature: "tuples"
category: "data-structures"
applicable: true
---

Tuples are fixed-size, ordered collections of any types, written `{Elem1, Elem2, ...}`. They are the backbone of Erlang's tagged-value convention: `{ok, Value}`, `{error, Reason}`, `{Name, Age, Email}`. Element access is via pattern matching or `element/2` (1-indexed). Unlike lists, tuples have O(1) element access.

## Example

```erlang
-module(tuples_demo).
-export([run/0]).

-type point() :: {float(), float()}.
-type result(T) :: {ok, T} | {error, atom()}.

distance({X1, Y1}, {X2, Y2}) ->
    math:sqrt(math:pow(X2-X1, 2) + math:pow(Y2-Y1, 2)).

lookup(Key, Map) ->
    case maps:find(Key, Map) of
        {ok, Val}  -> {ok, Val};
        error      -> {error, not_found}
    end.

run() ->
    P1 = {0.0, 0.0},
    P2 = {3.0, 4.0},
    io:format("Distance: ~p~n", [distance(P1, P2)]),

    %% Destructuring
    {X, Y} = P1,
    io:format("X=~p Y=~p~n", [X, Y]),

    %% element/2 (1-indexed)
    T = {a, b, c, d},
    io:format("3rd: ~p~n", [element(3, T)]),

    %% Tagged tuple pattern
    M = #{name => "Bob"},
    case lookup(name, M) of
        {ok, Name}     -> io:format("Found: ~s~n", [Name]);
        {error, Why}   -> io:format("Error: ~p~n", [Why])
    end.
```

## Gotchas

- Tuples are 1-indexed when using `element/2` and `setelement/3`.
- Tuples are stored contiguously on the heap; very large tuples are inefficient to update (a copy is made for each `setelement/3` call).
- `setelement/3` returns a new tuple; it does not mutate in place.
