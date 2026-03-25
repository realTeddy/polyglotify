---
title: "Inheritance"
language: "ocaml"
feature: "inheritance"
category: "oop"
applicable: true
---

OCaml supports class inheritance via `inherit`. Subclasses extend parent classes, can override methods, and call parent methods with `super`. Virtual methods (declared with `virtual`) must be overridden. However, the idiomatic OCaml approach to polymorphism uses **variant types + pattern matching** or **modules + first-class modules**, not class hierarchies.

## Example

```ocaml
(* Base class *)
class shape color =
  object (self)
    val color : string = color
    method get_color = color
    method virtual area : float
    method describe =
      Printf.printf "%s shape, area=%.2f\n" color self#area
  end

(* Subclass *)
class circle color radius =
  object
    inherit shape color
    val radius : float = radius
    method area = Float.pi *. radius *. radius
  end

class rectangle color w h =
  object
    inherit shape color
    val width  : float = w
    val height : float = h
    method area = width *. height
  end

(* Polymorphism via object types *)
let print_area (s : < area : float; describe : unit; .. >) =
  s#describe

let () =
  let c = new circle "red"  5.0   in
  let r = new rectangle "blue" 4.0 3.0 in
  print_area c;
  print_area r

(* Idiomatic alternative using variants *)
type shape_v = Circle of float | Rect of float * float

let area_v = function
  | Circle r  -> Float.pi *. r *. r
  | Rect(w,h) -> w *. h
```

## Gotchas

- OCaml's object types are structural: any object with the required methods is compatible, regardless of class.
- `inherit` without overriding picks up all parent methods; call parent method with `(super : < method : ... > )#method`.
- For most OCaml code, variant types + pattern matching are preferred over class inheritance.
