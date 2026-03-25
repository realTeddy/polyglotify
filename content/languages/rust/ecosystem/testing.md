---
title: "Testing"
language: "rust"
feature: "testing"
category: "ecosystem"
applicable: true
---

Rust has built-in testing support with the `#[test]` attribute. Unit tests typically live in a `#[cfg(test)]` module inside the source file. Integration tests go in the `tests/` directory. The standard library provides `assert!`, `assert_eq!`, and `assert_ne!` macros. `cargo test` runs all tests in parallel by default.

## Example

```rust
pub fn add(a: i32, b: i32) -> i32 { a + b }

pub fn divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 { None } else { Some(a / b) }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn test_divide_by_zero() {
        assert_eq!(divide(1.0, 0.0), None);
    }

    #[test]
    #[should_panic(expected = "out of bounds")]
    fn test_panic() {
        let v: Vec<i32> = vec![];
        let _ = v[0];
    }
}
```

## Gotchas

- `cargo test -- --test-threads=1` runs tests sequentially; necessary when tests share global state or write to the same files.
- `#[ignore]` skips a test by default; run ignored tests with `cargo test -- --ignored`.
- Test output (`println!`) is captured and only shown on failure; pass `-- --nocapture` to always display it.
