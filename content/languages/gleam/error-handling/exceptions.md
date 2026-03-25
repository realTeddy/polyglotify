---
title: "Exceptions & Try/Catch"
language: "gleam"
feature: "exceptions"
category: "error-handling"
applicable: false
---

Gleam has no exceptions or try/catch mechanism. All recoverable errors are represented as `Result(value, error)` values returned from functions. Gleam runs on the BEAM (Erlang VM), so unrecoverable errors crash the current process and are handled by OTP supervisors — the "let it crash" philosophy.

## Example

```gleam
import gleam/io

// No exceptions — errors are values
pub fn parse_int(s: String) -> Result(Int, String) {
  case int.parse(s) {
    Ok(n)  -> Ok(n)
    Error(_) -> Error("Not a valid integer: " <> s)
  }
}

pub fn main() {
  // Handle errors explicitly
  case parse_int("42") {
    Ok(n)    -> io.debug(n)
    Error(e) -> io.println("Error: " <> e)
  }

  case parse_int("abc") {
    Ok(n)    -> io.debug(n)
    Error(e) -> io.println("Error: " <> e)
  }

  // Chain with ? operator (early return on Error)
  // Only usable inside fn returning Result
}
```

## Gotchas

- There is truly no `try/catch` in Gleam. If you need to catch BEAM exceptions from Erlang FFI, use `gleam_erlang`'s `rescue` function, which wraps an Erlang catch.
- On the JavaScript target, JavaScript exceptions from JS FFI calls also need explicit handling or FFI wrappers.
- Panics (like index out of bounds) crash the process — on the BEAM this is recoverable via OTP supervision trees.
- The absence of exceptions is intentional: it forces explicit error handling and makes function signatures informative.
