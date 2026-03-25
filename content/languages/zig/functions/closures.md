---
title: "Closures & Lambdas"
language: "zig"
feature: "closures"
category: "functions"
applicable: false
---

Zig has no closures or anonymous functions that capture their environment. Functions are not first-class values that close over scope. Instead, Zig uses function pointers and explicit context passing via a `*anyopaque` (type-erased pointer) pattern, similar to C callbacks. Comptime-known functions can be used generically.

## Example

```zig
const std = @import("std");

// Function pointer type
const Transformer = *const fn (i32) i32;

fn apply(f: Transformer, values: []const i32, out: []i32) void {
    for (values, 0..) |v, i| {
        out[i] = f(v);
    }
}

fn double(x: i32) i32 { return x * 2; }
fn square(x: i32) i32 { return x * x; }

// Context-passing pattern (manual closure)
const Adder = struct {
    n: i32,
    fn call(self: Adder, x: i32) i32 { return self.n + x; }
};

// Comptime function — resolved at compile time, not a closure
fn makeAdder(comptime n: i32) fn(i32) i32 {
    return struct {
        fn add(x: i32) i32 { return x + n; }
    }.add;
}

pub fn main() void {
    const input  = [_]i32{1, 2, 3, 4, 5};
    var   output = [_]i32{0} ** 5;

    apply(double, &input, &output);
    std.debug.print("{any}\n", .{output});

    apply(square, &input, &output);
    std.debug.print("{any}\n", .{output});

    const adder = Adder{ .n = 10 };
    std.debug.print("{d}\n", .{adder.call(5)});

    const add7 = makeAdder(7);
    std.debug.print("{d}\n", .{add7(3)});
}
```

## Gotchas

- Zig intentionally omits closures to keep stack frame sizes predictable and avoid hidden heap allocations.
- The `comptime` approach works only when the captured values are compile-time constants.
- For runtime callbacks with context, pass a struct pointer containing the context data explicitly.
