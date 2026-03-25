---
title: "Arrays & Lists"
language: "ocaml"
feature: "arrays"
category: "data-structures"
applicable: true
---

OCaml has two primary sequential types: **lists** (immutable singly-linked lists, `[1; 2; 3]`) and **arrays** (mutable, fixed-size, O(1) access, `[|1; 2; 3|]`). Lists are the idiomatic functional choice for most data; arrays are used when mutation or random access is needed. The `List` and `Array` modules provide operations.

## Example

```ocaml
(* Lists — immutable, singly-linked *)
let lst = [1; 2; 3; 4; 5]

(* Prepend O(1) *)
let lst2 = 0 :: lst

(* Destructuring *)
let head :: tail = lst   (* warning if non-exhaustive *)
let () = Printf.printf "head=%d, tail len=%d\n" head (List.length tail)

(* List operations *)
let doubled  = List.map (fun x -> x * 2) lst
let evens    = List.filter (fun x -> x mod 2 = 0) lst
let total    = List.fold_left (+) 0 lst
let rev      = List.rev lst
let appended = lst @ [6; 7; 8]    (* append — O(n) *)

let () = List.iter (Printf.printf "%d ") doubled; print_newline ()

(* Arrays — mutable, O(1) access *)
let arr = [| 10; 20; 30; 40; 50 |]

let () = Printf.printf "arr.(0) = %d\n" arr.(0)

(* Mutation *)
arr.(2) <- 99;
let () = Printf.printf "arr.(2) = %d\n" arr.(2)

(* Array operations *)
let sorted = Array.copy arr |> (fun a -> Array.sort compare a; a)
let () = Array.iter (Printf.printf "%d ") sorted; print_newline ()
```

## Gotchas

- Lists are 0-indexed when accessed via `List.nth` but pattern matching is idiomatic for head/tail.
- Arrays use `.(i)` syntax for access and `<-` for mutation: `arr.(0) <- 42`.
- Appending lists `@` is O(n); prepending `::` is O(1) — prefer building lists in reverse then reversing.
