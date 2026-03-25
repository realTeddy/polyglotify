---
title: "Sets"
language: "lisp"
feature: "sets"
category: "data-structures"
applicable: true
---

Common Lisp provides set operations built on top of lists: `union`, `intersection`, `set-difference`, `subsetp`, and `member`. These operate on unordered lists treated as sets. For large sets, a hash table is used as a membership test (O(1) lookup) and these list-based functions are avoided. There is no dedicated set data type in the standard library, but the list-based operations cover common needs.

## Example

```common-lisp
;;; Set operations on lists (O(n²) but convenient for small sets)
(defvar *set-a* '(1 2 3 4 5))
(defvar *set-b* '(3 4 5 6 7))

(union *set-a* *set-b*)               ; => (1 2 3 4 5 6 7)  (no duplicates)
(intersection *set-a* *set-b*)        ; => (3 4 5)
(set-difference *set-a* *set-b*)      ; => (1 2)   (in A but not B)
(subsetp '(3 4) *set-a*)              ; => T
(member 3 *set-a*)                    ; => (3 4 5) (the tail — truthy)
(member 9 *set-a*)                    ; => NIL

;;; Custom equality
(union '("a" "b") '("b" "c") :test #'string=)   ; => ("a" "b" "c")

;;; Hash-table based set for performance
(defun make-hash-set (items)
  (let ((ht (make-hash-table :test #'equal)))
    (dolist (item items ht)
      (setf (gethash item ht) t))))

(defun set-member-p (item ht)
  (gethash item ht))

(let ((s (make-hash-set '("apple" "banana" "cherry"))))
  (set-member-p "banana" s)   ; => T, T
  (set-member-p "grape" s))   ; => NIL, NIL

;;; Adding / removing
(defun set-add (item ht) (setf (gethash item ht) t) ht)
(defun set-remove (item ht) (remhash item ht) ht)
```

## Gotchas

- The list-based set functions (`union`, `intersection`, etc.) do not guarantee the order of elements in the result.
- `member` uses `eql` by default — use `:test #'equal` for string membership or `:test #'equalp` for case-insensitive matching.
- `adjoin` adds an element to a set-list only if it is not already present: `(adjoin 3 '(1 2 3))` returns `(1 2 3)` (unchanged); `(adjoin 4 '(1 2 3))` returns `(4 1 2 3)`.
