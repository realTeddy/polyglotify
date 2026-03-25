---
title: "Generics"
language: "erlang"
feature: "generics"
category: "oop"
applicable: false
---

Erlang has no compile-time generics or type parameters. Because Erlang is dynamically typed, functions naturally operate on values of any type — the equivalent of generics is achieved simply by writing polymorphic functions. Dialyzer type specs support type variables (e.g., `-spec map(fun((A) -> B), [A]) -> [B]`) for documentation and analysis.

## Example

```erlang
%% Functions are inherently polymorphic — no generics needed
-module(generics_demo).
-export([identity/1, pair/2, fst/1, snd/1]).

%% Works with any type
-spec identity(A) -> A.
identity(X) -> X.

%% Pair of any two types
-spec pair(A, B) -> {A, B}.
pair(A, B) -> {A, B}.

-spec fst({A, _}) -> A.
fst({A, _}) -> A.

-spec snd({_, B}) -> B.
snd({_, B}) -> B.

%% Usage
%% identity(42)        => 42
%% identity("hello")   => "hello"
%% pair(1, <<"text">>) => {1, <<"text">>}
```

## Gotchas

- Type safety is not enforced at runtime for type-variable specs; Dialyzer provides static analysis only.
- Dynamic typing means runtime type errors appear as `badarg` or `function_clause` exceptions.
- For type-safe containers, prefer wrapping data in tagged tuples and validating at module boundaries.
