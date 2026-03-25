---
title: "Function Declaration"
language: "vlang"
feature: "declaration"
category: "functions"
applicable: true
---

Functions in V are declared with `fn`. All functions are public by default within the module; prefix with a lowercase letter and use the module name to restrict access, or prefix `pub` explicitly for exported functions. Functions can return optionals (`?T`) or results (`!T`). V functions are pure by default — they cannot modify variables outside their scope without passing by reference.

## Example

```v
// Basic function
fn add(x int, y int) int {
    return x + y
}

// Inferred return type in short form
fn square(x int) int {
    return x * x
}

// Multiple return values
fn divmod(a int, b int) (int, int) {
    return a / b, a % b
}

// Optional return
fn find(arr []int, target int) ?int {
    for i, v in arr {
        if v == target {
            return i
        }
    }
    return none
}

// Result return (error or value)
fn parse_int(s string) !int {
    return s.int()
}

fn main() {
    println(add(3, 4))             // 7
    q, r := divmod(17, 5)
    println('$q remainder $r')    // 3 remainder 2

    idx := find([10, 20, 30], 20) or { -1 }
    println(idx)                  // 1
}
```

## Gotchas

- V functions cannot modify outer variables without `mut` reference parameters; this enforces purity.
- `return` is required; V does not use expression-based implicit returns like Ruby or Crystal.
- Functions returning `!T` signal errors with `return error('message')`; callers must handle with `or { }` or `!`.
