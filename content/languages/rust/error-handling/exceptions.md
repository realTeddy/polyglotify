---
title: "Exceptions & Try/Catch"
language: "rust"
feature: "exceptions"
category: "error-handling"
applicable: false
---

Rust has no exceptions or try/catch. Recoverable errors are represented by `Result<T, E>` values. Unrecoverable errors use `panic!`, which unwinds the stack (or aborts, depending on configuration) and cannot be caught in normal code. The `std::panic::catch_unwind` function exists but is intended only for FFI boundaries and test harnesses, not general error handling.

## Example

```rust
// panic for truly unrecoverable programmer errors
fn get_first(v: &[i32]) -> i32 {
    if v.is_empty() {
        panic!("called get_first on empty slice");
    }
    v[0]
}

// Result for expected, recoverable errors
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("division by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 3.0) {
        Ok(result) => println!("{result:.4}"),
        Err(e)     => eprintln!("Error: {e}"),
    }
    println!("{}", get_first(&[1, 2, 3]));
}
```

## Gotchas

- `panic!` in a library is almost always a design mistake; return `Result` or `Option` so the caller can decide how to handle the failure.
- By default, panics unwind the stack and drop values; setting `panic = "abort"` in `Cargo.toml` produces a smaller binary but skips destructors.
- `unwrap()` and `expect()` cause panics on `None`/`Err` and should only be used when you can logically prove the value is present, or in test/prototype code.
