---
title: "Variables & Declaration"
language: "ocaml"
feature: "variables"
category: "basics"
applicable: true
---

OCaml uses `let` for immutable bindings (the default and idiomatic style) and `ref` for mutable references. There is no `var` keyword — mutation requires explicit reference cells. `let x = expr` creates an immutable binding; `let x = ref expr` creates a mutable cell accessed with `!x` and updated with `:=`. Local bindings use `let ... in`.

## Example

```ocaml
(* Immutable let binding *)
let name = "Alice"
let age  = 30
let pi   = 3.14159

(* Mutable reference *)
let counter = ref 0
counter := !counter + 1   (* update *)
Printf.printf "counter = %d\n" !counter

(* Local binding with let...in *)
let result =
  let x = 10 in
  let y = 20 in
  x + y
in
Printf.printf "result = %d\n" result

(* Shadowing — a new binding, not mutation *)
let x = 5
let x = x + 1   (* x is now 6, old x is shadowed *)

(* Tuple destructuring *)
let (a, b) = (1, "hello")
Printf.printf "%d %s\n" a b

(* Underscore for unused *)
let (_, second) = (10, 20)
Printf.printf "%d\n" second
```

## Gotchas

- `let x = 5` followed by `let x = 6` does *not* mutate; it creates a new binding that shadows the old one.
- `!x` dereferences a `ref`; forgetting it and using `x` directly gives you the ref cell, not the value.
- `let` at the module level is global; `let ... in` is a local expression — they look similar but behave differently.
