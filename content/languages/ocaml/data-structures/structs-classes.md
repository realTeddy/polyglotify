---
title: "Structs & Classes"
language: "ocaml"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

OCaml records are the equivalent of structs — named, typed fields in an immutable (by default) aggregate type. Mutable fields use the `mutable` keyword. Functional update syntax (`{ r with field = val }`) creates a new record with updated fields. OCaml also has a full OOP class system, but records + modules are the idiomatic functional approach.

## Example

```ocaml
(* Record type — immutable by default *)
type person = {
  name    : string;
  age     : int;
  email   : string;
}

(* Record with mutable field *)
type counter = {
  mutable value : int;
  step          : int;
}

(* Construction *)
let alice = { name = "Alice"; age = 30; email = "alice@example.com" }

(* Field access *)
let () = Printf.printf "%s is %d\n" alice.name alice.age

(* Functional update — creates a new record *)
let older_alice = { alice with age = 31 }
let () = Printf.printf "updated age: %d\n" older_alice.age

(* Pattern matching on records *)
let greet { name; age; _ } =
  Printf.printf "Hello %s, you are %d\n" name age

let () = greet alice

(* Mutable record update *)
let c = { value = 0; step = 2 }
let () =
  c.value <- c.value + c.step;
  Printf.printf "counter: %d\n" c.value
```

## Gotchas

- Record field labels must be unique within a module scope (or at least unambiguous); label shadowing can cause confusion.
- `{ alice with age = 31 }` does *not* mutate `alice`; it creates a new record.
- Mutable fields use `<-` for assignment: `record.field <- new_value`.
