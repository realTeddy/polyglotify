---
title: "Exceptions & Try/Catch"
language: "erlang"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Erlang has three kinds of runtime errors: `throw` (intended for non-local returns), `error` (programming errors / unexpected conditions), and `exit` (process termination signals). All three are caught by `try...catch`. The idiomatic Erlang style is to use `{ok, Value}` / `{error, Reason}` tagged tuples rather than exceptions for expected failures, reserving exceptions for truly unexpected conditions.

## Example

```erlang
-module(exceptions_demo).
-export([run/0, risky/1]).

risky(0) -> error(division_by_zero);
risky(N) -> 100 div N.

run() ->
    %% try/catch
    Result = try risky(0) of
        Val -> {ok, Val}
    catch
        error:division_by_zero -> {error, division_by_zero};
        error:Reason            -> {error, Reason}
    end,
    io:format("~p~n", [Result]),

    %% catch expression (legacy, catch-all)
    R2 = catch risky(0),
    io:format("catch: ~p~n", [R2]),

    %% throw for non-local exit
    try
        throw(early_exit)
    catch
        throw:early_exit -> io:format("caught throw~n")
    end.
```

## Gotchas

- `catch Expr` returns `{'EXIT', Reason}` for errors and `Reason` for throws — its dual semantics are confusing; prefer `try/catch`.
- The "let it crash" philosophy discourages defensive `try/catch`; let supervisors restart failing processes instead.
- `erlang:error/1` attaches a stack trace; `throw/1` does not.
