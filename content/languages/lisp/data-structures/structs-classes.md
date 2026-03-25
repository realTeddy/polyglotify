---
title: "Structs & Classes"
language: "lisp"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Common Lisp provides two mechanisms for aggregate data: `defstruct` (simple, efficient, generates accessor functions automatically) and CLOS classes (`defclass`). `defstruct` is preferred for plain data records — it auto-generates a constructor, predicate, copy function, and slot accessors. CLOS is used when inheritance, method dispatch, or metaclass customization is needed.

## Example

```common-lisp
;;; DEFSTRUCT — simple, fast, auto-generated accessors
(defstruct person
  (name   ""  :type string)
  (age    0   :type integer)
  (email  nil :type (or string null)))

;;; Auto-generated: make-person, person-p, copy-person, person-name, ...
(let ((p (make-person :name "Alice" :age 30 :email "alice@example.com")))
  (person-name  p)    ; => "Alice"
  (person-age   p)    ; => 30
  (person-p     p)    ; => T  (type predicate)

  ;; Mutation
  (setf (person-age p) 31)
  (person-age p))     ; => 31

;;; DEFCLASS — CLOS, for OOP
(defclass vehicle ()
  ((make  :initarg :make  :accessor vehicle-make  :initform "Unknown")
   (model :initarg :model :accessor vehicle-model :initform "Unknown")
   (year  :initarg :year  :accessor vehicle-year  :initform 2000)))

(let ((car (make-instance 'vehicle
                           :make "Toyota"
                           :model "Camry"
                           :year 2022)))
  (vehicle-make car)     ; => "Toyota"
  (setf (vehicle-year car) 2023)
  car)
```

## Gotchas

- `defstruct` generates names by prefixing the struct name: `(defstruct point x y)` generates `make-point`, `point-x`, `point-y`, `point-p`, `copy-point`. These pollute the namespace.
- By default, `defstruct` creates structures that print as `#S(POINT :X 3 :Y 4)` and can be read back in with the reader — useful for serialization but beware if slots contain non-readable objects.
- CLOS slot accessors are generic functions, so they participate in method dispatch and can be extended with `:before`, `:after`, and `:around` methods.
