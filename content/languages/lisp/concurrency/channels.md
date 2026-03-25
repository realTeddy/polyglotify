---
title: "Channels & Message Passing"
language: "lisp"
feature: "channels"
category: "concurrency"
applicable: false
---

Common Lisp has no built-in channels. Message passing between threads is typically done with thread-safe queues from the **lparallel** or **chanl** libraries. `chanl` provides CSP-style channels directly inspired by Go and Clojure's `core.async`. Without a library, a bounded queue can be implemented with a mutex-protected list and a condition variable.

## Example

```common-lisp
;;; Using chanl for CSP-style channels
;;; (ql:quickload :chanl)
(use-package :chanl)

;; Unbuffered channel (rendezvous — send blocks until receive)
(let ((ch (make-instance 'unbuffered-channel)))
  (make-thread (lambda ()
                 (send ch 42)))
  (recv ch))    ; => 42

;; Buffered channel (capacity 5)
(let ((ch (make-instance 'buffered-channel :size 5)))
  (send ch "hello")
  (send ch "world")
  (recv ch)     ; => "hello"
  (recv ch))    ; => "world"

;;; Manual queue using bordeaux-threads (no library)
(defclass thread-queue ()
  ((items    :initform '()          :accessor q-items)
   (lock     :initform (bt:make-lock) :accessor q-lock)
   (cvar     :initform (bt:make-condition-variable) :accessor q-cvar)))

(defun q-push (queue item)
  (bt:with-lock-held ((q-lock queue))
    (push item (q-items queue))
    (bt:condition-notify (q-cvar queue))))

(defun q-pop (queue)
  (bt:with-lock-held ((q-lock queue))
    (loop while (null (q-items queue))
          do (bt:condition-wait (q-cvar queue) (q-lock queue)))
    (pop (q-items queue))))
```

## Gotchas

- `chanl` is a community library not part of the standard — install via Quicklisp.
- `send` on an unbuffered channel blocks the sending thread until a receiver is ready; forgetting this causes deadlocks in single-threaded test code.
- The `lparallel` library provides a `queue` data structure with blocking `push-queue`/`pop-queue` that is simpler than rolling a condition-variable queue manually.
