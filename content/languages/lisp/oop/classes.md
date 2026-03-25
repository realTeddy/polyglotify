---
title: "Classes"
language: "lisp"
feature: "classes"
category: "oop"
applicable: true
---

Common Lisp's object system is **CLOS** (Common Lisp Object System), one of the most powerful object systems in any language. Classes are defined with `defclass`. Methods are defined with `defmethod` and are not owned by classes — they are generic functions that dispatch on one or more argument types simultaneously (multiple dispatch). `make-instance` creates objects. Slots (fields) are declared with `:initarg`, `:initform`, `:accessor`, `:reader`, `:writer`.

## Example

```common-lisp
;;; Class definition
(defclass animal ()
  ((name   :initarg :name
            :accessor animal-name
            :initform "Unknown")
   (sound  :initarg :sound
            :reader   animal-sound
            :initform "...")))

;;; Subclass
(defclass dog (animal)
  ((breed :initarg :breed
           :accessor dog-breed
           :initform "Mixed")))

;;; Initialize instance hook
(defmethod initialize-instance :after ((d dog) &key)
  (unless (slot-boundp d 'sound)
    (setf (slot-value d 'sound) "Woof")))

;;; Generic function and methods
(defgeneric speak (animal)
  (:documentation "Make the animal speak."))

(defmethod speak ((a animal))
  (format t "~a says ~a!~%" (animal-name a) (animal-sound a)))

(defmethod speak :before ((d dog))
  (format t "[Dog is about to speak]~%"))

;;; Usage
(let ((rex (make-instance 'dog :name "Rex" :breed "Labrador")))
  (animal-name rex)    ; => "Rex"
  (dog-breed rex)      ; => "Labrador"
  (speak rex))
; [Dog is about to speak]
; Rex says Woof!
```

## Gotchas

- CLOS methods are defined *outside* the class, on *generic functions* — not inside the class definition. This is a fundamental departure from most OO languages.
- `slot-value` bypasses accessors and directly accesses slot storage; prefer accessors for encapsulation.
- `:before`, `:after`, and `:around` method qualifiers allow wrapping behavior around a primary method — a flexible alternative to calling `super`.
