---
title: "Parameters & Arguments"
language: "zig"
feature: "parameters"
category: "functions"
applicable: true
---

Zig function parameters are immutable value copies by default. To mutate a caller's variable, accept a pointer (`*T`). `comptime` parameters are evaluated at compile time, enabling generic functions. Zig has no default arguments or keyword arguments; use structs for option bags. Variadic C-style functions are supported only for C interop with `...`.

## Example

```zig
const std = @import("std");

// Pass by value (copy)
fn double_val(x: i32) i32 {
    return x * 2;
}

// Pass pointer to mutate
fn increment(n: *u32) void {
    n.* += 1;
}

// Slice parameter (pointer + length)
fn sum_slice(nums: []const u32) u32 {
    var total: u32 = 0;
    for (nums) |n| total += n;
    return total;
}

// Comptime type parameter (generic)
fn zero(comptime T: type) T {
    return std.mem.zeroes(T);
}

// Options struct pattern (no default args in Zig)
const ConnectOptions = struct {
    host: []const u8,
    port: u16 = 80,
    timeout_ms: u32 = 5000,
};

fn connect(opts: ConnectOptions) void {
    std.debug.print("Connecting to {s}:{d}\n", .{opts.host, opts.port});
}

pub fn main() void {
    std.debug.print("{d}\n", .{double_val(5)});

    var x: u32 = 10;
    increment(&x);
    std.debug.print("{d}\n", .{x});

    const nums = [_]u32{1, 2, 3, 4, 5};
    std.debug.print("{d}\n", .{sum_slice(&nums)});

    connect(.{ .host = "example.com" });
    connect(.{ .host = "example.com", .port = 443 });
    _ = zero(f64);
}
```

## Gotchas

- Zig has no default parameter values; use a struct with default field values as an options bag.
- String literals are `[]const u8` (slice of const bytes), not a null-terminated C string; use `[*:0]const u8` for C interop.
- `comptime` parameters must be known at compile time; passing a runtime value to a `comptime` parameter is a compile error.
