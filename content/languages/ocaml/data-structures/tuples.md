---
title: "Tuples"
language: "ocaml"
feature: "tuples"
category: "data-structures"
applicable: true
---

OCaml tuples are heterogeneous, immutable, fixed-length, product types written `(a, b, c)`. The type is `t1 * t2 * t3`. Tuples are the idiomatic way to return multiple values. Pattern matching destructures tuples. The standard library `fst` and `snd` functions extract pair components.

## Example

```ocaml
(* 2-tuple (pair) *)
let pair = (42, "hello")
let () =
  let (n, s) = pair in
  Printf.printf "%d %s\n" n s

(* Standard fst / snd *)
let () =
  Printf.printf "%d\n" (fst pair);
  Printf.printf "%s\n" (snd pair)

(* 3-tuple *)
let triple = (1, 2.0, "three")
let (a, b, c) = triple
let () = Printf.printf "%d %f %s\n" a b c

(* Tuple as function return *)
let divide_with_remainder a b =
  (a / b, a mod b)

let (q, r) = divide_with_remainder 17 5
let () = Printf.printf "%d rem %d\n" q r

(* Nested pattern matching *)
let describe_pair = function
  | (0, 0) -> "origin"
  | (x, 0) -> Printf.sprintf "on x-axis at %d" x
  | (0, y) -> Printf.sprintf "on y-axis at %d" y
  | (x, y) -> Printf.sprintf "at (%d, %d)" x y

let () = print_string (describe_pair (3, 0)); print_newline ()
let () = print_string (describe_pair (2, 5)); print_newline ()

(* List of tuples *)
let entries = [("Alice", 30); ("Bob", 25); ("Carol", 35)]
let () = List.iter (fun (name, age) ->
  Printf.printf "%s is %d\n" name age) entries
```

## Gotchas

- Tuples are not indexed numerically; use pattern matching to extract components beyond pairs.
- `(a, b, c)` and `((a, b), c)` are different types (`int * int * int` vs `(int * int) * int`).
- Comma without parentheses creates a tuple in some contexts; use parentheses to be explicit.
