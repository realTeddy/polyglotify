---
title: "Exceptions & Try/Catch"
language: "prolog"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Prolog uses `catch/3` for exception handling and `throw/1` to raise exceptions. The standard exception terms are typed compounds: `error(ErrorTerm, Context)`. Common error types include `type_error`, `instantiation_error`, `existence_error`, and `permission_error`. ISO Prolog defines these standard error terms.

## Example

```prolog
:- initialization(main, main).

% Throwing exceptions
safe_divide(_, 0, _) :-
    throw(error(evaluation_error(zero_divisor), context(safe_divide/3, 'Division by zero'))).
safe_divide(A, B, R) :-
    B =\= 0,
    R is A / B.

% Catching exceptions with catch/3
% catch(Goal, Catcher, Recovery)
main :-
    % Basic catch
    catch(
        safe_divide(10, 0, _),
        error(evaluation_error(zero_divisor), _),
        ( write('Caught: division by zero'), nl )
    ),

    % Successful operation
    catch(
        safe_divide(10, 2, R),
        _,
        R = error
    ),
    format("Result: ~w~n", [R]),

    % Catch any error
    catch(
        ( X is foo + 1 ),      % type error
        error(type_error(evaluable, foo/0), _),
        ( write('Caught type error'), nl )
    ),

    % Custom exception term
    catch(
        throw(my_error(42, "custom message")),
        my_error(Code, Msg),
        format("Custom error ~w: ~w~n", [Code, Msg])
    ).
```

## Gotchas

- `catch(Goal, Catcher, Recovery)` is like try/catch — `Catcher` is unified with the thrown term.
- ISO standard exception terms follow `error(ErrorTerm, Context)` — use standard terms for portability.
- Exceptions are not equivalent to failure — a thrown exception bypasses backtracking and propagates up.
- Use `throw(error(type_error(expected, actual), _))` for type errors to match ISO conventions.
