---
title: "Interfaces & Traits"
language: "ocaml"
feature: "interfaces"
category: "oop"
applicable: false
---

OCaml has no explicit interface keyword. The equivalent mechanisms are: (1) **module signatures** (`.mli` files or `module type`) which declare what a module must provide — the primary abstraction mechanism; (2) **structural object types** (`< method : type; .. >`) for ad-hoc object compatibility; and (3) **functors** for parameterizing modules over other modules that satisfy a signature.

## Example

```ocaml
(* Module signature as interface *)
module type COMPARABLE = sig
  type t
  val compare : t -> t -> int
  val to_string : t -> string
end

(* Implementing the interface *)
module IntComparable : COMPARABLE with type t = int = struct
  type t = int
  let compare = Int.compare
  let to_string = string_of_int
end

(* Functor parameterized over the interface *)
module MakeSet (C : COMPARABLE) = struct
  type t = C.t list   (* simplified *)
  let empty = []
  let add x s = if List.mem x s then s else List.sort C.compare (x :: s)
  let mem = List.mem
  let to_string s = "[" ^ String.concat "; " (List.map C.to_string s) ^ "]"
end

module IntSet = MakeSet(IntComparable)

let () =
  let s = IntSet.empty
        |> IntSet.add 3
        |> IntSet.add 1
        |> IntSet.add 2 in
  Printf.printf "%s\n" (IntSet.to_string s)
```

## Gotchas

- Module signatures (`.mli`) are the primary abstraction tool; they hide implementation details and form the public API.
- Functors take modules as arguments and return modules — more powerful than interfaces but also more verbose.
- Object types `< method : 'a; .. >` (structural subtyping) are a lightweight interface mechanism for object-oriented code.
