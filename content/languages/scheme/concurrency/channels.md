---
title: "Channels & Message Passing"
language: "scheme"
feature: "channels"
category: "concurrency"
applicable: false
---

Standard Scheme has no channels. Channel-based concurrency is available in specific implementations: **Guile** provides `(fibers channels)` with Go-style channels, and **Racket** provides channels via `make-channel`/`channel-put`/`channel-get`. **SRFI-18** provides `make-mailbox` in some interpretations. Portable Scheme code cannot rely on any of these.

## Example

```scheme
;;; Guile fibers channels (NOT standard Scheme)
;;; (use-modules (fibers) (fibers channels))

;; (define ch (make-channel))
;;
;; (spawn-fiber
;;   (lambda ()
;;     (put-message ch "Hello from fiber 1!")))
;;
;; (spawn-fiber
;;   (lambda ()
;;     (display (get-message ch))  ; blocks until message arrives
;;     (newline)))

;;; Racket channels (NOT standard Scheme)
;;; (require racket/channel)
;; (define ch (make-channel))
;; (thread (lambda () (channel-put ch 42)))
;; (channel-get ch)   ; => 42

;;; Portable simulation using continuations and a queue
(define (make-channel)
  (let ((messages '())
        (waiters   '()))
    (define (put! msg)
      (if (null? waiters)
          (set! messages (append messages (list msg)))
          (let ((k (car waiters)))
            (set! waiters (cdr waiters))
            (k msg))))
    (define (get! k)
      (if (null? messages)
          (set! waiters (append waiters (list k)))
          (let ((msg (car messages)))
            (set! messages (cdr messages))
            (k msg))))
    (lambda (op . args)
      (case op
        ((put!)  (apply put! args))
        ((get!)  (apply get! args))))))
```

## Gotchas

- Guile fibers and Racket channels are production-grade but not portable — programs using them cannot run on other Scheme implementations without modification.
- The portable simulation above is a skeleton that only works with cooperative scheduling (call/cc-based or similar) — it does not work with preemptive OS threads.
- Standard Scheme's minimalism means that any channel library must either use SRFI-18 threads or the host implementation's threading; there is no implementation-independent solution.
