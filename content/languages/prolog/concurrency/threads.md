---
title: "Threads"
language: "prolog"
feature: "threads"
category: "concurrency"
applicable: false
---

SWI-Prolog provides OS-level threads via `library(thread)`. Threads share the global Prolog database but have independent stacks and local state. Thread communication uses message queues. Standard ISO Prolog does not include threads — this is a SWI-Prolog extension.

## Example

```prolog
:- use_module(library(thread)).
:- initialization(main, main).

worker(Id, Queue) :-
    between(1, 5, N),
    Result is Id * N,
    thread_send_message(Queue, result(Id, Result)),
    fail.   % backtrack to process all N values
worker(_, Queue) :-
    thread_send_message(Queue, done).

main :-
    % Create a message queue
    message_queue_create(Q),

    % Spawn worker threads
    thread_create(worker(1, Q), T1, []),
    thread_create(worker(2, Q), T2, []),

    % Collect results
    collect_results(Q, 2, Results),
    write(Results), nl,

    thread_join(T1, _),
    thread_join(T2, _),
    message_queue_destroy(Q).

collect_results(_, 0, []) :- !.
collect_results(Q, Remaining, Results) :-
    thread_get_message(Q, Msg),
    ( Msg = done
    -> collect_results(Q, Remaining1, Results),
       Remaining1 is Remaining - 1
    ; Msg = result(_, V),
      Results = [V | Rest],
      collect_results(Q, Remaining, Rest)
    ).
```

## Gotchas

- Threads in SWI-Prolog share the dynamic database — concurrent `assert`/`retract` is thread-safe but can cause logical races.
- Each thread has its own local stack, choice points, and trail — backtracking is per-thread.
- `thread_join/2` returns the thread's exit status (the value `true`, an exception term, or `false`).
- This is SWI-Prolog specific. For portability, avoid threading or abstract it behind a compatibility layer.
