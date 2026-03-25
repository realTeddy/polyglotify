---
title: "Types & Type Systems"
language: "prolog"
feature: "types"
category: "basics"
applicable: true
---

Prolog is dynamically typed. The universe of Prolog terms consists of: **atoms** (lowercase identifiers or quoted strings), **numbers** (integers and floats), **variables** (uppercase), **compound terms** (`functor(args...)`), and **lists** (syntactic sugar for compound terms). There are no user-defined nominal types — structure is conveyed through term shapes.

## Example

```prolog
:- initialization(main, main).

main :-
    % Atoms
    A = hello,
    B = 'Hello World',    % quoted atom (contains space/uppercase)
    C = [],               % empty list (an atom)

    % Numbers
    N = 42,
    F = 3.14,

    % Compound terms (functor/arity)
    P = point(1.0, 2.0),    % compound: point/2
    D = date(2024, 1, 15),  % compound: date/3

    % Lists (syntactic sugar for ./2 compound)
    L = [1, 2, 3],
    [H | T] = L,            % H=1, T=[2,3]

    % Type checking
    (atom(hello) -> write(atom) ; true), nl,
    (integer(42) -> write(integer) ; true), nl,
    (is_list(L)  -> write(list) ; true), nl,
    (compound(P) -> write(compound) ; true), nl,

    % functor/3 inspects a term
    functor(P, Name, Arity),
    format("~w/~w~n", [Name, Arity]).   % point/2
```

## Gotchas

- Strings in double quotes `"hello"` are a list of character codes in classic Prolog (SWI-Prolog can make them atoms with a flag).
- Single-quoted `'Hello'` is an atom; `Hello` is a variable.
- There is no type system — wrong term shapes cause unification failure or type errors at runtime.
- Prolog's "types" are determined structurally at runtime with predicates like `atom/1`, `number/1`, `compound/1`.
