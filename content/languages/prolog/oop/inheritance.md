---
title: "Inheritance"
language: "prolog"
feature: "inheritance"
category: "oop"
applicable: false
---

Prolog has no inheritance. However, Prolog's knowledge representation naturally handles hierarchical taxonomies through rules. "Inheritance" is modelled by asserting general rules that apply unless overridden by more specific facts — this is the **closed world assumption** and clause ordering.

## Example

```prolog
% Prolog models taxonomic hierarchies through rules

% Taxonomy facts
is_a(dog, mammal).
is_a(cat, mammal).
is_a(eagle, bird).
is_a(mammal, animal).
is_a(bird, animal).

% Transitive closure — "inherits" properties up the hierarchy
inherits_from(X, Y) :- is_a(X, Y).
inherits_from(X, Y) :- is_a(X, Z), inherits_from(Z, Y).

% Properties attached to types — "inherited" through the taxonomy
has_property(animal, alive).
has_property(mammal, warm_blooded).
has_property(mammal, has_fur).
has_property(bird, has_feathers).
has_property(bird, lays_eggs).
has_property(dog, barks).

% A species "inherits" properties from its ancestors
property_of(Species, Prop) :-
    has_property(Species, Prop).
property_of(Species, Prop) :-
    is_a(Species, Parent),
    property_of(Parent, Prop).

:- initialization(main, main).
main :-
    findall(P, property_of(dog, P), Props),
    sort(Props, Sorted),
    format("Dog properties: ~w~n", [Sorted]),
    % [alive, barks, has_fur, warm_blooded]

    ( inherits_from(dog, animal) -> write('dog is an animal') ; true ), nl.
```

## Gotchas

- This is knowledge representation, not OOP inheritance — there are no methods, constructors, or objects.
- More specific clauses must appear before general ones for correct behavior, or use `\+` and cuts carefully.
- Prolog has no concept of overriding — clause order and cut (`!`) control which rule applies.
- This pattern is actually Prolog's strength: declarative reasoning about hierarchies is natural and powerful.
