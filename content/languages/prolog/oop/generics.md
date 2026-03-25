---
title: "Generics"
language: "prolog"
feature: "generics"
category: "oop"
applicable: false
---

Prolog has no generics — it does not need them. Because Prolog is dynamically typed and unification works on any term, predicates are inherently polymorphic. A predicate like `length/2` or `member/2` works on lists of any type without any generic annotation.

## Example

```prolog
:- use_module(library(apply)).
:- initialization(main, main).

% These predicates work for any type — no generics needed

% Works for [int], [atom], [compound], etc.
my_length([], 0).
my_length([_|T], N) :- my_length(T, N0), N is N0 + 1.

% Works for lists of any element type
my_member(X, [X|_]).
my_member(X, [_|T]) :- my_member(X, T).

% Higher-order: map over any list
my_map(_, [], []).
my_map(Goal, [H|T], [H2|T2]) :-
    call(Goal, H, H2),
    my_map(Goal, T, T2).

double(X, Y) :- Y is X * 2.
upcase_atom(X, Y) :- upcase_atom(X, Y).

main :-
    my_length([1,2,3], N1), write(N1), nl,           % 3
    my_length([a,b,c,d], N2), write(N2), nl,         % 4

    my_member(3, [1,2,3,4]), write(found), nl,

    my_map(double, [1,2,3,4], D), write(D), nl,      % [2,4,6,8]
    my_map(succ, [1,2,3], S), write(S), nl.           % [2,3,4]
```

## Gotchas

- Prolog's "implicit generics" means there is no compile-time type checking — type errors surface at runtime as unification failures.
- The lack of type parameters means you cannot restrict a list to "integers only" without runtime checks (`maplist(integer, List)`).
- This flexibility is powerful for meta-programming but can make programs harder to understand for large codebases.
- Constraint Logic Programming (CLP) extensions add typed constraints that partially address this.
