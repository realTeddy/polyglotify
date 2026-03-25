---
title: "Control Flow"
language: "rust"
feature: "control-flow"
category: "basics"
applicable: true
---

Rust's control-flow constructs include `if`/`else`, `loop`, `while`, `for`...`in`, and `match`. Unlike most languages, `if` and `match` are expressions that return a value. `loop` can return a value via `break value`. Pattern matching with `match` is exhaustive — the compiler enforces that all cases are handled.

## Example

```rust
fn classify(n: i32) -> &'static str {
    match n {
        i32::MIN..=-1 => "negative",
        0             => "zero",
        _             => "positive",
    }
}

fn main() {
    // if as expression
    let sign = if 42 > 0 { "+" } else { "-" };
    println!("{sign}");

    // for loop over range
    for i in 0..5 {
        println!("{i}: {}", classify(i - 2));
    }

    // loop with break value
    let mut n = 0;
    let result = loop {
        n += 1;
        if n == 10 { break n * 2; }
    };
    println!("{result}");
}
```

## Gotchas

- `match` is exhaustive; forgetting a case is a compile error, not a runtime error.
- `if let` and `while let` are syntactic sugar for `match` with one pattern; they do not check exhaustiveness.
- The `continue` and `break` statements in nested loops can target an outer loop using labeled loops (`'label: loop { ... break 'label; }`).
