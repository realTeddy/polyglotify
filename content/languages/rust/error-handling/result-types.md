---
title: "Result Types"
language: "rust"
feature: "result-types"
category: "error-handling"
applicable: true
---

`Result<T, E>` is Rust's built-in type for fallible operations. It is an enum with two variants: `Ok(T)` for success and `Err(E)` for failure. The `?` operator propagates errors by returning `Err` early from the current function. The `thiserror` and `anyhow` crates are widely used to reduce boilerplate in library and application error handling respectively.

## Example

```rust
use std::fs;
use std::io;
use std::num::ParseIntError;

#[derive(Debug)]
enum AppError {
    Io(io::Error),
    Parse(ParseIntError),
}

impl From<io::Error> for AppError {
    fn from(e: io::Error) -> Self { AppError::Io(e) }
}
impl From<ParseIntError> for AppError {
    fn from(e: ParseIntError) -> Self { AppError::Parse(e) }
}

fn read_number(path: &str) -> Result<i32, AppError> {
    let contents = fs::read_to_string(path)?;  // io::Error -> AppError via From
    let n = contents.trim().parse::<i32>()?;    // ParseIntError -> AppError via From
    Ok(n * 2)
}

fn main() {
    match read_number("number.txt") {
        Ok(n)  => println!("Doubled: {n}"),
        Err(e) => eprintln!("Error: {e:?}"),
    }
}
```

## Gotchas

- The `?` operator calls `From::from` on the error, so your function's error type must implement `From<E>` for every error type you propagate with `?`.
- `Result` is `#[must_use]`; ignoring a `Result` without consuming it produces a compiler warning.
- For applications (not libraries), `anyhow::Result` is often simpler: it erases the error type so `?` works with any `std::error::Error` without manual `From` impls.
