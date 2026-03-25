---
title: "Testing"
language: "zig"
feature: "testing"
category: "ecosystem"
applicable: true
---

Zig has built-in testing via the `test` block. Tests are declared inline in source files with `test "name" { ... }`. Run all tests with `zig test src/file.zig` or `zig build test`. The `std.testing` namespace provides `expect`, `expectEqual`, `expectError`, and more. Tests run in isolation and failures are reported per test.

## Example

```zig
const std = @import("std");
const testing = std.testing;

// Source code
pub fn factorial(n: u64) u64 {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

pub fn clamp(val: i32, lo: i32, hi: i32) i32 {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

// Tests (in the same file)
test "factorial base cases" {
    try testing.expectEqual(@as(u64, 1), factorial(0));
    try testing.expectEqual(@as(u64, 1), factorial(1));
}

test "factorial positive" {
    try testing.expectEqual(@as(u64, 120), factorial(5));
    try testing.expectEqual(@as(u64, 720), factorial(6));
}

test "clamp below" {
    try testing.expectEqual(@as(i32, 0), clamp(-5, 0, 10));
}

test "clamp above" {
    try testing.expectEqual(@as(i32, 10), clamp(15, 0, 10));
}

test "clamp in range" {
    try testing.expectEqual(@as(i32, 5), clamp(5, 0, 10));
}

test "error is returned" {
    // Testing error unions
    const result = error.SomeError;
    try testing.expectError(error.SomeError, @as(anyerror!void, result));
}
```

## Gotchas

- Tests use `try` because test assertions return errors; the `test` block itself returns `anyerror!void`.
- `testing.expectEqual` requires both sides to have the same type; use `@as(T, val)` to coerce literals.
- `zig test` compiles tests in `ReleaseSafe` mode by default, so safety checks are active.
