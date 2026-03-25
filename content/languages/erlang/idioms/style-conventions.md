---
title: "Style Conventions"
language: "erlang"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Erlang style follows community conventions: `snake_case` for modules and function names, `CamelCase` for variables (required by the language), `ALL_CAPS` for macros, and lowercase atoms for constants. Lines are conventionally kept under 100 characters. `erlfmt` is the standard formatter. `-spec` annotations are encouraged for all exported functions.

## Example

```erlang
%% Module name matches filename: my_module.erl
-module(my_module).

%% Exported functions listed at the top
-export([public_function/1, another_function/2]).

%% Type and spec definitions
-type status() :: active | inactive | pending.

-spec public_function(status()) -> binary().
public_function(active)   -> <<"active">>;
public_function(inactive) -> <<"inactive">>;
public_function(_)        -> <<"unknown">>.

-spec another_function(integer(), integer()) -> {ok, integer()} | {error, atom()}.
another_function(A, B) when B =:= 0 ->
    {error, division_by_zero};
another_function(A, B) ->
    {ok, A div B}.

%% Private functions (not in -export) below public ones
internal_helper(X) -> X + 1.

%% Macros in ALL_CAPS
-define(MAX_RETRIES, 3).
-define(DEFAULT_TIMEOUT, 5000).
```

## Gotchas

- Module filenames and `-module(...)` declarations must match exactly.
- `erlfmt` is the recommended formatter; run `rebar3 fmt` to apply it.
- Keep function clauses for the same function together; separate different functions with a blank line.
- Document public APIs with `-spec` and EDoc comments (`%% @doc`) for tooling support.
