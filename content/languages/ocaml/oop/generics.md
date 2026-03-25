---
title: "Generics"
language: "ocaml"
feature: "generics"
category: "oop"
applicable: true
---

OCaml generics use **type variables** (`'a`, `'b`, etc.) inferred by the Hindley-Milner type system — you rarely need to write them explicitly. Parameterized types like `'a list`, `'a option`, and custom types like `type 'a tree = ...` are OCaml's generics. **Functors** provide module-level generics, parameterizing a whole module over a type and its operations.

## Example

```ocaml
(* Polymorphic function — 'a inferred *)
let identity x = x                (* 'a -> 'a *)
let const x _  = x                (* 'a -> 'b -> 'a *)
let swap (a, b) = (b, a)          (* 'a * 'b -> 'b * 'a *)

(* Parameterized type *)
type 'a tree =
  | Leaf
  | Node of 'a tree * 'a * 'a tree

let rec insert x = function
  | Leaf -> Node (Leaf, x, Leaf)
  | Node (l, v, r) ->
    if x < v      then Node (insert x l, v, r)
    else if x > v then Node (l, v, insert x r)
    else                Node (l, v, r)

let rec to_list = function
  | Leaf          -> []
  | Node (l, v, r) -> to_list l @ [v] @ to_list r

(* Generic pair *)
type ('a, 'b) either = Left of 'a | Right of 'b

(* Usage *)
let () =
  let t = List.fold_right insert [5; 3; 7; 1; 4] Leaf in
  List.iter (Printf.printf "%d ") (to_list t);
  print_newline ()

let () =
  Printf.printf "%d\n"  (identity 42);
  Printf.printf "%s\n"  (identity "hello");
  let (a, b) = swap (1, "one") in
  Printf.printf "%s %d\n" b a
```

## Gotchas

- OCaml's type inference deduces type parameters automatically; explicit annotations are rarely needed.
- Type variables are lowercase with a tick: `'a`, `'b`, `'key`, `'value` — any name after `'` works.
- For operations that require a comparison or hash function (e.g., sorting), use functors (`Set.Make`, `Map.Make`) rather than passing functions implicitly.
