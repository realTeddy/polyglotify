---
title: "Function Declaration"
language: "ocaml"
feature: "declaration"
category: "functions"
applicable: true
---

OCaml functions are declared with `let name param1 param2 = body`. All functions are curried by default — a multi-argument function is a chain of single-argument functions. `let rec` enables recursion. Functions are first-class values. Type annotations are optional. Mutually recursive functions use `let rec f ... and g ...`.

## Example

```ocaml
(* Basic function *)
let add a b = a + b

(* With type annotations *)
let multiply (a : int) (b : int) : int = a * b

(* Recursive function *)
let rec factorial n =
  if n <= 1 then 1
  else n * factorial (n - 1)

(* Pattern matching in function body *)
let rec length = function
  | []     -> 0
  | _ :: t -> 1 + length t

(* Mutually recursive functions *)
let rec is_even n =
  if n = 0 then true else is_odd (n - 1)
and is_odd n =
  if n = 0 then false else is_even (n - 1)

(* Curried function — partial application *)
let add5 = add 5      (* partially applied *)

let () =
  Printf.printf "%d\n" (add 3 4)
  ; Printf.printf "%d\n" (factorial 5)
  ; Printf.printf "%d\n" (length [1; 2; 3])
  ; Printf.printf "%d\n" (add5 10)
  ; Printf.printf "%b %b\n" (is_even 4) (is_odd 7)
```

## Gotchas

- All OCaml functions are automatically curried; `let f x y = x + y` is equivalent to `let f = fun x -> fun y -> x + y`.
- Forgetting `rec` on a recursive function causes the function to refer to an outer `f` (or fail to compile if there's no outer `f`).
- `let () = expr` is the idiom for executing side-effectful expressions at module level.
