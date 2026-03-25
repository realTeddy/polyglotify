---
title: "Threads"
language: "racket"
feature: "threads"
category: "concurrency"
applicable: true
---

Racket has built-in green threads via `thread`. Threads run concurrently within a single OS thread (preemptively scheduled by the Racket runtime). `thread-wait` blocks until a thread finishes. Synchronization primitives include `semaphore`, `mutex`, `channel`, and `sync`. `places` provide true OS-level parallelism with separate heaps.

## Example

```racket
#lang racket

; Basic thread
(define t (thread (lambda ()
                    (sleep 0.1)
                    (displayln "thread done"))))

(thread-wait t)

; Mutex for shared state
(define count 0)
(define m (make-semaphore 1))

(define (increment!)
  (semaphore-wait m)
  (set! count (+ count 1))
  (semaphore-post m))

(define threads
  (for/list ([_ (in-range 100)])
    (thread increment!)))

(for-each thread-wait threads)
count  ; => 100

; Thread with result via channel
(define (async-compute expr-thunk)
  (define ch (make-channel))
  (thread (lambda () (channel-put ch (expr-thunk))))
  ch)

(define ch (async-compute (lambda () (* 6 7))))
(channel-get ch)  ; => 42
```

## Gotchas

- Racket threads share the same heap and are preemptively scheduled; protect shared mutable state with semaphores or mutexes.
- `thread-dead?` and `thread-running?` check thread state without blocking.
- For true CPU parallelism, use `place` instead of `thread`; places have isolated heaps and communicate only via channels.
