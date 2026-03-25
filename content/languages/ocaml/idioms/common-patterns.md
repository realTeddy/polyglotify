---
title: "Common Patterns"
language: "ocaml"
feature: "common-patterns"
category: "idioms"
applicable: true
---

OCaml idioms center on algebraic data types + pattern matching, the pipe operator `|>`, monadic chaining with `let*`, modules as namespaces, functors for generic data structures, and the option/result types for error handling. OCaml code is expression-oriented — almost everything is an expression with a value.

## Example

```ocaml
(* 1. Algebraic data types + pattern matching *)
type expr =
  | Num of float
  | Add of expr * expr
  | Mul of expr * expr

let rec eval = function
  | Num n       -> n
  | Add (a, b)  -> eval a +. eval b
  | Mul (a, b)  -> eval a *. eval b

let () =
  let e = Add (Mul (Num 2.0, Num 3.0), Num 4.0) in
  Printf.printf "%.1f\n" (eval e)   (* 10.0 *)

(* 2. Pipe operator for readable data transformation *)
let () =
  [1; 2; 3; 4; 5; 6; 7; 8; 9; 10]
  |> List.filter (fun x -> x mod 2 = 0)
  |> List.map (fun x -> x * x)
  |> List.fold_left (+) 0
  |> Printf.printf "sum of even squares: %d\n"

(* 3. Option chaining *)
let find_user id =
  if id = 1 then Some "Alice" else None

let greet_user id =
  match find_user id with
  | Some name -> Printf.printf "Hello, %s\n" name
  | None      -> print_string "User not found\n"

(* 4. Module as namespace *)
module Config = struct
  let host    = "localhost"
  let port    = 8080
  let timeout = 30
end

let () = Printf.printf "%s:%d\n" Config.host Config.port

(* 5. Tail-recursive accumulator *)
let rec sum_tr acc = function
  | []     -> acc
  | x :: t -> sum_tr (acc + x) t

let () = Printf.printf "%d\n" (sum_tr 0 [1;2;3;4;5])
```

## Gotchas

- Non-tail-recursive functions on large lists will overflow the stack; use accumulator pattern or `List.fold_left`.
- `|>` pipes the left value as the *last* argument; this aligns with OCaml's standard library conventions.
- Exhaustive `match` is enforced by the compiler warning W8 (non-exhaustive patterns); always handle `_` or all cases.
