---
title: "Structs & Classes"
language: "prolog"
feature: "structs-classes"
category: "data-structures"
applicable: false
---

Prolog has no structs or classes. Data is represented using **compound terms** (functors with arguments), which serve a similar role to records/structs. Field access and modification require pattern matching and constructing new terms. SWI-Prolog's **dicts** provide a more struct-like syntax.

## Example

```prolog
:- initialization(main, main).

% Compound terms as records (struct equivalent)
% person(Name, Age, Email)

% "Constructor"
new_person(Name, Age, Email, person(Name, Age, Email)).

% "Getters" via pattern matching
person_name(person(N, _, _), N).
person_age(person(_, A, _), A).
person_email(person(_, _, E), E).

% "Update" (creates new term — no mutation)
person_set_age(person(N, _, E), NewAge, person(N, NewAge, E)).

% SWI-Prolog dict (non-portable, but struct-like)
dict_demo :-
    P = person{name: "Alice", age: 30, email: "a@b.com"},
    format("Name: ~w~n", [P.name]),
    P2 = P.put(age, 31),
    format("New age: ~w~n", [P2.age]).

main :-
    new_person('Alice', 30, 'alice@example.com', P),
    person_name(P, N), write(N), nl,
    person_age(P, A), write(A), nl,
    person_set_age(P, 31, P2),
    person_age(P2, A2), write(A2), nl,
    ( current_prolog_flag(dialect, swi) -> dict_demo ; true ).
```

## Gotchas

- Compound terms are entirely positional — the field ordering in the functor is the only structure.
- There is no name-based field access (unless using SWI-Prolog dicts).
- "Updating" a field requires constructing a new term with all other fields copied — no in-place modification.
- The convention of using the compound term functor as a "type tag" (e.g., `person(...)`) is idiomatic but unenforced.
