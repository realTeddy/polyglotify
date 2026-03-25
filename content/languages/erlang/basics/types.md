---
title: "Types & Type Systems"
language: "erlang"
feature: "types"
category: "basics"
applicable: true
---

Erlang is dynamically typed. The core types are integers (arbitrary precision), floats, atoms, booleans (which are the atoms `true`/`false`), binaries, lists, tuples, maps, PIDs, references, and funs (anonymous functions). Dialyzer can perform optional static analysis using `-spec` type annotations and the Typer tool.

## Example

```erlang
-module(types_demo).
-export([run/0]).

-spec add(integer(), integer()) -> integer().
add(A, B) -> A + B.

run() ->
    Integer  = 42,
    BigInt   = 123456789012345678901234567890,
    Float    = 3.14,
    Atom     = hello,
    Bool     = true,
    Str      = "hello",        % a list of integers in Erlang
    Binary   = <<"hello">>,    % binary string — more efficient
    List     = [1, 2, 3],
    Tuple    = {ok, 42},
    Map      = #{key => value},

    io:format("~p ~p ~p ~p ~p~n", [Integer, Float, Atom, Bool, Tuple]),
    io:format("add/2: ~p~n", [add(1, 2)]).
```

## Gotchas

- Strings (`"..."`) are lists of integer code points, which surprises newcomers; prefer binaries (`<<"...">>`) for text.
- There are no implicit type conversions; use functions like `integer_to_list/1` or `list_to_binary/1`.
- Dialyzer performs success typing — it finds code that *cannot* work, but won't verify all type-correctness.
