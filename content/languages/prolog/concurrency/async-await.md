---
title: "Async/Await"
language: "prolog"
feature: "async-await"
category: "concurrency"
applicable: false
---

Prolog has no async/await. SWI-Prolog provides threads and concurrent goals via `library(thread)`. The closest analogy to async tasks is using `thread_create` and `thread_join`, or concurrent goal execution with `concurrent/3`. Prolog's backtracking provides a form of non-determinism but not concurrency.

## Example

```prolog
:- use_module(library(thread)).
:- initialization(main, main).

% concurrent/3 — run goals in parallel, succeed if all succeed
main :-
    % Run multiple goals concurrently
    concurrent(3, [
        work(1),
        work(2),
        work(3)
    ], []),
    write('All done'), nl,

    % Thread-based async task
    thread_create(
        ( sleep(0.1), write('Thread done'), nl ),
        ThreadId,
        []
    ),
    write('Main continues'), nl,
    thread_join(ThreadId, Status),
    format("Thread status: ~w~n", [Status]).

work(N) :-
    format("Working on ~w~n", [N]),
    sleep(0.05).
```

## Gotchas

- `concurrent/3` requires all goals to succeed — if any fails, the others are cancelled.
- Prolog threads share the Prolog database (facts/rules) but have separate stacks.
- `assert`/`retract` are thread-safe in SWI-Prolog but can cause race conditions in logic.
- SWI-Prolog's thread system is powerful but standard ISO Prolog has no threading support.
