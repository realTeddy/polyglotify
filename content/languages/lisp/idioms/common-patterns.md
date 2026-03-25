---
title: "Common Patterns"
language: "lisp"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Classic Common Lisp patterns include: **macros for DSLs** (extending the language syntax), **CLOS for extensible dispatch**, **higher-order functions** (`mapcar`, `reduce`, `apply`), **dynamic binding** for context-threading without passing arguments, **the condition system** for recovery, and **the REPL-driven development loop** (write a little, test immediately). Accumulator patterns use `loop ... collecting` or `nreverse` of a built-up list.

## Example

```common-lisp
;;; Pattern: using loop for collection/accumulation
(loop for i from 1 to 10
      when (oddp i)
      collect (* i i))
; => (1 9 25 49 81)

;;; Pattern: memoization with hash tables
(defun make-memoized (fn)
  (let ((cache (make-hash-table :test #'equal)))
    (lambda (&rest args)
      (multiple-value-bind (cached found-p)
          (gethash args cache)
        (if found-p
            cached
            (setf (gethash args cache) (apply fn args)))))))

(defvar *fib* nil)
(setf *fib*
      (make-memoized
        (lambda (n)
          (if (< n 2) n
              (+ (funcall *fib* (- n 1))
                 (funcall *fib* (- n 2)))))))
(funcall *fib* 40)   ; => 102334155 (fast due to memoization)

;;; Pattern: with-* macros for resource management
(defmacro with-logged-errors ((&key (stream *error-output*)) &body body)
  `(handler-case (progn ,@body)
     (error (c)
       (format ,stream "ERROR: ~a~%" c)
       nil)))

(with-logged-errors (:stream t)
  (/ 1 0))   ; prints "ERROR: division by zero"

;;; Pattern: defun with &rest for variadic functions
(defun println (&rest args)
  (apply #'format t "~&~{~a~^ ~}~%" args))

(println "hello" "world" 42)   ; hello world 42
```

## Gotchas

- The `nreverse` pattern (build a list with `push`, then reverse at the end) is more efficient than repeatedly appending to the end of a list, since `append` is O(n) and creates copies.
- Macros expand at compile time — ensure macro-generated code is hygienically scoped using `gensym` to avoid variable capture: `(let ((#:tmp ...)) ...)`.
- Dynamic variables are powerful for context threading (like request context in a web app) but can be subtle: a `let` rebinding is only visible to code called within that `let` form's dynamic extent.
