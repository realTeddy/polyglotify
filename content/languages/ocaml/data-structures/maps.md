---
title: "Maps & Dictionaries"
language: "ocaml"
feature: "maps"
category: "data-structures"
applicable: true
---

OCaml's standard library provides `Map.Make(Ord)` — a persistent (immutable) balanced binary tree map. The `Hashtbl` module provides a mutable hash map. The `Map` functor approach requires creating a module for each key type; third-party libraries like `Base` (Jane Street) provide more ergonomic maps.

## Example

```ocaml
(* Create a String map module *)
module StringMap = Map.Make(String)

(* Build maps — each operation returns a new map *)
let m0 = StringMap.empty
let m1 = StringMap.add "name"  "Alice" m0
let m2 = StringMap.add "city"  "NYC"   m1
let m3 = StringMap.add "email" "alice@example.com" m2

(* Lookup *)
let name = StringMap.find "name" m3
let () = Printf.printf "name = %s\n" name

(* Safe lookup *)
let opt = StringMap.find_opt "missing" m3
let () = match opt with
  | Some v -> Printf.printf "found: %s\n" v
  | None   -> print_string "not found\n"

(* Remove, check membership *)
let m4   = StringMap.remove "city" m3
let has  = StringMap.mem "name" m4
let () = Printf.printf "has name: %b\n" has

(* Iterate *)
let () = StringMap.iter
  (fun k v -> Printf.printf "%s => %s\n" k v)
  m3

(* Hashtbl — mutable hash map *)
let ht = Hashtbl.create 16
let () =
  Hashtbl.add ht "x" 1;
  Hashtbl.add ht "y" 2;
  Printf.printf "x = %d\n" (Hashtbl.find ht "x")
```

## Gotchas

- `Map.Make` creates a new module; you must do this for each key type, which is verbose.
- Persistent maps return new maps on every `add`/`remove`; the original is unmodified.
- `Hashtbl.find` raises `Not_found` on missing keys; use `Hashtbl.find_opt` for safe access.
