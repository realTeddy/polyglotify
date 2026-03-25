---
title: "Threads"
language: "scheme"
feature: "threads"
category: "concurrency"
applicable: false
---

Standard R7RS Scheme does not define a threading API. Thread support is implementation-specific. **SRFI-18** defines a portable thread interface supported by several implementations (Gambit, Chicken, MIT Scheme). **Guile** has POSIX threads. **Racket** has `thread`. **Chez Scheme** has `fork-thread`. There is no standard — check your implementation's documentation.

## Example

```scheme
;;; SRFI-18 threads (Gambit, Chicken, MIT Scheme, etc.)
;;; (import (srfi 18))

(define (make-worker id)
  (make-thread
    (lambda ()
      (let loop ((i 0))
        (when (< i 3)
          (display (string-append "Thread " (number->string id)
                                  " step " (number->string i) "\n"))
          (thread-yield!)   ; cooperative yield
          (loop (+ i 1)))))))

(define t1 (make-worker 1))
(define t2 (make-worker 2))

(thread-start! t1)
(thread-start! t2)
(thread-join! t1)
(thread-join! t2)

;;; Mutex for shared state
(define *counter* 0)
(define *mutex* (make-mutex))

(define (safe-increment!)
  (mutex-lock! *mutex*)
  (set! *counter* (+ *counter* 1))
  (mutex-unlock! *mutex*))

;;; Racket threads (NOT standard Scheme)
;; (define t (thread (lambda () (display "hello\n"))))
;; (thread-wait t)

;;; Guile fibers (lightweight green threads)
;; (use-modules (fibers))
;; (run-fibers (lambda ()
;;               (spawn-fiber (lambda () (display "fiber 1\n")))
;;               (spawn-fiber (lambda () (display "fiber 2\n")))))
```

## Gotchas

- SRFI-18 is not universally available — verify support in your Scheme implementation before using it.
- `thread-yield!` in SRFI-18 is cooperative — threads must yield explicitly or call a blocking operation to allow other threads to run.
- Standard R7RS intentionally omits threading to remain implementable on single-threaded environments (embedded systems, etc.).
