---
title: "Control Flow"
language: "prolog"
feature: "control-flow"
category: "basics"
applicable: true
---

Prolog's control flow is driven by backtracking and goal resolution, not imperative statements. The primary control constructs are: conjunction (`,`), disjunction (`;`), if-then-else (`->`), negation-as-failure (`\+`), cut (`!`), and `findall`/`forall` for iteration. Recursion is the primary loop mechanism.

## Example

```prolog
:- initialization(main, main).

% Facts
color(sky, blue).
color(grass, green).
color(sun, yellow).

% Rules with conjunction (,) and disjunction (;)
primary(C) :- (C = red ; C = yellow ; C = blue).

% If-then-else
classify(N, Class) :-
    ( N > 0  -> Class = positive
    ; N < 0  -> Class = negative
    ;            Class = zero
    ).

% Negation-as-failure
not_blue(Thing) :-
    \+ color(Thing, blue).

% Recursion as a loop
print_list([]).
print_list([H|T]) :-
    format("item: ~w~n", [H]),
    print_list(T).

% between/3 for integer ranges
count_up(Max) :-
    between(1, Max, N),
    write(N), write(' '),
    fail.           % force backtracking to get all N
count_up(_) :- nl.

% forall
main :-
    classify(5, C1), write(C1), nl,   % positive
    classify(-3, C2), write(C2), nl,  % negative
    print_list([a, b, c]),
    count_up(5),
    ( forall(member(X, [2,4,6]), 0 =:= X mod 2)
    -> write('all even') ; write('not all even') ), nl.
```

## Gotchas

- Cut (`!`) prevents backtracking past the clause it appears in — use carefully as it can break declarative reading.
- `\+` (not) is "negation-as-failure" — `\+ Goal` succeeds if `Goal` cannot be proved. It does not bind variables.
- `if -> then ; else` is committed: once `if` succeeds, Prolog will not backtrack to try the `else` branch.
- There are no `while`/`for` loops — use recursion, `between`, `forall`, or `findall`.
