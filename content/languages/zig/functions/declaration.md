---
title: "Function Declaration"
language: "zig"
feature: "declaration"
category: "functions"
applicable: true
---

Zig functions are declared with `fn name(params) ReturnType { body }`. `pub` makes a function visible outside its file. Functions can return error unions (`!ReturnType`). `comptime` parameters allow compile-time generics. All function parameters are immutable by default (passed by value or as pointers explicitly).

## Example

```zig
const std = @import("std");

// Public function
pub fn add(a: i32, b: i32) i32 {
    return a + b;
}

// Function returning an error union
pub fn divide(a: f64, b: f64) !f64 {
    if (b == 0.0) return error.DivisionByZero;
    return a / b;
}

// Comptime parameter — generic function
pub fn max(comptime T: type, a: T, b: T) T {
    return if (a > b) a else b;
}

// Function with no return value
pub fn greet(name: []const u8) void {
    std.debug.print("Hello, {s}!\n", .{name});
}

// Recursive function
pub fn factorial(n: u64) u64 {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

pub fn main() !void {
    std.debug.print("{d}\n", .{add(3, 4)});
    const result = try divide(10.0, 3.0);
    std.debug.print("{d:.2}\n", .{result});
    std.debug.print("{d}\n", .{max(i32, 5, 3)});
    greet("Alice");
    std.debug.print("{d}\n", .{factorial(5)});
}
```

## Gotchas

- All parameters are passed by value (copies); pass a pointer `*T` to mutate the original.
- `!ReturnType` is an error union; the caller must handle errors with `try`, `catch`, or explicit checking.
- Functions are not first-class values by default; use function pointers (`*const fn(T) R`) explicitly.
