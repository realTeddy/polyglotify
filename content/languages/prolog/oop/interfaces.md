---
title: "Interfaces & Traits"
language: "prolog"
feature: "interfaces"
category: "oop"
applicable: false
---

Prolog has no interfaces or traits. The concept of "implementing an interface" does not apply in a logic programming context. Polymorphic behaviour is achieved naturally through clause matching — different clauses handle different term structures. Prolog modules provide some encapsulation.

## Example

```prolog
% "Polymorphism" in Prolog — different clauses for different term shapes

% area/2 works for any shape that has matching clauses
area(circle(R), A) :- A is pi * R * R.
area(rect(W, H), A) :- A is W * H.
area(triangle(B, H), A) :- A is 0.5 * B * H.

% perimeter/2 similarly
perimeter(circle(R), P) :- P is 2 * pi * R.
perimeter(rect(W, H), P) :- P is 2 * (W + H).

% "Calling the interface" — same predicate works for all shapes
print_area(Shape) :-
    area(Shape, A),
    format("Area: ~4f~n", [A]).

:- initialization(main, main).
main :-
    Shapes = [circle(5), rect(3, 4), triangle(6, 8)],
    maplist(print_area, Shapes),

    % Can even check if a shape "implements" area
    ( catch(area(unknown_shape, _), _, fail)
    -> write('has area') ; write('no area clause') ), nl.
```

## Gotchas

- Prolog's "polymorphism" is purely syntactic — any term can be passed to any predicate; it fails if no clause matches.
- There is no way to enforce that a "type" implements a set of predicates (no interface contract).
- Adding a new shape requires adding new clauses for each relevant predicate — there is no centralized implementation requirement.
- Modules provide some namespace separation but not the interface/implementation separation of OOP.
