---
title: "Maps & Dictionaries"
language: "lisp"
feature: "maps"
category: "data-structures"
applicable: true
---

Common Lisp provides three map-like structures: **hash tables** (`make-hash-table`) for general-purpose O(1) lookup, **association lists** (alists — a list of `(key . value)` pairs) for small maps and functional-style manipulation, and **property lists** (plists — flat lists of alternating key/value) used in symbol properties. Hash tables are mutable; alists are idiomatic for functional-style code.

## Example

```common-lisp
;;; Hash table
(let ((ht (make-hash-table :test #'equal)))  ; :equal for string keys
  (setf (gethash "name" ht) "Alice")
  (setf (gethash "age"  ht) 30)

  (gethash "name" ht)          ; => "Alice", T
  (gethash "missing" ht "default")  ; => "default", NIL

  ;; Check presence
  (multiple-value-bind (val found-p)
      (gethash "age" ht)
    (format t "~a found: ~a~%" val found-p))  ; "30 found: T"

  ;; Iterate
  (maphash (lambda (k v)
             (format t "~a => ~a~%" k v))
           ht)

  ;; Remove
  (remhash "age" ht)
  (hash-table-count ht))  ; => 1

;;; Association list (alist)
(let ((env '((x . 10) (y . 20) (z . 30))))
  (assoc 'y env)            ; => (Y . 20)
  (cdr (assoc 'y env))      ; => 20
  (acons 'w 40 env))        ; => ((W . 40) (X . 10) ...)

;;; Property list (plist)
(let ((props '(:name "Bob" :age 25 :admin t)))
  (getf props :name)          ; => "Bob"
  (getf props :missing "n/a") ; => "n/a"
  (setf (getf props :age) 26)
  props)
```

## Gotchas

- `make-hash-table` defaults to `#'eql` for key comparison, which works for symbols and integers but not strings — use `:test #'equal` for string keys.
- `gethash` returns two values: the value and a boolean `found-p`. Always use `multiple-value-bind` when the value might legitimately be `nil`.
- Alists search linearly (O(n)) — fine for small maps and useful for functional "shadowing" (adding a new binding at the front shadows older ones), but slow for large maps.
