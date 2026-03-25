---
title: "Return Values"
language: "rust"
feature: "return-values"
category: "functions"
applicable: true
---

Rust functions return a single value. To return multiple values, use a tuple. The idiomatic way to return a fallible value is `Result<T, E>`; for optional values, use `Option<T>`. The `?` operator propagates errors early, making chained fallible operations concise. The last expression is the implicit return value.

## Example

```rust
use std::num::ParseIntError;

fn parse_and_double(s: &str) -> Result<i32, ParseIntError> {
    let n = s.trim().parse::<i32>()?; // propagate error with ?
    Ok(n * 2)
}

fn min_max(nums: &[i32]) -> Option<(i32, i32)> {
    if nums.is_empty() { return None; }
    let min = *nums.iter().min().unwrap();
    let max = *nums.iter().max().unwrap();
    Some((min, max))
}

fn main() {
    match parse_and_double("  21  ") {
        Ok(n)  => println!("Doubled: {n}"),
        Err(e) => println!("Error: {e}"),
    }

    if let Some((lo, hi)) = min_max(&[3, 1, 4, 1, 5, 9]) {
        println!("min={lo}, max={hi}");
    }
}
```

## Gotchas

- The `?` operator can only be used in functions that return `Result` or `Option`; using it in `main` requires `fn main() -> Result<(), E>`.
- `unwrap()` on `None` or `Err` panics at runtime; use `expect("message")` to get a more informative panic, or handle the error properly.
- Returning a reference from a function requires lifetime annotations if the reference does not come from one of the parameters.
