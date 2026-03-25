---
title: "Parameters & Arguments"
language: "prolog"
feature: "parameters"
category: "functions"
applicable: true
---

Prolog predicate arguments are terms that are unified with the clause's parameter positions. There are no named parameters, defaults, or keywords. Arguments serve dual roles: they can be inputs (already bound) or outputs (unbound, receiving values via unification). The mode of each argument is documented by convention but not enforced by the language.

## Example

```prolog
% Arguments can be input or output based on which are bound at call time

% length/2: both directions work
% length(?List, ?Length)
demo_length :-
    length([a,b,c], N),          % input list, output length
    write(N), nl,                % 3
    length(L, 3),                % output list, input length — generates list of 3 variables
    write(L), nl.

% max_list/2 — input list, output max
demo_max :-
    max_list([3, 1, 4, 1, 5, 9], Max),
    write(Max), nl.   % 9

% Pattern matching in arguments (instead of guards)
head([H|_], H).      % first element
tail([_|T], T).      % all but first

% Mode annotations (documentation convention, not enforced)
% sum_list(+List, -Sum)
sum_list([], 0).
sum_list([H|T], Sum) :-
    sum_list(T, Rest),
    Sum is H + Rest.

:- initialization(main, main).
main :-
    demo_length,
    demo_max,
    head([a,b,c], H), write(H), nl,
    sum_list([1,2,3,4,5], S), write(S), nl.
```

## Gotchas

- Prolog has no named parameters or default values — all arguments are positional.
- Mode indicators (`+` = input, `-` = output, `?` = either) are documentation conventions, not syntax.
- Calling a predicate with wrong argument modes may cause errors or unexpected behavior.
- The same predicate can sometimes be called in multiple modes (bidirectionality) — this is a strength of Prolog.
