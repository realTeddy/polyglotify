---
title: "Result Types"
language: "erlang"
feature: "result-types"
category: "error-handling"
applicable: true
---

Erlang's idiomatic error handling uses tagged tuples `{ok, Value}` and `{error, Reason}` as informal result types. This pattern is universally used throughout OTP and the standard library. There is no dedicated `Result` type, but the convention is so pervasive that it functions as one. Pattern matching at call sites forces explicit handling of both outcomes.

## Example

```erlang
-module(result_demo).
-export([read_config/1, process/1, run/0]).

read_config(Path) ->
    case file:read_file(Path) of
        {ok, Data}     -> {ok, Data};
        {error, enoent} -> {error, file_not_found};
        {error, Reason} -> {error, Reason}
    end.

process(Path) ->
    case read_config(Path) of
        {ok, Data}    ->
            Len = byte_size(Data),
            {ok, Len};
        {error, _} = Err ->
            Err   % propagate the error
    end.

run() ->
    case process("/etc/hosts") of
        {ok, Len}    -> io:format("Size: ~p bytes~n", [Len]);
        {error, Why} -> io:format("Failed: ~p~n", [Why])
    end.
```

## Gotchas

- There is no compiler-enforced exhaustive handling; a missing `{error, _}` clause silently fails at runtime.
- The `{error, Reason}` atom for Reason can be any term; document your error reasons.
- Libraries like `parse_trans` or Elixir's `with` construct (unavailable in Erlang) help flatten nested `case` chains.
