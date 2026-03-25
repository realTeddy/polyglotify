---
title: "Channels & Message Passing"
language: "prolog"
feature: "channels"
category: "concurrency"
applicable: false
---

Prolog has no built-in channels. SWI-Prolog provides **message queues** via `library(thread)` which serve as typed channels between threads. `thread_send_message/2` and `thread_get_message/2` (blocking receive) form the message-passing API.

## Example

```prolog
:- use_module(library(thread)).
:- initialization(main, main).

producer(Queue, Items) :-
    forall(
        member(Item, Items),
        ( thread_send_message(Queue, item(Item)),
          format("Sent: ~w~n", [Item]) )
    ),
    thread_send_message(Queue, eof).

consumer(Queue) :-
    thread_get_message(Queue, Msg),
    ( Msg = eof
    -> write('Consumer done'), nl
    ;  Msg = item(V),
       format("Received: ~w~n", [V]),
       consumer(Queue)
    ).

main :-
    message_queue_create(Q),

    thread_create(producer(Q, [1, 2, 3, 4, 5]), Producer, []),
    thread_create(consumer(Q), Consumer, []),

    thread_join(Producer, _),
    thread_join(Consumer, _),

    message_queue_destroy(Q).
```

## Gotchas

- `thread_get_message/2` blocks indefinitely if the queue is empty — use `thread_get_message(Q, Msg, [timeout(5)])` for a timeout.
- Message queues in SWI-Prolog are untyped — any Prolog term can be sent.
- A message queue that is never destroyed leaks memory — always call `message_queue_destroy`.
- This is entirely SWI-Prolog specific; ISO Prolog has no threading or messaging primitives.
