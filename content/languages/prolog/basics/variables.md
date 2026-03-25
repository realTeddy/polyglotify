---
title: "Variables & Declaration"
language: "prolog"
feature: "variables"
category: "basics"
applicable: true
---

Prolog variables are logical variables — they are either unbound (free) or bound to a value (unified). Once bound, they cannot be rebound within the same computation path (single-assignment). Variables start with an uppercase letter or `_`. The anonymous variable `_` matches anything and is never bound. There is no explicit declaration syntax.

## Example

```prolog
% Variables start with uppercase or _
% Anonymous variable: _

:- initialization(main, main).

main :-
    % Unification (not assignment)
    X = 42,          % X is unified with 42
    Y = hello,       % Y is unified with the atom 'hello'
    Z = [1, 2, 3],   % Z is unified with a list

    % X = 99 would FAIL here — X is already bound

    write(X), nl,
    write(Y), nl,
    write(Z), nl,

    % Anonymous variable — matches but is not bound
    foo(_, B),       % don't care about first arg
    write(B), nl.

foo(ignored, found).

% In a clause, variables are local to that clause
greet(Name) :-
    format("Hello, ~w!~n", [Name]).
```

## Gotchas

- Variables are NOT mutable — `X = 1, X = 2` fails (it tries to unify 1 and 2, which fails).
- Variables that appear only once in a clause should use `_` (or `_Name` for documentation) — most Prolog systems warn about singleton variables.
- All variables in a clause are automatically local to that clause.
- The anonymous variable `_` is distinct for each occurrence — two `_` in the same clause do not need to match.
