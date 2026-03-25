---
title: "Sets"
language: "ocaml"
feature: "sets"
category: "data-structures"
applicable: true
---

OCaml sets use `Set.Make(Ord)` — a persistent balanced binary tree set. Like `Map`, a new module is created for each element type. Sets support union, intersection, difference, membership, and iteration. All operations return new sets (persistent data structure). The `Base` library from Jane Street provides more ergonomic set APIs.

## Example

```ocaml
(* Create a String set module *)
module StringSet = Set.Make(String)

let s1 = StringSet.of_list ["apple"; "banana"; "cherry"; "date"]
let s2 = StringSet.of_list ["cherry"; "date"; "elderberry"; "fig"]

(* Membership *)
let () = Printf.printf "has apple: %b\n" (StringSet.mem "apple" s1)
let () = Printf.printf "has fig:   %b\n" (StringSet.mem "fig"   s1)

(* Add and remove *)
let s3 = StringSet.add "grape" s1
let s4 = StringSet.remove "apple" s3

(* Set operations *)
let union = StringSet.union s1 s2
let inter = StringSet.inter  s1 s2
let diff  = StringSet.diff   s1 s2    (* s1 - s2 *)

let () =
  print_string "union: ";
  StringSet.iter (fun x -> Printf.printf "%s " x) union;
  print_newline ()

let () =
  print_string "inter: ";
  StringSet.iter (fun x -> Printf.printf "%s " x) inter;
  print_newline ()

(* Size and conversion *)
let () = Printf.printf "size=%d\n" (StringSet.cardinal s1)
let lst = StringSet.elements s1   (* sorted list *)
let () = List.iter (Printf.printf "%s ") lst; print_newline ()

(* Int set *)
module IntSet = Set.Make(Int)
let nums = IntSet.of_list [5; 3; 1; 4; 1; 5; 9]
let () = Printf.printf "unique=%d\n" (IntSet.cardinal nums)
```

## Gotchas

- Sets are ordered by the comparison function; `elements` returns a sorted list.
- `Set.Make` requires the element type to have a `compare` function; primitive types (String, Int) work directly.
- Like `Map`, set operations return new sets — originals are immutable.
