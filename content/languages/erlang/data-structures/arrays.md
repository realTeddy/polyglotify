---
title: "Arrays & Lists"
language: "erlang"
feature: "arrays"
category: "data-structures"
applicable: true
---

Erlang's primary sequential data structure is the singly-linked list, written `[H | T]`. Lists are immutable and efficient for prepend and pattern-matching but O(n) for random access. The `lists` module provides a rich set of functions. For true O(1) indexed access, the `array` module provides a functional array. Binaries are used for efficient byte sequences.

## Example

```erlang
-module(lists_demo).
-export([run/0]).

run() ->
    L = [1, 2, 3, 4, 5],

    %% Destructuring
    [Head | Tail] = L,
    io:format("Head: ~p, Tail: ~p~n", [Head, Tail]),

    %% Common list operations
    Len     = length(L),
    Rev     = lists:reverse(L),
    Mapped  = lists:map(fun(X) -> X * 2 end, L),
    Filtered = lists:filter(fun(X) -> X > 2 end, L),
    Sum     = lists:foldl(fun(X, Acc) -> X + Acc end, 0, L),

    io:format("Length: ~p~n", [Len]),
    io:format("Reversed: ~p~n", [Rev]),
    io:format("Doubled: ~p~n", [Mapped]),
    io:format("Filtered: ~p~n", [Filtered]),
    io:format("Sum: ~p~n", [Sum]),

    %% List comprehension
    Squares = [X*X || X <- L, X rem 2 =:= 0],
    io:format("Even squares: ~p~n", [Squares]).
```

## Gotchas

- Accessing the Nth element with `lists:nth/2` is O(n); use `array` or `tuple` for O(1) indexed access.
- Appending to the end of a list (`L ++ [X]`) is O(n); prepend (`[X | L]`) is O(1).
- Strings are lists of integers; `"abc"` and `[97, 98, 99]` are identical.
