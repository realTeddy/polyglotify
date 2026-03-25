---
title: "Testing"
language: "erlang"
feature: "testing"
category: "ecosystem"
applicable: true
---

Erlang has two built-in test frameworks: **EUnit** for unit tests (inline or in separate files) and **Common Test** for integration and system tests. EUnit tests are simple functions ending with `_test` or `_test_()` returning test objects. PropEr and QuickCheck provide property-based testing. Run tests with `rebar3 eunit` or `rebar3 ct`.

## Example

```erlang
-module(math_utils).
-export([factorial/1, clamp/3]).

-ifdef(TEST).
-include_lib("eunit/include/eunit.hrl").
-endif.

factorial(0) -> 1;
factorial(N) when N > 0 -> N * factorial(N - 1).

clamp(V, Min, _Max) when V < Min -> Min;
clamp(V, _Min, Max) when V > Max -> Max;
clamp(V, _Min, _Max) -> V.

-ifdef(TEST).

factorial_test_() ->
    [
        ?_assertEqual(1,   factorial(0)),
        ?_assertEqual(1,   factorial(1)),
        ?_assertEqual(120, factorial(5)),
        ?_assertError(function_clause, factorial(-1))
    ].

clamp_test_() ->
    [
        ?_assertEqual(0,  clamp(-5, 0, 10)),
        ?_assertEqual(10, clamp(15, 0, 10)),
        ?_assertEqual(5,  clamp(5,  0, 10))
    ].

-endif.
```

## Gotchas

- EUnit tests embedded in source files are compiled only when `TEST` macro is defined.
- Use `?_assert*` (lazy form, with `_` prefix) inside test generator lists for better error reporting.
- Common Test is preferred for stateful integration tests; EUnit for pure unit tests.
