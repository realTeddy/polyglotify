---
title: "Return Values"
language: "erlang"
feature: "return-values"
category: "functions"
applicable: true
---

Every Erlang expression, including every function body, has a value. The value of the last expression in a function body is automatically returned — there is no `return` keyword. Functions conventionally return tagged tuples like `{ok, Value}` or `{error, Reason}` to communicate success or failure, enabling pattern matching at the call site.

## Example

```erlang
-module(return_demo).
-export([safe_divide/2, run/0]).

%% Returning tagged tuples
safe_divide(_, 0) -> {error, division_by_zero};
safe_divide(A, B) -> {ok, A / B}.

run() ->
    case safe_divide(10, 2) of
        {ok, Result}  -> io:format("Result: ~p~n", [Result]);
        {error, Why}  -> io:format("Error: ~p~n", [Why])
    end,
    case safe_divide(10, 0) of
        {ok, Result2}  -> io:format("Result: ~p~n", [Result2]);
        {error, Why2}  -> io:format("Error: ~p~n", [Why2])
    end.
```

## Gotchas

- There is no explicit `return`; the last expression value is the return value.
- Multiple return paths are expressed with multiple function clauses or `case` expressions.
- The `{ok, Value}` / `{error, Reason}` convention is idiomatic and used throughout OTP; follow it.
