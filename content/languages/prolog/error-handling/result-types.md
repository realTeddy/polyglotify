---
title: "Result Types"
language: "prolog"
feature: "result-types"
category: "error-handling"
applicable: false
---

Prolog has no Result type. The idiomatic Prolog approach is: predicates either **succeed** (with bindings) or **fail** (without bindings). For distinguishing success values from error values, compound terms like `ok(Value)` / `error(Reason)` are used as return arguments. `catch/3` handles exceptional failures.

## Example

```prolog
:- initialization(main, main).

% Pattern 1: succeed or fail (most Prolog-idiomatic)
positive(N) :- N > 0.

% Pattern 2: ok/error term as output argument
safe_sqrt(X, Result) :-
    ( X >= 0
    -> Result = ok(sqrt(X))   % Note: not evaluated for simplicity
    ;  Result = error(negative_input)
    ).

% Pattern 3: three-way — ok, error, or exception
read_value(Key, Map, Result) :-
    ( get_assoc(Key, Map, V)
    -> Result = ok(V)
    ;  Result = error(not_found(Key))
    ).

% Chaining via deterministic predicates
process(X, Result) :-
    ( X > 0
    -> V is sqrt(X),
       ( V > 5 -> Result = ok(big) ; Result = ok(small) )
    ;  Result = error(non_positive)
    ).

main :-
    safe_sqrt(4.0, R1), write(R1), nl,    % ok(sqrt(4.0))
    safe_sqrt(-1.0, R2), write(R2), nl,   % error(negative_input)

    process(9.0, R3), write(R3), nl,      % ok(big)
    process(-1.0, R4), write(R4), nl,     % error(non_positive)

    % Pattern matching on results
    process(25.0, Result),
    ( Result = ok(V) -> format("Got: ~w~n", [V])
    ; Result = error(E) -> format("Error: ~w~n", [E])
    ).
```

## Gotchas

- Pure Prolog favors failure over `error(...)` terms — use failure when the absence of a result is a normal outcome.
- The `ok/error` term pattern is borrowed from functional languages and is not idiomatic Prolog for most cases.
- `findall/3` (which always succeeds with possibly empty list) can hide missing results — be aware of semantics.
- For truly exceptional conditions (bugs, I/O errors), use `throw`/`catch`; for expected non-results, use plain failure.
