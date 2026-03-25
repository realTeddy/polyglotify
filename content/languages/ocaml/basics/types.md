---
title: "Types & Type Systems"
language: "ocaml"
feature: "types"
category: "basics"
applicable: true
---

OCaml has a powerful static type system with Hindley-Milner type inference — types are almost always inferred without annotations. Primitive types: `int`, `float`, `bool`, `char`, `string`, `unit`. Compound types: tuples, records, variants (algebraic data types), lists, arrays. Polymorphic types use `'a`, `'b` (type variables). The type system guarantees null safety via `option`.

## Example

```ocaml
(* Primitive types — all inferred *)
let i   = 42          (* int *)
let f   = 3.14        (* float *)
let b   = true        (* bool *)
let c   = 'A'         (* char *)
let s   = "hello"     (* string *)
let u   = ()          (* unit — the only value of type unit *)

(* Type annotations (optional) *)
let n : int    = 100
let x : float  = 2.5

(* Algebraic data type (variant) *)
type color = Red | Green | Blue | Custom of int * int * int

let col = Custom (255, 128, 0)

(* Option type — replaces null *)
let maybe_int : int option = Some 42
let nothing   : int option = None

(* Parameterized type *)
type 'a pair = { fst : 'a; snd : 'a }

let int_pair = { fst = 1;  snd = 2  }
let str_pair = { fst = "a"; snd = "b" }

(* Type alias *)
type point = float * float

let origin : point = (0.0, 0.0)

let () =
  Printf.printf "%d %f %b\n" i f b
```

## Gotchas

- OCaml integers are 63-bit on 64-bit systems (one bit is used by the GC tag).
- `float` operations use `+.`, `-.`, `*.`, `/.` (note the dot); mixing `int` and `float` arithmetic requires explicit conversion.
- `option` is not nullable — you cannot assign `None` to an `int`; you must use `int option`.
