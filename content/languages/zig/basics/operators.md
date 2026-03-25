---
title: "Operators"
language: "zig"
feature: "operators"
category: "basics"
applicable: true
---

Zig has the standard arithmetic, comparison, logical, and bitwise operators. Notably, it adds wrapping arithmetic operators (`+%`, `-%`, `*%`) that wrap on overflow, and saturating operators (`+|`, `-|`, `*|`) that clamp at the type boundary. There is no ternary operator; use `if` expressions instead. The `orelse` and `catch` operators handle optionals and error unions.

## Example

```zig
const std = @import("std");

pub fn main() void {
    const a: u32 = 10;
    const b: u32 = 3;

    // Arithmetic
    std.debug.print("{d} {d} {d} {d} {d}\n", .{a+b, a-b, a*b, a/b, a%b});

    // Wrapping (no overflow trap)
    const max: u8 = 255;
    const wrapped = max +% 1;   // 0
    std.debug.print("wrapped: {d}\n", .{wrapped});

    // Saturating
    const sat = max +| 10;      // 255
    std.debug.print("saturating: {d}\n", .{sat});

    // Bitwise
    std.debug.print("{d} {d} {d}\n", .{a & b, a | b, a ^ b});
    std.debug.print("{d} {d}\n", .{a << 1, a >> 1});

    // Comparison
    std.debug.print("{} {}\n", .{a == 10, a != b});

    // Logical
    std.debug.print("{} {}\n", .{true and false, true or false});

    // Optional orelse
    const opt: ?u32 = null;
    const val = opt orelse 42;
    std.debug.print("val={d}\n", .{val});

    // if-else as expression (replaces ternary)
    const sign: i32 = if (a > 5) 1 else -1;
    std.debug.print("sign={d}\n", .{sign});
}
```

## Gotchas

- Regular `+`, `-`, `*` trap on overflow in Debug/ReleaseSafe; use `+%` for intentional wrapping.
- Zig has no `&&` or `||`; use `and` and `or`.
- Shift operators require the shift amount to be a `u6` (or appropriate log2 type) — use `@intCast` if needed.
