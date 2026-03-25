---
title: "Classes"
language: "ocaml"
feature: "classes"
category: "oop"
applicable: true
---

OCaml has a full class system with `class`, `object`, methods, instance variables, inheritance, and virtual methods. However, the idiomatic OCaml style uses **records + modules** (functional approach) rather than classes. The class system is available for imperative or interop use cases but is considered advanced and less common in modern OCaml code.

## Example

```ocaml
(* OCaml class syntax *)
class counter init_val =
  object (self)
    val mutable value = init_val
    val step = 1

    method get = value
    method increment = value <- value + step
    method reset = value <- 0
    method describe =
      Printf.printf "Counter at %d\n" value
  end

(* Instantiate with `new` *)
let c = new counter 0
let () =
  c#increment;
  c#increment;
  c#increment;
  Printf.printf "value = %d\n" c#get;
  c#describe

(* Class with type parameter *)
class ['a] container init =
  object
    val mutable data : 'a = init
    method get = data
    method set x = data <- x
  end

let box = new container 42
let () = Printf.printf "box = %d\n" box#get;
box#set 100;
Printf.printf "box = %d\n" box#get
```

## Gotchas

- OCaml classes use `#` for method calls (`obj#method`), not `.`.
- Classes are structurally typed in OCaml — objects are compatible if they have the required methods, regardless of class name.
- Prefer records + module functions for new code; use classes when OOP patterns are genuinely needed (e.g., GUI toolkits).
