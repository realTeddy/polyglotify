---
title: "Async/Await"
language: "lisp"
feature: "async-await"
category: "concurrency"
applicable: false
---

Standard Common Lisp has no async/await. The language standard does not include asynchronous I/O primitives. The community library **lparallel** provides futures and promises. **cl-async** provides an event-loop-based async I/O system. **SBCL** and other implementations provide threads. For green threads and cooperative multitasking, **cl-cont** implements continuations that can simulate async/await patterns.

## Example

```common-lisp
;;; Using lparallel for futures (closest to async/await)
;;; Requires: (ql:quickload :lparallel)

(use-package :lparallel)

;; Initialize a thread pool
(setf *kernel* (make-kernel 4))   ; 4 worker threads

;; Future = async task
(defun async-fetch (id)
  (future
    ;; Simulated expensive computation
    (sleep 0.1)
    (* id 10)))

;; Await = force
(let ((f1 (async-fetch 1))
      (f2 (async-fetch 2))
      (f3 (async-fetch 3)))
  ;; All three run in parallel
  (list (force f1)    ; => 10  (blocks until complete)
        (force f2)    ; => 20
        (force f3)))  ; => 30

;; Promise (manually resolved future)
(let ((p (promise)))
  (submit-task (lambda () (fulfill p 42)))
  (force p))    ; => 42

;; pmap — parallel map
(pmap 'list (lambda (x) (* x x)) '(1 2 3 4 5))
; => (1 4 9 16 25) — computed in parallel

(end-kernel)
```

## Gotchas

- `lparallel` is a community library, not part of the ANSI standard — install via Quicklisp: `(ql:quickload :lparallel)`.
- `(force future)` blocks the calling thread until the future is complete — unlike JavaScript's `await`, there is no non-blocking continuation at the language level.
- SBCL has excellent native threads (`sb-thread`); other implementations vary in thread support quality. Check your implementation's documentation before relying on threading.
