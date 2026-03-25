---
title: "Closures & Lambdas"
language: "prolog"
feature: "closures"
category: "functions"
applicable: false
---

Prolog has no closures or lambda expressions in the traditional sense. However, **lambda libraries** (like `library(lambda)` in SWI-Prolog) provide lambda syntax. The idiomatic Prolog equivalent uses **meta-predicates** (`maplist/2`, `include/3`, `foldl/4`) with partial application via `call/N` and goals-as-terms.

## Example

```prolog
:- use_module(library(apply)).    % maplist, include, foldl
:- use_module(library(lambda)).   % \ lambda syntax (if available)

% Goals as terms — the Prolog equivalent of lambdas
:- initialization(main, main).

% Partial application via call/N
double(X, Y) :- Y is X * 2.
add(N, X, Y) :- Y is X + N.

main :-
    % maplist with a named predicate
    maplist(double, [1,2,3,4], Doubled),
    write(Doubled), nl,         % [2,4,6,8]

    % maplist with partial application: add(10, X, Y)
    maplist(add(10), [1,2,3], Added),
    write(Added), nl,           % [11,12,13]

    % include/exclude filtering
    include(>(5), [1,3,5,7,9], Small),   % X < 5
    write(Small), nl,

    % foldl (accumulate)
    foldl([X, Acc0, Acc1]>>(Acc1 is Acc0 + X),
          [1,2,3,4,5], 0, Sum),
    write(Sum), nl,   % 15

    % Lambda notation with library(lambda)
    maplist([X]>>(Y is X*X, write(Y), write(' ')),
            [1,2,3,4,5]), nl.
```

## Gotchas

- `call(Goal, Arg)` applies `Goal` to `Arg` — this is how partial application works in Prolog.
- The `[X]>>(Body)` lambda syntax requires `library(lambda)` in SWI-Prolog.
- Goals stored as terms (e.g., `Goal = double`) are not closures — they do not capture variables.
- `maplist/N` requires the predicate to have `N-1` input arguments and 1 output (for transforming) or just succeeds/fails.
