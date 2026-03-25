---
title: "Control Flow"
language: "zig"
feature: "control-flow"
category: "basics"
applicable: true
---

Zig has `if/else`, `while`, `for` (iterates over slices/arrays), and `switch`. All are expressions that return values. `if` can capture an optional payload with `|val|`. `while` can iterate with a continuation expression. `switch` must be exhaustive. `break` and `continue` support labeled blocks. Zig has no exceptions — errors are values.

## Example

```zig
const std = @import("std");

pub fn main() void {
    const x: i32 = 7;

    // if as expression
    const label = if (x > 0) "positive" else if (x < 0) "negative" else "zero";
    std.debug.print("{s}\n", .{label});

    // if with optional capture
    const opt: ?u32 = 42;
    if (opt) |val| {
        std.debug.print("got {d}\n", .{val});
    }

    // while loop
    var i: u32 = 0;
    while (i < 5) : (i += 1) {
        std.debug.print("{d} ", .{i});
    }
    std.debug.print("\n", .{});

    // for loop over slice
    const nums = [_]u32{1, 2, 3, 4, 5};
    for (nums) |n| {
        std.debug.print("{d} ", .{n});
    }
    std.debug.print("\n", .{});

    // for with index
    for (nums, 0..) |n, idx| {
        std.debug.print("[{d}]={d} ", .{idx, n});
    }
    std.debug.print("\n", .{});

    // switch (must be exhaustive)
    const day: u8 = 3;
    switch (day) {
        1 => std.debug.print("Mon\n", .{}),
        2 => std.debug.print("Tue\n", .{}),
        3 => std.debug.print("Wed\n", .{}),
        else => std.debug.print("Other\n", .{}),
    }
}
```

## Gotchas

- `for` in Zig iterates over slices/arrays, not integer ranges; use `while` with a counter for numeric loops.
- `switch` on integers must cover all cases or have an `else` branch; forgetting it is a compile error.
- Labeled `break :label value` can return a value from any block, enabling expression-oriented programming.
