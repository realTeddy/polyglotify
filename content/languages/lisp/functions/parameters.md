---
title: "Parameters & Arguments"
language: "lisp"
feature: "parameters"
category: "functions"
applicable: true
---

Common Lisp has one of the most powerful parameter systems of any language. Lambda lists support required parameters, `&optional` (with defaults), `&rest` (variadic), `&key` (keyword arguments with defaults), and `&aux` (local variables). These can be combined in one function. Keyword arguments allow callers to pass arguments in any order by name.

## Example

```common-lisp
;;; Required parameters
(defun add (a b) (+ a b))
(add 3 4)   ; => 7

;;; Optional parameters with defaults
(defun greet (&optional (name "World"))
  (format nil "Hello, ~a!" name))
(greet)           ; => "Hello, World!"
(greet "Alice")   ; => "Hello, Alice!"

;;; Rest parameter (variadic)
(defun my-list (&rest items)
  items)
(my-list 1 2 3 4)   ; => (1 2 3 4)

;;; Keyword parameters
(defun create-user (&key (name "Anonymous")
                         (age 0)
                         (admin nil))
  (list :name name :age age :admin admin))

(create-user :name "Alice" :age 30)
; => (:NAME "Alice" :AGE 30 :ADMIN NIL)

(create-user :age 25 :name "Bob")  ; order doesn't matter
; => (:NAME "Bob" :AGE 25 :ADMIN NIL)

;;; Supplied-p parameter (know if arg was actually passed)
(defun show (&optional (x 0 x-supplied-p))
  (if x-supplied-p
      (format t "You passed: ~a~%" x)
      (format t "Using default: ~a~%" x)))

;;; Combined
(defun complex-fn (required &optional opt1
                              &rest rest-args
                              &key key1 key2
                              &aux (local (* required 2)))
  (list required opt1 rest-args key1 key2 local))
```

## Gotchas

- `&rest` collects remaining positional arguments into a list, but `&key` is processed from the rest list — you can use both, but `&rest` will include the keyword symbols and their values.
- `&optional` and `&key` should not be mixed in the same lambda list (it is valid but confusing and error-prone).
- Keyword argument symbols use the keyword package (`:name`, not `name`) at the call site; the parameter name in the lambda list does not have the colon.
