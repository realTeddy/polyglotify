---
title: "Control Flow"
language: "ocaml"
feature: "control-flow"
category: "basics"
applicable: true
---

OCaml control flow is expression-based: `if/then/else`, `match`, `for`, `while`, and sequencing with `;`. `match` is the primary branching construct — exhaustive pattern matching over any type. `for` and `while` loops are for imperative code only; functional iteration uses recursion and higher-order functions. Every expression has a type, including `if`.

## Example

```ocaml
(* if/then/else — an expression *)
let classify n =
  if n > 0 then "positive"
  else if n < 0 then "negative"
  else "zero"

(* match — exhaustive pattern matching *)
type day = Mon | Tue | Wed | Thu | Fri | Sat | Sun

let is_weekend d =
  match d with
  | Sat | Sun -> true
  | _         -> false

(* Match with guards *)
let describe_int n =
  match n with
  | 0             -> "zero"
  | n when n < 0  -> "negative"
  | n when n > 100 -> "large"
  | _             -> "small positive"

(* for loop (imperative) *)
let () =
  for i = 1 to 5 do
    Printf.printf "%d " i
  done;
  print_newline ()

(* while loop *)
let () =
  let i = ref 0 in
  while !i < 5 do
    Printf.printf "%d " !i;
    i := !i + 1
  done;
  print_newline ()

(* Functional iteration over list *)
let () =
  List.iter (fun x -> Printf.printf "%d " x) [1; 2; 3; 4; 5];
  print_newline ()

let () =
  print_string (classify 7); print_newline ();
  print_string (describe_int 0); print_newline ()
```

## Gotchas

- `if` without `else` has type `unit`; if the `then` branch returns a non-unit type, an `else` branch is required.
- `match` is exhaustive; a missing case is a compiler warning (and may raise `Match_failure` at runtime).
- `for` loops are inclusive: `for i = 1 to 5` iterates 1, 2, 3, 4, 5.
