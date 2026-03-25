---
title: "Exceptions & Try/Catch"
language: "zig"
feature: "exceptions"
category: "error-handling"
applicable: false
---

Zig has no exceptions or try/catch in the traditional sense. Zig uses **error unions** (`!T`) — functions that can fail return a value of type `ErrorSet!T`. Callers handle errors with `try` (propagate), `catch` (handle inline), or pattern matching on the result. This is a compile-time enforced system with zero runtime overhead.

## Example

```zig
const std = @import("std");

// Error set declaration
const MathError = error{
    DivisionByZero,
    Overflow,
};

// Function returning error union
fn divide(a: f64, b: f64) MathError!f64 {
    if (b == 0.0) return MathError.DivisionByZero;
    return a / b;
}

fn safe_sqrt(x: f64) !f64 {
    if (x < 0.0) return error.DomainError;
    return std.math.sqrt(x);
}

pub fn main() !void {
    // try — propagate error to caller
    const result = try divide(10.0, 3.0);
    std.debug.print("{d:.4}\n", .{result});

    // catch — handle inline
    const safe = divide(10.0, 0.0) catch |err| blk: {
        std.debug.print("Error: {}\n", .{err});
        break :blk 0.0;
    };
    std.debug.print("safe={d}\n", .{safe});

    // catch with specific error
    const val = safe_sqrt(-1.0) catch |err| switch (err) {
        error.DomainError => std.math.nan(f64),
        else              => return err,
    };
    std.debug.print("val={d}\n", .{val});
}
```

## Gotchas

- `try expr` is syntactic sugar for `expr catch |err| return err` — it propagates to the caller.
- Error sets are inferred automatically when you write `error.SomeName` without declaring them.
- Unlike exceptions, Zig errors have no stack trace by default; use `std.debug.captureStackTrace` or build with `-Ddebug` for traces.
