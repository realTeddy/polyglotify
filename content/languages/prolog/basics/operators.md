---
title: "Operators"
language: "prolog"
feature: "operators"
category: "basics"
applicable: true
---

Prolog operators are syntactic sugar for compound terms. Arithmetic operators (`+`, `-`, `*`, `/`, `mod`) are evaluated only when passed to `is/2`. Comparison operators (`<`, `>`, `=<`, `>=`, `=:=`, `=\=`) evaluate both sides arithmetically. Unification uses `=`; `==` tests structural equality without unification.

## Example

```prolog
:- initialization(main, main).

main :-
    % Arithmetic — requires 'is' to evaluate
    X is 3 + 4 * 2,      % X = 11 (standard precedence)
    Y is 10 mod 3,        % Y = 1
    Z is sqrt(16.0),      % Z = 4.0
    format("~w ~w ~w~n", [X, Y, Z]),

    % Arithmetic comparison (evaluates both sides)
    ( 5 > 3  -> write(gt) ; true ), nl,
    ( 5 =:= 5.0 -> write(equal) ; true ), nl,   % arithmetic equality
    ( 5 =\= 6   -> write(neq) ; true ), nl,

    % Unification
    A = B,       % unify A and B (both unbound -> they share)
    A = hello,
    write(B), nl,   % hello

    % Structural equality (no binding)
    ( hello == hello -> write(same) ; true ), nl,
    ( X == Y -> write(same2) ; write(diff) ), nl,

    % Structural inequality
    ( foo \= bar -> write(diff_terms) ; true ), nl,

    % Bitwise (integer only)
    V is 0b1010 /\ 0b1100,   % AND = 8
    W is 0b1010 \/ 0b1100,   % OR  = 14
    write(V), write(' '), write(W), nl.
```

## Gotchas

- `X = 3 + 4` does NOT evaluate — X is bound to the compound term `+(3,4)`. Use `X is 3 + 4` to evaluate.
- `=:=` compares arithmetic values; `==` compares terms structurally; `=` performs unification.
- `=<` is "less than or equal" (not `<=` as in most languages).
- Prolog operators are user-definable with `op/3`, which is powerful but can make code hard to read.
