---
title: "Exceptions & Try/Catch"
language: "lisp"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Common Lisp has a **condition system** that is significantly more powerful than traditional try/catch exceptions. Conditions are objects in a class hierarchy. `signal`, `error`, and `warn` raise conditions. `handler-case` is the equivalent of try/catch. `handler-bind` installs handlers without unwinding the stack, enabling restarts. The restart system allows recovering from errors at the signaling point, which is unique to Common Lisp.

## Example

```common-lisp
;;; Define custom conditions
(define-condition file-parse-error (error)
  ((filename :initarg :filename :reader error-filename)
   (line-num :initarg :line-num :reader error-line-num))
  (:report (lambda (c s)
             (format s "Parse error in ~a at line ~a"
                     (error-filename c)
                     (error-line-num c)))))

;;; HANDLER-CASE (like try/catch)
(handler-case
    (progn
      (error 'file-parse-error :filename "data.csv" :line-num 42)
      "success")
  (file-parse-error (c)
    (format nil "Caught: ~a" c))
  (error (c)
    (format nil "Other error: ~a" c)))

;;; IGNORE-ERRORS (suppress all errors, return nil on failure)
(ignore-errors (/ 1 0))    ; => NIL, DIVISION-BY-ZERO

;;; The restart system — restart at the point of error
(defun parse-number (str)
  (restart-case
      (let ((n (parse-integer str :junk-allowed nil)))
        (if n n (error 'parse-error :datum str :expected-type 'integer)))
    (use-value (v)
      :report "Provide a replacement value"
      v)
    (use-zero ()
      :report "Use 0 as the default"
      0)))

;;; Handler that invokes a restart (no stack unwinding!)
(handler-bind
    ((parse-error (lambda (c)
                    (declare (ignore c))
                    (invoke-restart 'use-zero))))
  (parse-number "abc"))   ; => 0  (handler invoked restart, no stack unwind)
```

## Gotchas

- `handler-case` unwinds the stack before calling the handler (like try/catch). `handler-bind` does not unwind — the handler runs in the dynamic context of the error, which is what enables restarts.
- `error` always signals a condition of type `error`; `warn` signals a `warning` (continuable by default); `signal` signals any condition (continuable if not `error`).
- The restart system is Common Lisp's killer feature for interactive development — in a REPL, unhandled errors enter the debugger where restarts can be invoked interactively.
