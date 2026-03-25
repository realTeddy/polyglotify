---
title: "Channels & Message Passing"
language: "racket"
feature: "channels"
category: "concurrency"
applicable: true
---

Racket provides synchronous `channel` for thread communication and `async-channel` for buffered/non-blocking variants. Channels are the primary mechanism for safe inter-thread communication. `sync` and `handle-evt` build event-driven programs that wait on multiple channels or I/O ports simultaneously. `place-channel` is used for inter-place (OS-thread) communication.

## Example

```racket
#lang racket

; Synchronous channel
(define ch (make-channel))

; Producer thread
(thread (lambda ()
          (for ([i (in-range 5)])
            (channel-put ch i)
            (sleep 0.01))
          (channel-put ch 'done)))

; Consumer
(let loop ()
  (define msg (channel-get ch))
  (unless (equal? msg 'done)
    (printf "received: ~a\n" msg)
    (loop)))

; Async (buffered) channel
(require racket/async-channel)
(define ach (make-async-channel 10))  ; buffer of 10
(async-channel-put ach "buffered")
(async-channel-get ach)  ; => "buffered"

; sync — wait on multiple events
(define ch1 (make-channel))
(define ch2 (make-channel))
(thread (lambda () (sleep 0.05) (channel-put ch1 "from ch1")))
(thread (lambda () (sleep 0.02) (channel-put ch2 "from ch2")))
(sync ch1 ch2)  ; => "from ch2" (whichever is ready first)
```

## Gotchas

- `channel-put` blocks until a receiver is ready (synchronous rendezvous); use `async-channel` to avoid blocking the sender.
- `sync` returns the first ready event's value; wrap events in `handle-evt` to transform the result.
- Places use `place-channel` which only transmits serializable values (numbers, strings, byte strings, lists of same).
