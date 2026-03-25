---
title: "Sets"
language: "prolog"
feature: "sets"
category: "data-structures"
applicable: true
---

Prolog represents sets as sorted lists without duplicates. The `library(lists)` and built-in `sort/2` support set operations. `list_to_set/2` removes duplicates preserving order. `ord_*` predicates in `library(ordsets)` provide efficient set operations on ordered lists.

## Example

```prolog
:- use_module(library(lists)).
:- use_module(library(ordsets)).
:- initialization(main, main).

main :-
    % Create sets via sort (removes duplicates, sorts)
    sort([3,1,4,1,5,9,2,6,5,3], SetA),
    write(SetA), nl,   % [1,2,3,4,5,6,9]

    SetB = [3,4,5,6,7,8],
    list_to_ord_set([3,4,5,6,7,8], OrdB),

    % ordsets operations (efficient on sorted lists)
    list_to_ord_set([1,2,3,4,5], OrdA),

    ord_union(OrdA, OrdB, U),
    write(U), nl,             % [1,2,3,4,5,6,7,8]

    ord_intersection(OrdA, OrdB, I),
    write(I), nl,             % [3,4,5]

    ord_subtract(OrdA, OrdB, D),
    write(D), nl,             % [1,2]

    % Membership
    ( ord_memberchk(3, OrdA) -> write(member) ; write(not_member) ), nl,

    % Subset check
    ( ord_subset([1,3], OrdA) -> write(subset) ; write(not_subset) ), nl,

    % Add element to set
    ord_add_element(OrdA, 10, NewSet),
    write(NewSet), nl.
```

## Gotchas

- Prolog sets are **sorted lists** — all set predicates maintain the sorted invariant.
- `sort/2` is the simplest way to convert a list to a set representation.
- `ordsets` predicates are more efficient than naive list operations but require the list to be sorted.
- There is no set literal syntax — sets are just sorted lists by convention.
