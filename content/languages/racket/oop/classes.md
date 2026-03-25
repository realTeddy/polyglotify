---
title: "Classes"
language: "racket"
feature: "classes"
category: "oop"
applicable: true
---

Racket includes a full class system in the `racket/class` library, supporting single inheritance, mixins, interfaces, and dynamic dispatch. Classes are first-class values. Methods are defined with `define/public`, `define/private`, etc. Instances are created with `new`. Unlike struct-based idioms, the class system is best suited for GUI programming and interop with Java-style OOP.

## Example

```racket
#lang racket
(require racket/class)

(define animal%
  (class object%
    (super-new)
    (init-field name)

    (define/public (speak)
      (format "~a makes a sound." name))

    (define/public (get-name) name)))

(define dog%
  (class animal%
    (super-new)

    (define/override (speak)
      (format "~a says: Woof!" (send this get-name)))))

(define d (new dog% [name "Rex"]))
(send d speak)       ; => "Rex says: Woof!"
(send d get-name)    ; => "Rex"
(is-a? d dog%)       ; => #t
(is-a? d animal%)    ; => #t
```

## Gotchas

- Class names conventionally end with `%` to distinguish them from struct names.
- Methods are called with `send`, not dot notation.
- The class system is separate from Racket's struct system; structs are idiomatic for data; classes are used when you need inheritance and dynamic dispatch.
