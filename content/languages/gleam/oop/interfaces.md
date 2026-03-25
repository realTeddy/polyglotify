---
title: "Interfaces & Traits"
language: "gleam"
feature: "interfaces"
category: "oop"
applicable: false
---

Gleam has no interfaces or typeclasses. Polymorphic behaviour is achieved via generic type parameters and higher-order functions (passing function values that implement behaviour). There is no structural or nominal subtyping for custom types.

## Example

```gleam
// Gleam achieves polymorphism via higher-order functions
// Instead of an interface, pass the implementation as a function

pub type Encoder(a) {
  Encoder(encode: fn(a) -> String)
}

pub fn encode_list(encoder: Encoder(a), items: List(a)) -> List(String) {
  list.map(items, encoder.encode)
}

// "Implementing the interface" means providing a value
let int_encoder = Encoder(encode: int.to_string)
let str_encoder = Encoder(encode: fn(s) { "\"" <> s <> "\"" })

// Usage:
// encode_list(int_encoder, [1, 2, 3])     // ["1", "2", "3"]
// encode_list(str_encoder, ["a", "b"])    // ["\"a\"", "\"b\""]
```

## Gotchas

- The lack of typeclasses means you cannot write `fn show(x: Show) -> String` with an implicit dictionary — you must pass the implementation explicitly.
- This design is more verbose but also more explicit and easier to reason about.
- Gleam's team has discussed adding typeclasses in the future; check release notes for updates.
- On the JavaScript target, FFI can expose JS class-based interfaces, but these are not surfaced as Gleam types.
