---
title: "Async/Await"
language: "scheme"
feature: "async-await"
category: "concurrency"
applicable: false
---

Standard R7RS Scheme has no async/await. However, Scheme's first-class continuations (`call/cc`) make it possible to implement async/await-style coroutines as a library. **Racket** (a Scheme descendant) provides `future` and `place` for parallelism and its own async I/O. **Guile** supports fibers (lightweight cooperative threads). The `concurrency` library on some implementations provides channel-based async.

## Example

```scheme
;;; call/cc-based coroutine trampoline (educational — standard R7RS)
(define *queue* '())

(define (enqueue! thunk)
  (set! *queue* (append *queue* (list thunk))))

(define (run-scheduler)
  (when (pair? *queue*)
    (let ((next (car *queue*)))
      (set! *queue* (cdr *queue*))
      (next)
      (run-scheduler))))

(define (yield)
  (call-with-current-continuation
    (lambda (k)
      (enqueue! k)
      (if (pair? *queue*)
          ((car (begin (set! *queue* (cdr *queue*)) (list (car *queue*)))))
          (void)))))

;;; Two "async" tasks
(enqueue! (lambda ()
            (display "Task 1: start") (newline)
            (yield)
            (display "Task 1: end") (newline)))

(enqueue! (lambda ()
            (display "Task 2: start") (newline)
            (yield)
            (display "Task 2: end") (newline)))

;; (run-scheduler)
;; Output: Task 1: start / Task 2: start / Task 1: end / Task 2: end

;;; Racket (NOT standard Scheme) — future/async
;; (require racket/future)
;; (define f (future (lambda () (+ 1 2))))
;; (touch f)   ; => 3 — blocks until ready
```

## Gotchas

- The continuation-based coroutine implementation above is pedagogically clear but not production-grade — real async systems need event loops and I/O integration.
- Racket's `future` runs computations in a thread pool; `place` is a heavier isolated process with message passing.
- Guile's fibers (`(use-modules (fibers))`) provide Go-style channels and goroutines, but are specific to Guile and not portable.
