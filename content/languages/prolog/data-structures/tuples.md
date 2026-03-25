---
title: "Tuples"
language: "prolog"
feature: "tuples"
category: "data-structures"
applicable: true
---

Prolog does not have a distinct tuple type, but **compound terms** serve this role. A compound term like `point(1, 2)` or `pair(Name, Value)` is effectively a typed tuple. The infix `-` operator is commonly used for key-value pairs. Small lists like `[A, B]` also work as ad-hoc tuples.

## Example

```prolog
:- initialization(main, main).

% Compound terms as tuples
point(1.0, 2.0).         % a fact — like a 2-tuple

% Using functor - the conventional pair notation
pair_demo :-
    Pair = key-value,    % sugar for -( key, value)
    Pair = K-V,
    format("key=~w, val=~w~n", [K, V]).

% Named tuples via compound terms
person(Name, Age, Email) :-
    format("~w, age ~w, ~w~n", [Name, Age, Email]).

% Pattern matching on tuples
first(pair(X, _), X).
second(pair(_, Y), Y).

swap(pair(A, B), pair(B, A)).

% Using in structures
:- initialization(main, main).
main :-
    pair_demo,
    person('Alice', 30, 'alice@example.com'),

    P = pair(hello, world),
    first(P, F),
    write(F), nl,   % hello

    swap(P, SP),
    write(SP), nl,  % pair(world,hello)

    % Unpack a compound term
    T = date(2024, 3, 15),
    T =.. [Functor | Args],
    format("functor=~w, args=~w~n", [Functor, Args]),

    % List as tuple
    Triple = [1, 2.0, three],
    [A, B, C] = Triple,
    format("~w ~w ~w~n", [A, B, C]).
```

## Gotchas

- There is no dedicated tuple syntax — use compound terms with an appropriate functor name for clarity.
- The `-` operator is conventional for pairs: `Key-Value`. It is just the compound term `-/2`.
- `=..` (univ) deconstructs a term into a functor and list of arguments, enabling reflective manipulation.
- Compound terms are immutable — you cannot modify a field; create a new term with the updated value.
