---
title: "Generics"
language: "lisp"
feature: "generics"
category: "oop"
applicable: true
---

Common Lisp achieves generic programming through its dynamic type system and multiple dispatch. A single generic function works on any type that has an applicable method — no type parameters are needed. For truly type-agnostic algorithms, Common Lisp's sequence functions work on any sequence type (lists, vectors, strings). Parametric polymorphism as a compile-time concept does not exist, but runtime polymorphism through generic functions is ubiquitous.

## Example

```common-lisp
;;; Generic function — works on any type via multiple dispatch
(defgeneric container-add (container item)
  (:documentation "Add an item to a container."))

(defgeneric container-count (container)
  (:documentation "Return the number of items."))

;;; Implementation for a list-based stack
(defclass stack ()
  ((items :initform '() :accessor stack-items)))

(defmethod container-add ((s stack) item)
  (push item (stack-items s))
  s)

(defmethod container-count ((s stack))
  (length (stack-items s)))

;;; Implementation for a hash-set
(defclass bag ()
  ((items :initform (make-hash-table :test #'equal)
           :accessor bag-items)))

(defmethod container-add ((b bag) item)
  (setf (gethash item (bag-items b)) t)
  b)

(defmethod container-count ((b bag))
  (hash-table-count (bag-items b)))

;;; Generic algorithm — works on anything implementing the interface
(defun fill-container (container items)
  (dolist (item items container)
    (container-add container item)))

;;; Works for both types without any type parameters
(let ((s (make-instance 'stack))
      (b (make-instance 'bag)))
  (fill-container s '(1 2 3 4 3 2 1))
  (fill-container b '(1 2 3 4 3 2 1))
  (list (container-count s)   ; => 7 (duplicates kept in stack)
        (container-count b))) ; => 4 (unique items in bag)
```

## Gotchas

- Lisp's generics are purely runtime — there is no monomorphization or compile-time type checking. Type errors manifest as `no-applicable-method` or type errors at runtime.
- Multiple dispatch is more powerful than single dispatch (Java/Python style) but makes it harder to reason about which method will be called when multiple arguments have methods defined.
- Type declarations with `declare` can be used alongside generic functions to give the compiler optimization hints, but they do not restrict which methods are applicable.
