---
title: "Parameters & Arguments"
language: "ocaml"
feature: "parameters"
category: "functions"
applicable: true
---

OCaml supports positional parameters, labeled parameters (`~label`), optional parameters (`?label`), and the unit parameter `()` for side-effectful functions. All functions are curried. Labeled parameters can be passed in any order. Optional parameters have default values. Pattern matching can destructure parameters directly.

## Example

```ocaml
(* Labeled parameters *)
let connect ~host ~port =
  Printf.printf "Connecting to %s:%d\n" host port

(* Labeled parameters can be in any order *)
let () = connect ~port:443 ~host:"example.com"

(* Optional parameter with default *)
let greet ?(greeting = "Hello") name =
  Printf.printf "%s, %s!\n" greeting name

let () =
  greet "Alice";                       (* Hello, Alice! *)
  greet ~greeting:"Hi" "Bob"           (* Hi, Bob! *)

(* Unit parameter for delayed evaluation *)
let make_random () = Random.int 100

(* Pattern matching in parameter *)
let fst (a, _) = a
let snd (_, b) = b

(* Destructure record in param *)
type point = { x : float; y : float }
let length { x; y } = sqrt (x *. x +. y *. y)

let p = { x = 3.0; y = 4.0 }
let () = Printf.printf "length = %f\n" (length p)

(* Partial application via currying *)
let add a b = a + b
let add10 = add 10

let () = Printf.printf "%d\n" (add10 5)
```

## Gotchas

- Optional parameters (`?label`) must come before required parameters that follow them; placement affects currying.
- Labeled parameters enable any-order passing, but positional parameters are still positional.
- The unit parameter `()` prevents a function from being partially applied prematurely (prevents "floating" side effects).
