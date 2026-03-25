---
title: "Testing"
language: "gleam"
feature: "testing"
category: "ecosystem"
applicable: true
---

Gleam uses **gleeunit** as its standard test framework, which wraps Erlang's `eunit`. Tests are functions ending in `_test` inside the `test/` directory. The `gleeunit/should` module provides assertion helpers. Run tests with `gleam test`.

## Example

```gleam
// test/my_app_test.gleam
import gleeunit
import gleeunit/should
import my_app/math

pub fn main() {
  gleeunit.main()
}

pub fn add_test() {
  math.add(2, 3)
  |> should.equal(5)
}

pub fn divide_returns_error_on_zero_test() {
  math.safe_divide(10, 0)
  |> should.be_error()
}

pub fn divide_ok_test() {
  math.safe_divide(10, 2)
  |> should.be_ok()
  |> should.equal(5)
}

pub fn list_operations_test() {
  [1, 2, 3]
  |> list.map(fn(x) { x * 2 })
  |> should.equal([2, 4, 6])
}
```

```sh
gleam test          # Run all tests
gleam test --target javascript  # Run on JS target
```

## Gotchas

- Test functions must end in `_test` — this is how gleeunit discovers them.
- There is no `describe`/`it` block nesting — all tests are flat functions.
- Test failures show as crashes with the mismatched values — the error messages are clear but minimal.
- Property-based testing is available via `quickcheck`-style libraries like `qcheck_gleam`.
