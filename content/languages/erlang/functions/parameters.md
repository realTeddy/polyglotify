---
title: "Parameters & Arguments"
language: "erlang"
feature: "parameters"
category: "functions"
applicable: true
---

Erlang function parameters are matched via pattern matching, not just named bindings. A parameter can be a literal, a tuple, a list, a variable, or any nested structure. Guards (`when`) add boolean conditions on top of patterns. There are no default parameters, keyword arguments, or variadic functions — use multiple clauses or option lists (property lists or maps) for flexibility.

## Example

```erlang
-module(params_demo).
-export([head/1, describe/1, connect/1]).

%% Destructuring in parameters
head([H | _]) -> H.

%% Pattern matching on tuple parameters
describe({ok, Value})    -> {success, Value};
describe({error, Reason}) -> {failure, Reason}.

%% Options map pattern (simulating keyword args)
connect(#{host := H, port := P}) ->
    io:format("Connecting to ~s:~p~n", [H, P]);
connect(#{host := H}) ->
    io:format("Connecting to ~s:80~n", [H]).
```

## Gotchas

- Parameters are matched left-to-right, top clause first; the first matching clause wins.
- Using the same variable name twice in a clause head enforces equality: `equal(X, X) -> true` matches only when both arguments are identical.
- There are no default values; simulate them with overloaded arities or option maps.
