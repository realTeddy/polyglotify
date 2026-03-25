---
title: "Result Types"
language: "zig"
feature: "result-types"
category: "error-handling"
applicable: true
---

Zig's error union type `E!T` is the language-native result type. It is a first-class language feature — not a library type. Error sets are composable with `||`. `anyerror` accepts any error. The `errdefer` statement runs cleanup code only on the error path. This system is more ergonomic than Rust's `Result<T,E>` in many cases because `try` automatically infers the error set.

## Example

```zig
const std = @import("std");

const AppError = error{
    NotFound,
    InvalidInput,
    IoError,
};

// Error union return type
fn parse_port(s: []const u8) AppError!u16 {
    const n = std.fmt.parseUnsigned(u16, s, 10) catch
        return AppError.InvalidInput;
    if (n == 0) return AppError.InvalidInput;
    return n;
}

// errdefer — cleanup only on error path
fn open_connection(host: []const u8, port: u16) AppError!void {
    _ = host;
    std.debug.print("Opening port {d}...\n", .{port});
    errdefer std.debug.print("Rolling back connection setup\n", .{});
    if (port > 60000) return AppError.InvalidInput;
    std.debug.print("Connected\n", .{});
}

// Chaining with try
fn connect(host: []const u8, port_str: []const u8) AppError!void {
    const port = try parse_port(port_str);
    try open_connection(host, port);
}

pub fn main() void {
    // Handle by switching on error
    connect("example.com", "8080") catch |err| {
        std.debug.print("Failed: {}\n", .{err});
    };

    connect("example.com", "abc") catch |err| {
        std.debug.print("Failed: {}\n", .{err});
    };
}
```

## Gotchas

- Error unions are zero-cost when successful; the compiler uses a small tag to distinguish ok vs. error.
- `errdefer` is like `defer` but only executes when the function returns an error — invaluable for resource cleanup.
- `anyerror!T` accepts all error codes but loses the ability to exhaustively handle them with a `switch`.
