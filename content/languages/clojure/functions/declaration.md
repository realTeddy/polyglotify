---
title: "Function Declaration"
language: "clojure"
feature: "declaration"
category: "functions"
applicable: true
---

Functions are first-class values in Clojure. `defn` defines a named function; `fn` creates an anonymous function; `#(...)` is the reader shorthand. Functions can have multiple arities in a single definition.

## Example

```clojure
;; defn: define a named function
(defn greet [name]
  (str "Hello, " name "!"))

(greet "Alice")   ; "Hello, Alice!"

;; Docstring
(defn square
  "Returns the square of a number."
  [x]
  (* x x))

;; Multiple arities in one defn
(defn greet
  ([name] (greet name "Hello"))
  ([name greeting] (str greeting ", " name "!")))

(greet "Alice")            ; "Hello, Alice!"
(greet "Bob" "Hi")         ; "Hi, Bob!"

;; Anonymous function
(def double (fn [x] (* x 2)))

;; Reader shorthand: # is the anonymous fn, %1 %2 etc are args
(def triple #(* % 3))     ; % is shorthand for %1 when one arg
(triple 5)   ; 15

;; Private function
(defn- internal-helper [x]
  (* x x))

;; Recursive function
(defn factorial [n]
  (if (<= n 1)
    1
    (* n (factorial (dec n)))))

;; Tail-recursive version
(defn factorial-tr
  ([n] (factorial-tr n 1))
  ([n acc]
   (if (<= n 1)
     acc
     (recur (dec n) (* acc n)))))
```

## Gotchas

- `defn` is a macro that expands to `(def name (fn [...] ...))`
- Multi-arity functions are defined with `([args] body)` clauses inside a single `defn`
- `recur` jumps to the nearest enclosing `fn` or `loop` in tail position — use it to avoid stack overflow in recursion
