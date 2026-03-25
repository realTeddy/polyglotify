---
title: "Parameters & Arguments"
language: "racket"
feature: "parameters"
category: "functions"
applicable: true
---

Racket supports positional parameters, optional parameters with defaults, rest parameters (variadic), and keyword parameters. Optional parameters use the `[name default]` syntax. Keyword arguments use `#:keyword` in both the definition and call site. Rest arguments collect extra positional arguments into a list using the dot notation.

## Example

```racket
#lang racket

; Required parameters
(define (add x y) (+ x y))

; Optional parameter with default
(define (greet name [greeting "Hello"])
  (string-append greeting ", " name "!"))

(greet "Alice")            ; => "Hello, Alice!"
(greet "Bob" "Hi")         ; => "Hi, Bob!"

; Rest / variadic
(define (my-list . items) items)
(my-list 1 2 3)  ; => '(1 2 3)

; Keyword parameters
(define (make-rect #:width w #:height h)
  (* w h))

(make-rect #:width 4 #:height 5)  ; => 20

; Keyword with default
(define (connect host #:port [port 80])
  (format "~a:~a" host port))

(connect "example.com")            ; => "example.com:80"
(connect "example.com" #:port 443) ; => "example.com:443"
```

## Gotchas

- Optional parameters must come after all required parameters.
- Keyword arguments can be passed in any order at the call site.
- Mixing rest args and keyword args is tricky; if both are needed, the rest parameter collects only positional extras that appear before the first keyword.
