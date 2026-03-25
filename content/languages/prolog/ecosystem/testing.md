---
title: "Testing"
language: "prolog"
feature: "testing"
category: "ecosystem"
applicable: true
---

SWI-Prolog provides `library(plunit)` for unit testing. Test units are defined with `:- begin_tests(name). ... :- end_tests(name).` and individual tests use `test(Name) :- Body`. Run with `run_tests/0` or `run_tests(module)`.

## Example

```prolog
:- use_module(library(plunit)).
:- use_module(library(lists)).

% Code under test
sum_list([], 0).
sum_list([H|T], Sum) :-
    sum_list(T, Rest),
    Sum is H + Rest.

max_of(X, Y, X) :- X >= Y, !.
max_of(_, Y, Y).

:- begin_tests(sum_list).

test(empty_list) :-
    sum_list([], 0).

test(single_element) :-
    sum_list([5], 5).

test(multiple_elements) :-
    sum_list([1,2,3,4,5], 15).

test(negative_numbers) :-
    sum_list([-1,-2,3], 0).

:- end_tests(sum_list).

:- begin_tests(max_of).

test(first_larger) :-
    max_of(5, 3, 5).

test(second_larger) :-
    max_of(2, 7, 7).

test(equal) :-
    max_of(4, 4, 4).

test(throws_on_string, [throws(_)]) :-
    max_of(a, b, _).    % should throw type error

:- end_tests(max_of).

:- initialization(run_tests, main).
```

```sh
swipl -g run_tests -g halt tests/my_tests.pl
```

## Gotchas

- Test bodies are Prolog goals — a test passes if the goal succeeds and fails if the goal fails or throws an unexpected exception.
- Use `test(Name, [throws(Error)])` for tests that expect an exception.
- `run_tests` prints results and sets the exit code appropriately — useful in CI.
- `test(Name, [nondet])` allows the test goal to be nondeterministic (multiple solutions) without failing.
