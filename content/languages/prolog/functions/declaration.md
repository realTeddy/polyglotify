---
title: "Function Declaration"
language: "prolog"
feature: "declaration"
category: "functions"
applicable: true
---

Prolog does not have functions — it has **predicates** (relations). A predicate is defined by one or more **clauses** (facts and rules). A "function call" is actually a goal that either succeeds (with possible variable bindings) or fails. Multiple clauses define alternative ways a predicate can succeed (enabling backtracking).

## Example

```prolog
% Facts (unconditional clauses)
parent(tom, bob).
parent(tom, liz).
parent(bob, ann).
parent(bob, pat).

% Rules (conditional clauses — head :- body)
grandparent(X, Z) :-
    parent(X, Y),
    parent(Y, Z).

ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).

% "Function" returning a value via an output argument
square(X, Y) :- Y is X * X.

add(X, Y, Sum) :- Sum is X + Y.

% Multiple clauses = pattern matching
describe(0, zero) :- !.
describe(N, positive) :- N > 0, !.
describe(_, negative).

:- initialization(main, main).
main :-
    grandparent(tom, ann),      % succeeds
    write(yes), nl,
    square(5, S), write(S), nl, % 25
    describe(-3, D), write(D), nl,  % negative
    findall(C, grandparent(tom, C), Cs),
    write(Cs), nl.   % [ann, pat]
```

## Gotchas

- Predicates are identified by `name/arity` — `parent/2` and `parent/3` are completely different predicates.
- Clause order matters: Prolog tries clauses top-to-bottom. Place more specific clauses before general ones.
- "Returning a value" means unifying an output argument — the last argument is conventionally the result.
- A predicate with multiple clauses can succeed multiple times via backtracking (like a generator).
