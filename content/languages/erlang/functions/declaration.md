---
title: "Function Declaration"
language: "erlang"
feature: "declaration"
category: "functions"
applicable: true
---

Erlang functions are defined inside modules using the `Name(Pattern...) -> Body.` syntax. A function can have multiple clauses separated by semicolons, each matching different argument patterns or guards. Functions must be exported with `-export([name/arity, ...])` to be callable from outside the module. Arity is part of the function identity — `foo/1` and `foo/2` are distinct functions.

## Example

```erlang
-module(func_demo).
-export([factorial/1, greet/1, max/2]).

%% Multiple clauses with pattern matching
factorial(0) -> 1;
factorial(N) when N > 0 -> N * factorial(N - 1).

%% Guard clause
max(A, B) when A >= B -> A;
max(_, B) -> B.

%% Single clause
greet(Name) ->
    io:format("Hello, ~s!~n", [Name]).
```

## Gotchas

- Each clause ends with `.` (period) after the last clause, and `;` (semicolon) between clauses.
- If no clause matches, the call raises a `function_clause` error.
- Function arity is significant: `-export([foo/1, foo/2])` exports two separate functions.
- Recursive calls are optimized when in tail position (last call in the function body).
