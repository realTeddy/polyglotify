---
title: "Maps & Dictionaries"
language: "erlang"
feature: "maps"
category: "data-structures"
applicable: true
---

Erlang maps (introduced in OTP 17) are immutable key-value stores with any-type keys. The `maps` module provides `get/2`, `put/3`, `update/3`, `remove/2`, `keys/1`, `values/1`, and more. Map literal syntax is `#{Key => Value}`. Pattern matching on maps extracts values by key.

## Example

```erlang
-module(maps_demo).
-export([run/0]).

run() ->
    %% Create
    M = #{name => "Alice", age => 30, active => true},

    %% Access
    Name = maps:get(name, M),
    Age  = maps:get(age, M, undefined),   % with default
    io:format("~s is ~p~n", [Name, Age]),

    %% Update (returns new map)
    M2 = M#{age => 31},
    M3 = maps:put(city, "NYC", M2),

    %% Pattern match
    #{name := N, age := A} = M3,
    io:format("~s, ~p~n", [N, A]),

    %% Iterate
    maps:foreach(fun(K, V) ->
        io:format("~p: ~p~n", [K, V])
    end, M3),

    %% Remove
    M4 = maps:remove(active, M3),
    io:format("Keys: ~p~n", [maps:keys(M4)]).
```

## Gotchas

- Use `=>` in map construction and `maps:put/3`; use `:=` in pattern matching to require the key to exist.
- `maps:get/2` raises `{badkey, Key}` if the key is missing; use `maps:get/3` with a default to be safe.
- Maps are unordered; iteration order is not guaranteed.
