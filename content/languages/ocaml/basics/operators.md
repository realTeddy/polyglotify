---
title: "Operators"
language: "ocaml"
feature: "operators"
category: "basics"
applicable: true
---

OCaml has separate operator sets for integers and floats: `+`, `-`, `*`, `/` for integers; `+.`, `-.`, `*.`, `/.` for floats. Comparison operators (`=`, `<>`, `<`, `>`, `<=`, `>=`) work on any type with structural equality. `==` is physical (pointer) equality. String concatenation uses `^`. Operators are regular functions and can be used with `(+)` prefix syntax.

## Example

```ocaml
(* Integer arithmetic *)
let a = 10
let b = 3
let () =
  Printf.printf "%d %d %d %d %d\n" (a+b) (a-b) (a*b) (a/b) (a mod b)

(* Float arithmetic — note the dots *)
let x = 3.0
let y = 2.0
let () =
  Printf.printf "%f %f %f %f\n" (x+.y) (x-.y) (x*.y) (x/.y)

(* Comparison — structural equality *)
let () =
  Printf.printf "%b %b %b\n" (a = 10) (a <> b) (a < 20)

(* Physical equality (pointer identity) *)
let s1 = "hello"
let s2 = "hello"
let () =
  Printf.printf "structural: %b\n" (s1 = s2)    (* true *)
(* Printf.printf "physical: %b\n" (s1 == s2)  -- implementation-defined *)

(* String concatenation *)
let greeting = "Hello" ^ ", " ^ "World!"

(* Operators as functions *)
let sum = List.fold_left (+) 0 [1; 2; 3; 4; 5]

(* Boolean operators *)
let () =
  Printf.printf "%b %b %b\n" (true && false) (true || false) (not true)
```

## Gotchas

- Using `+` on floats is a type error; you must use `+.`; this prevents silent precision loss.
- `=` is structural (deep) equality; `==` is physical (pointer) equality — use `=` almost always.
- `<>` is "not equal" (not `!=`).
