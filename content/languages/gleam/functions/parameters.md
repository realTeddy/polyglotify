---
title: "Parameters & Arguments"
language: "gleam"
feature: "parameters"
category: "functions"
applicable: true
---

Gleam supports both positional and labelled arguments. Labels allow callers to pass arguments by name in any order, improving readability. A parameter can have a different external label and internal name. Gleam does not have variadic functions or default values.

## Example

```gleam
import gleam/io

// Labelled parameters: label comes before internal name
pub fn greet(name name: String, greeting greeting: String) -> String {
  greeting <> ", " <> name <> "!"
}

// Mixed: label differs from internal name
pub fn repeat(string value: String, times count: Int) -> String {
  case count {
    0 -> ""
    n -> value <> repeat(string: value, times: n - 1)
  }
}

pub fn main() {
  // Call with labels (any order)
  let msg = greet(greeting: "Hello", name: "Alice")
  io.println(msg)

  let r = repeat(string: "ab", times: 3)
  io.println(r)
}
```

## Gotchas

- When a parameter has a label, callers **must** use the label (or use the `_` discard form). Positional calls bypass labels.
- Labelled arguments can be supplied in any order at the call site.
- There are no optional parameters, default values, or `*args`/`**kwargs` equivalents. Use a custom type or `Option(a)` to simulate optional args.
- The label and the internal name can be the same — write `pub fn f(x x: Int)` — but this is redundant; shorthand `pub fn f(x: Int)` makes both the label and name `x`.
