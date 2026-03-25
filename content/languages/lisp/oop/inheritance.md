---
title: "Inheritance"
language: "lisp"
feature: "inheritance"
category: "oop"
applicable: true
---

CLOS supports multiple inheritance. A class can list multiple superclasses and inherits slots and methods from all of them. Method resolution follows the **Class Precedence List** (CPL), computed using the C3 linearization algorithm. The `call-next-method` function calls the next applicable method in the CPL. Mixins — classes with no direct instances, used to add behavior — are idiomatic in CLOS.

## Example

```common-lisp
;;; Multiple inheritance with mixins
(defclass printable-mixin ()
  ())

(defmethod print-info ((obj printable-mixin))
  (format t "<~a>~%" (class-name (class-of obj))))

(defclass serializable-mixin ()
  ())

(defmethod to-string ((obj serializable-mixin))
  (format nil "~s" obj))

;;; Base class
(defclass shape ()
  ((color :initarg :color :accessor shape-color :initform :white)))

(defmethod area ((s shape)) 0.0)

;;; Derived class with multiple parents (including mixins)
(defclass circle (shape printable-mixin serializable-mixin)
  ((radius :initarg :radius :accessor circle-radius :initform 1.0)))

(defmethod area ((c circle))
  (* pi (expt (circle-radius c) 2)))

;;; call-next-method
(defmethod describe-shape ((s shape))
  (format t "Color: ~a~%" (shape-color s)))

(defmethod describe-shape ((c circle))
  (format t "Circle with radius ~a~%" (circle-radius c))
  (call-next-method))   ; calls the shape method

;;; Usage
(let ((c (make-instance 'circle :color :red :radius 5.0)))
  (area c)              ; => 78.539...
  (describe-shape c)    ; Circle with radius 5.0\nColor: RED
  (print-info c))       ; <CIRCLE>
```

## Gotchas

- Class Precedence List order matters for slot shadowing and method dispatch: the leftmost superclass in the class definition has higher priority.
- `call-next-method` must be called within a method to invoke the next most specific method; calling it when there is no next method signals an error.
- Diamond inheritance (two paths to the same ancestor) is handled gracefully by the CPL — the ancestor appears only once, preventing method duplication.
