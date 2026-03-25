---
title: "Classes"
language: "prolog"
feature: "classes"
category: "oop"
applicable: false
---

Prolog has no classes. It is a logic programming language where knowledge is represented as facts and rules, not objects. SWI-Prolog provides `library(pce)` (XPCE) for OOP, but this is a specialized GUI library, not general-purpose OOP. For stateful objects, Prolog uses global variables (`nb_getval`/`nb_setval`) or mutable terms.

## Example

```prolog
% Idiomatic Prolog: knowledge base as "class", terms as "instances"
:- dynamic counter/2.

% "Constructor"
counter_new(Name) :-
    retractall(counter(Name, _)),
    assert(counter(Name, 0)).

% "Methods"
counter_increment(Name) :-
    retract(counter(Name, N)),
    N1 is N + 1,
    assert(counter(Name, N1)).

counter_get(Name, Value) :-
    counter(Name, Value).

counter_reset(Name) :-
    retract(counter(Name, _)),
    assert(counter(Name, 0)).

:- initialization(main, main).
main :-
    counter_new(my_counter),
    counter_increment(my_counter),
    counter_increment(my_counter),
    counter_increment(my_counter),
    counter_get(my_counter, V),
    format("Counter: ~w~n", [V]),   % 3
    counter_reset(my_counter),
    counter_get(my_counter, V2),
    format("After reset: ~w~n", [V2]).  % 0
```

## Gotchas

- Using `assert`/`retract` for mutable state is the imperative workaround but breaks declarative semantics.
- `assert` and `retract` are global side effects — their interaction with backtracking can be surprising.
- Pure Prolog code avoids global state entirely and uses argument threading to pass state through predicates.
- OOP libraries like XPCE are specialized and not a standard part of Prolog.
