---
title: "Exceptions & Try/Catch"
language: "ocaml"
feature: "exceptions"
category: "error-handling"
applicable: true
---

OCaml has exceptions declared with `exception Name of type`. They are raised with `raise` and caught with `try ... with`. Pattern matching handles multiple exception types. OCaml exceptions are O(1) to raise but have stack-unwinding cost. The idiomatic modern style prefers `result` types for expected failures, reserving exceptions for truly exceptional conditions.

## Example

```ocaml
(* Declare exceptions *)
exception Division_by_zero
exception Not_found of string
exception Validation_error of { field: string; message: string }

(* Raise *)
let safe_div a b =
  if b = 0 then raise Division_by_zero
  else a / b

(* try...with — pattern matching on exceptions *)
let () =
  try
    let result = safe_div 10 0 in
    Printf.printf "result = %d\n" result
  with
  | Division_by_zero ->
    print_string "Error: division by zero\n"
  | Not_found key ->
    Printf.printf "Not found: %s\n" key
  | exn ->
    Printf.printf "Unknown: %s\n" (Printexc.to_string exn)

(* Re-raise *)
let process x =
  try safe_div 100 x
  with Division_by_zero ->
    Printf.printf "Caught and re-raising\n";
    raise Division_by_zero

(* Fun.protect — ensure cleanup even on exception *)
let with_resource acquire release f =
  let r = acquire () in
  Fun.protect
    ~finally:(fun () -> release r)
    (fun () -> f r)
```

## Gotchas

- OCaml's built-in `Not_found` exception (from the standard library) carries no message; use your own typed exceptions for better error messages.
- `Printexc.to_string exn` prints any exception as a string — useful for logging unknown exceptions.
- `Fun.protect ~finally` (OCaml 4.08+) is the standard way to ensure cleanup code runs, replacing `try/with` + `raise`.
