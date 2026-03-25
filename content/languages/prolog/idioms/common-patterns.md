---
title: "Common Patterns"
language: "prolog"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Prolog idioms include: generate-and-test, difference lists, DCGs for parsing, accumulator patterns for tail recursion, and meta-predicates (`maplist`, `findall`, `aggregate`). The database is a living knowledge base — `assert`/`retract` enable dynamic facts. CLP(FD) solves constraint problems declaratively.

## Example

```prolog
:- use_module(library(apply)).
:- use_module(library(aggregate)).
:- initialization(main, main).

% 1. Generate-and-test
prime(2).
prime(N) :- N > 2, \+ composite(N).
composite(N) :-
    between(2, N, D),
    D < N,
    0 =:= N mod D.

% 2. Accumulator pattern (tail-recursive)
sum_list_acc([], Acc, Acc).
sum_list_acc([H|T], Acc, Sum) :-
    NewAcc is Acc + H,
    sum_list_acc(T, NewAcc, Sum).

sum_list(List, Sum) :- sum_list_acc(List, 0, Sum).

% 3. Difference lists for efficient appending
dl_append(X-Y, Y-Z, X-Z).

% 4. DCG (Definite Clause Grammars) for parsing
sentence --> noun_phrase, verb_phrase.
noun_phrase --> [the], noun.
verb_phrase --> verb, noun_phrase.
noun --> [cat] ; [mouse].
verb --> [chases].

% 5. findall + aggregate
main :-
    % Generate-and-test
    findall(P, (between(2, 20, P), prime(P)), Primes),
    write(Primes), nl,

    % Accumulator
    sum_list([1,2,3,4,5], S),
    write(S), nl,   % 15

    % DCG parsing
    ( phrase(sentence, [the, cat, chases, the, mouse])
    -> write('valid sentence') ; write('invalid') ), nl,

    % Meta-predicates
    maplist(succ, [1,2,3], Succs),
    write(Succs), nl,   % [2,3,4]

    include(prime, [1..20] - [], _).  % just to show usage
```

## Gotchas

- Naive recursive predicates without accumulators are not tail-recursive and will overflow the stack for large inputs.
- The generate-and-test pattern can be very slow — use constraints (CLP) or smarter generation when performance matters.
- DCGs are transformed to regular Prolog clauses by the compiler — `phrase/2,3` is used to invoke them.
- `findall` always succeeds (returns `[]` on no solutions) — contrast with `bagof` which fails on no solutions.
