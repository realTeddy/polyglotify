---
title: "Return Values"
language: "prolog"
feature: "return-values"
category: "functions"
applicable: true
---

Prolog predicates do not "return" values in the traditional sense. Results are communicated by unifying output arguments with the computed value. A predicate either succeeds (possibly binding variables) or fails. Multiple solutions can be returned via backtracking or collected with `findall/3`, `bagof/3`, or `setof/3`.

## Example

```prolog
% "Return" via output argument
square(X, Y) :- Y is X * X.

% Multiple outputs
divide(A, B, Q, R) :-
    B =\= 0,
    Q is A // B,
    R is A mod B.

% Collecting all solutions
even(X) :- between(1, 10, X), 0 =:= X mod 2.

% findall: collects all solutions into a list
find_evens(Evens) :-
    findall(X, even(X), Evens).

% bagof: like findall but fails if no solutions
% setof: like bagof but sorted and de-duplicated

% Deterministic result (at most one solution) with !
max_of(X, Y, X) :- X >= Y, !.
max_of(_, Y, Y).

:- initialization(main, main).
main :-
    square(5, S),
    write(S), nl,             % 25

    divide(17, 5, Q, R),
    format("~w rem ~w~n", [Q, R]),  % 3 rem 2

    find_evens(Evens),
    write(Evens), nl,         % [2,4,6,8,10]

    max_of(7, 3, M),
    write(M), nl,             % 7

    % Backtracking to get multiple solutions
    aggregate_all(count, even(_), Count),
    write(Count), nl.         % 5
```

## Gotchas

- Forgetting to unify the output argument (e.g., calling `square(5, _)` and never using the result) works but wastes computation.
- `findall(Template, Goal, List)` always succeeds — if `Goal` has no solutions, `List = []`.
- `bagof` and `setof` fail if the goal has no solutions — they also group by free variables (use `^` to suppress).
- A predicate that can return multiple results via backtracking is called a **nondeterministic predicate** — be aware of performance implications.
