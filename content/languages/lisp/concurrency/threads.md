---
title: "Threads"
language: "lisp"
feature: "threads"
category: "concurrency"
applicable: true
---

Common Lisp's ANSI standard does not define a threading API, but all major implementations provide threads. The **Bordeaux Threads** library provides a portable abstraction over SBCL, CCL, CMUCL, ABCL, and others. SBCL's native `sb-thread` package is commonly used directly. Threads share the Lisp heap; synchronization uses mutexes, condition variables, and atomic operations.

## Example

```common-lisp
;;; Using Bordeaux Threads (portable)
;;; (ql:quickload :bordeaux-threads)
(use-package :bordeaux-threads)

;; Spawn a thread
(let ((thread (make-thread
                (lambda ()
                  (format t "Thread running!~%")
                  42)
                :name "my-thread")))
  (join-thread thread))   ; => 42 (thread's return value)

;; Mutex for shared state
(defparameter *counter* 0)
(defparameter *lock* (make-lock "counter-lock"))

(defun increment-counter ()
  (with-lock-held (*lock*)
    (incf *counter*)))

;; Spawn 10 threads, each incrementing counter 1000 times
(let ((threads
        (loop repeat 10
              collect (make-thread
                        (lambda ()
                          (dotimes (i 1000)
                            (increment-counter)))))))
  (mapc #'join-thread threads)
  *counter*)   ; => 10000 (no race condition)

;; Condition variable
(defparameter *condition* (make-condition-variable))
(defparameter *ready-p* nil)

(make-thread (lambda ()
               (with-lock-held (*lock*)
                 (loop until *ready-p*
                       do (condition-wait *condition* *lock*)))
               (format t "Got the signal!~%")))

(with-lock-held (*lock*)
  (setf *ready-p* t)
  (condition-notify *condition*))
```

## Gotchas

- Bordeaux Threads is not part of ANSI Common Lisp — install it with Quicklisp: `(ql:quickload :bordeaux-threads)`.
- Dynamic special variables (those with `*earmuffs*`) defined with `defvar`/`defparameter` are per-thread when rebound with `let` inside a thread — each thread gets its own rebinding.
- SBCL's garbage collector is stop-the-world; long GC pauses affect all threads simultaneously. Use pools of pre-allocated objects for latency-sensitive concurrent code.
