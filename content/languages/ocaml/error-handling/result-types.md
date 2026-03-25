---
title: "Result Types"
language: "ocaml"
feature: "result-types"
category: "error-handling"
applicable: true
---

OCaml's standard library (since 4.08) includes the `result` type: `type ('a, 'e) result = Ok of 'a | Error of 'e`. It is the idiomatic way to handle expected failures. The `Result` module provides `map`, `bind`, `fold`, and other combinators. The `let*` syntax (with `result` monad binding) enables clean chaining in OCaml 4.08+.

## Example

```ocaml
(* result type is built in: Ok 'a | Error 'e *)

(* Functions returning result *)
let parse_int s =
  match int_of_string_opt s with
  | Some n -> Ok n
  | None   -> Error ("not a number: " ^ s)

let safe_sqrt x =
  if x < 0.0 then Error "sqrt of negative"
  else Ok (sqrt x)

(* Pattern matching *)
let () =
  match parse_int "42" with
  | Ok n    -> Printf.printf "parsed: %d\n" n
  | Error e -> Printf.printf "error: %s\n" e

(* Result.map, Result.bind *)
let double_parse s =
  parse_int s |> Result.map (fun n -> n * 2)

let () =
  match double_parse "21" with
  | Ok n    -> Printf.printf "doubled: %d\n" n
  | Error e -> Printf.printf "error: %s\n" e

(* Chaining with bind (monadic) *)
let ( let* ) = Result.bind

let compute s =
  let* n = parse_int s in
  let* sq = safe_sqrt (float_of_int n) in
  Ok sq

let () =
  match compute "25" with
  | Ok v    -> Printf.printf "sqrt: %.2f\n" v
  | Error e -> Printf.printf "error: %s\n" e
```

## Gotchas

- `Result.bind f r` applies `f` only if `r` is `Ok`; errors propagate automatically.
- The `let* x = result_expr in` syntax (monadic let) requires defining `let ( let* ) = Result.bind`.
- `Option` and `Result` are different types; `Option.to_result ~none:err opt` converts between them.
