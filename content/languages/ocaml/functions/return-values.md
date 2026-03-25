---
title: "Return Values"
language: "ocaml"
feature: "return-values"
category: "functions"
applicable: true
---

OCaml functions return the value of their body expression — there is no `return` keyword. Multiple return values use tuples. Side-effectful functions that return nothing return `unit` (`()`). The `|>` (pipe) and `@@` (reverse application) operators enable ergonomic value threading. Pattern matching destructures return values at the call site.

## Example

```ocaml
(* Return value is the last expression *)
let square x = x * x

(* Multiple return via tuple *)
let min_max lst =
  let sorted = List.sort compare lst in
  (List.hd sorted, List.hd (List.rev sorted))

(* Returning unit for side effects *)
let log msg =
  Printf.printf "[LOG] %s\n" msg
  (* implicitly returns () *)

(* Pattern matching on return value *)
let (lo, hi) = min_max [3; 1; 4; 1; 5; 9]
let () = Printf.printf "min=%d max=%d\n" lo hi

(* Result type — option *)
let safe_head = function
  | []     -> None
  | x :: _ -> Some x

let () =
  match safe_head [1; 2; 3] with
  | Some v -> Printf.printf "head=%d\n" v
  | None   -> print_string "empty\n"

(* Pipe operator *)
let process nums =
  nums
  |> List.filter (fun x -> x mod 2 = 0)
  |> List.map (fun x -> x * x)
  |> List.fold_left (+) 0

let () = Printf.printf "result=%d\n" (process [1;2;3;4;5])
```

## Gotchas

- There is no `return` keyword; functions always return the last expression's value.
- A function returning `unit` still has a return type; you can use `ignore` to explicitly discard a non-unit value.
- `|>` (pipe) passes the left value as the last argument; `@@` is function application with low precedence.
