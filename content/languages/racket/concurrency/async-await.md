---
title: "Async/Await"
language: "racket"
feature: "async-await"
category: "concurrency"
applicable: false
---

Racket does not have `async`/`await` syntax. Instead, it provides **threads**, **channels**, **futures**, and **places** for concurrency. Asynchronous I/O is handled at a lower level using the event system in `racket/tcp`, `racket/udp`, or the `net/` libraries. The `async-channel` library bridges threads and event-driven code.

## Example

```racket
#lang racket

; Racket's concurrency primitives instead of async/await

; Threads with synchronization
(define result-channel (make-channel))

(define (fetch-data id)
  (thread
    (lambda ()
      (sleep 0.01)  ; simulate I/O
      (channel-put result-channel (format "data-~a" id)))))

(fetch-data 1)
(fetch-data 2)

(printf "~a\n" (channel-get result-channel))
(printf "~a\n" (channel-get result-channel))

; Futures (parallel computation, not I/O concurrency)
(define f (future (lambda () (+ 1 2 3))))
(touch f)  ; => 6
```

## Gotchas

- Racket threads are lightweight (green threads), not OS threads; they run on a single OS thread by default unless using `places`.
- `future` is for CPU parallelism on safe operations; it falls back to sequential execution for unsafe operations.
- For network I/O, Racket's event loop (`sync`, `handle-evt`) provides non-blocking I/O without async/await syntax.
