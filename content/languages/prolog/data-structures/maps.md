---
title: "Maps & Dictionaries"
language: "prolog"
feature: "maps"
category: "data-structures"
applicable: true
---

Prolog has no built-in map type, but provides several alternatives: **association lists** (`library(assoc)` — AVL tree-based), **dicts** (SWI-Prolog extension), and plain **lists of pairs** (`Key-Value`). The `library(assoc)` module is the standard portable approach.

## Example

```prolog
:- use_module(library(assoc)).
:- initialization(main, main).

main :-
    % library(assoc) — AVL tree based, keys must be ground terms
    empty_assoc(A0),
    put_assoc(alice, A0, 95, A1),
    put_assoc(bob,   A1, 82, A2),
    put_assoc(carol, A2, 88, A3),

    % Lookup
    get_assoc(alice, A3, AliceScore),
    format("Alice: ~w~n", [AliceScore]),

    % Check key existence
    ( get_assoc(dave, A3, _) -> write(found) ; write(not_found) ), nl,

    % Update (returns new assoc)
    put_assoc(alice, A3, 99, A4),
    get_assoc(alice, A4, NewScore),
    format("Updated Alice: ~w~n", [NewScore]),

    % Keys and values
    assoc_to_keys(A3, Keys),
    assoc_to_values(A3, Values),
    write(Keys), nl,
    write(Values), nl,

    % SWI-Prolog dict (non-portable)
    D = point{x: 1.0, y: 2.0},
    write(D.x), nl,   % 1.0
    D2 = D.put(x, 5.0),
    write(D2.x), nl.  % 5.0
```

## Gotchas

- `library(assoc)` uses AVL trees — O(log n) for get/put. Keys must be ground (no unbound variables).
- `put_assoc` returns a **new** association — the old one is unchanged (purely functional).
- SWI-Prolog dicts (`Tag{key: value}`) are a non-standard extension and not portable to other Prolog implementations.
- Lists of pairs `[key-value, ...]` with `member(Key-Value, Pairs)` are simple but O(n) lookup.
