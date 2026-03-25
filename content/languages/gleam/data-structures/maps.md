---
title: "Maps & Dictionaries"
language: "gleam"
feature: "maps"
category: "data-structures"
applicable: true
---

Gleam provides `Dict(key, value)` in the `gleam/dict` module (formerly `gleam/map`). Dicts are immutable hash maps. All keys must be of the same type, and all values must be of the same type. Lookup returns `Result(value, Nil)`, forcing explicit handling of missing keys.

## Example

```gleam
import gleam/io
import gleam/dict
import gleam/option.{Some, None}

pub fn main() {
  // Creation
  let scores = dict.from_list([
    #("Alice", 95),
    #("Bob",   82),
    #("Carol", 88),
  ])

  // Lookup
  let alice_score = dict.get(scores, "Alice")  // Ok(95)
  let dave_score  = dict.get(scores, "Dave")   // Error(Nil)

  io.debug(alice_score)
  io.debug(dave_score)

  // Insert / update (returns new dict)
  let updated = dict.insert(scores, "Dave", 75)
  io.debug(dict.get(updated, "Dave"))

  // Delete
  let removed = dict.delete(scores, "Bob")
  io.debug(dict.size(removed))

  // Iterate
  dict.each(scores, fn(name, score) {
    io.println(name <> ": " <> int.to_string(score))
  })

  // Keys and values
  let keys   = dict.keys(scores)
  let values = dict.values(scores)
  io.debug(keys)
  io.debug(values)
}
```

## Gotchas

- `dict.get` returns `Result(v, Nil)`, not `Option(v)`. You must handle the `Error(Nil)` case.
- Dicts are immutable — `dict.insert` and `dict.delete` return new dicts; the original is unchanged.
- Key types must support equality. Custom types work as keys if they implement equality (which all Gleam types do structurally).
- The module was renamed from `gleam/map` to `gleam/dict` in stdlib v0.34 — older code may use `map.`.
