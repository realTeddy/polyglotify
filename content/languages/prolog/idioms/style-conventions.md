---
title: "Style Conventions"
language: "prolog"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Prolog naming uses `snake_case` for predicates and atoms, `CamelCase` or `UpperCase` for variables (required by the language). Predicate names should be descriptive and reflect the relationship being expressed. Module declarations are recommended for all reusable code. One clause per predicate variant, separated by blank lines.

## Example

```prolog
% Style conventions for SWI-Prolog

:- module(style_demo, [process_items/2, valid_email/1]).

% Module-level declarations
:- use_module(library(lists)).
:- use_module(library(pcre)).

% Constants as facts (atoms or terms)
max_retries(3).
default_timeout(30).

% Predicate documentation comment
%% process_items(+Items, -Results) is det.
%
% Process a list of Items and return Results.
% Each Item is transformed by transform/2.
process_items([], []).
process_items([Item|Rest], [Result|Results]) :-
    transform(Item, Result),
    process_items(Rest, Results).

% Guard pattern (test before doing)
transform(Item, Result) :-
    must_be(atom, Item),             % type check
    atom_string(Item, Str),
    string_upper(Str, Result).

% Boolean predicate (succeeds or fails, no output arg)
valid_email(Email) :-
    atom(Email),
    atom_concat(_, '@', Email).      % simplified check

% Use -> for if-then-else, keep it readable
classify_number(N, Class) :-
    ( N > 0  -> Class = positive
    ; N =:= 0 -> Class = zero
    ;            Class = negative
    ).
```

## Gotchas

- Variable names must start with uppercase or `_`. Single-letter variables (`X`, `Y`, `N`) are fine for mathematical predicates but use descriptive names (`UserName`, `ItemList`) in application code.
- Keep clauses short — if a clause body has more than 5-7 goals, consider splitting it.
- Use `must_be/2` (from `library(error)`) for runtime type checking in public APIs.
- Document predicate modes with `+` (input), `-` (output), `?` (either), `@` (not further instantiated) in comments.
