---
title: "Closures & Lambdas"
language: "ocaml"
feature: "closures"
category: "functions"
applicable: true
---

OCaml has first-class anonymous functions created with `fun param -> body`. All OCaml functions are closures — they naturally capture variables from their enclosing scope. Partial application of curried functions creates closures implicitly. Higher-order functions like `List.map`, `List.filter`, and `List.fold_left` are central to the style.

## Example

```ocaml
(* Anonymous function *)
let square = fun x -> x * x
let () = Printf.printf "%d\n" (square 5)

(* Multi-arg lambda *)
let add = fun a b -> a + b

(* Closure — captures outer variable *)
let make_adder n =
  fun x -> x + n     (* closes over n *)

let add10 = make_adder 10
let () = Printf.printf "%d\n" (add10 5)   (* 15 *)

(* Mutable closure *)
let make_counter () =
  let count = ref 0 in
  fun () ->
    count := !count + 1;
    !count

let next = make_counter ()
let () =
  Printf.printf "%d\n" (next ());   (* 1 *)
  Printf.printf "%d\n" (next ());   (* 2 *)
  Printf.printf "%d\n" (next ())    (* 3 *)

(* Higher-order functions *)
let nums = [1; 2; 3; 4; 5]
let doubled  = List.map (fun x -> x * 2) nums
let evens    = List.filter (fun x -> x mod 2 = 0) nums
let total    = List.fold_left (+) 0 nums

(* Partial application creates implicit closures *)
let add5 = (+) 5                   (* fun x -> 5 + x *)
let result = List.map add5 nums
```

## Gotchas

- Closures in OCaml capture variables by reference (as `ref` cells) when those variables are mutable.
- `let f = fun x -> ...` and `let f x = ...` are equivalent; the latter is just syntactic sugar.
- The `function` keyword creates a one-argument lambda that immediately pattern-matches: `function | [] -> 0 | _ -> 1`.
