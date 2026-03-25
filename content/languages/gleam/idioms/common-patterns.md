---
title: "Common Patterns"
language: "gleam"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Gleam idioms revolve around the pipe operator `|>`, exhaustive pattern matching, and `Result`-based error handling. The `use` expression flattens callback-heavy code. Custom opaque types provide abstraction. The "builder" pattern uses record update syntax.

## Example

```gleam
import gleam/io
import gleam/list
import gleam/result
import gleam/string

// 1. Pipe operator for data transformation pipelines
pub fn process_names(names: List(String)) -> List(String) {
  names
  |> list.filter(fn(n) { string.length(n) > 2 })
  |> list.map(string.uppercase)
  |> list.sort(string.compare)
}

// 2. Result chaining with use
pub fn parse_and_double(s: String) -> Result(Int, String) {
  use n <- result.try(
    int.parse(s) |> result.map_error(fn(_) { "not a number" })
  )
  Ok(n * 2)
}

// 3. Opaque type for encapsulation
pub opaque type Email {
  Email(value: String)
}

pub fn new_email(s: String) -> Result(Email, String) {
  case string.contains(s, "@") {
    True  -> Ok(Email(s))
    False -> Error("Invalid email")
  }
}

pub fn email_string(e: Email) -> String {
  e.value
}

// 4. Recursive data processing
pub fn sum(nums: List(Int)) -> Int {
  list.fold(nums, 0, fn(acc, n) { acc + n })
}

pub fn main() {
  ["alice", "bo", "charlie", "di"]
  |> process_names
  |> io.debug
}
```

## Gotchas

- Prefer `list.fold`/`list.map`/`list.filter` over explicit recursion when possible.
- The `use` expression only works with functions of type `fn(fn(a) -> b) -> b` (callback-accepting functions).
- Opaque types cannot be constructed or destructured outside their defining module — this enforces invariants.
- The pipe `|>` inserts the left-hand value as the **first** argument; use `fn(x) { f(x, other_arg) }` when you need it elsewhere.
