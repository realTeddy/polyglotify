---
title: "Interfaces & Traits"
language: "lisp"
feature: "interfaces"
category: "oop"
applicable: true
---

CLOS has no separate interface or trait keyword, but **generic functions** serve the same role. Defining a generic function with `defgeneric` declares a contract: any class that implements a `defmethod` for that generic function participates in the "interface". This is structural (duck) typing enforced at dispatch time. Mixin classes provide reusable behavior similar to traits without enforcing an explicit contract.

## Example

```common-lisp
;;; Generic functions as interfaces
;;; Defining the "interface" (contract)
(defgeneric serialize (object stream)
  (:documentation "Write object to stream in a serializable format."))

(defgeneric deserialize (class stream)
  (:documentation "Read and return an object of class from stream."))

(defgeneric validate (object)
  (:documentation "Return T if object is valid, NIL otherwise."))

;;; "Implementing" the interface for a specific class
(defclass user ()
  ((name  :initarg :name  :accessor user-name)
   (email :initarg :email :accessor user-email)))

(defmethod serialize ((u user) stream)
  (format stream "~s ~s" (user-name u) (user-email u)))

(defmethod validate ((u user))
  (and (stringp (user-name u))
       (not (string= "" (user-name u)))
       (find #\@ (user-email u))))

;;; Any class can participate just by adding a defmethod
(defclass product ()
  ((sku  :initarg :sku  :accessor product-sku)
   (price :initarg :price :accessor product-price)))

(defmethod validate ((p product))
  (and (stringp (product-sku p))
       (numberp (product-price p))
       (> (product-price p) 0)))

;;; Polymorphic dispatch
(defun process (items)
  (mapcar (lambda (item)
            (if (validate item)
                (with-output-to-string (s)
                  (serialize item s))
                "INVALID"))
          items))
```

## Gotchas

- There is no compile-time verification that a class "implements" a generic function — calling a generic with an object that has no applicable method signals a `no-applicable-method` error at runtime.
- `no-applicable-method` can be customized by defining a method on `no-applicable-method` itself — useful for graceful degradation.
- Mixin classes used as traits should be placed early in the superclass list so their methods have higher priority in the CPL.
