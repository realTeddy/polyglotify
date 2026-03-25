---
title: "Tuples"
language: "zig"
feature: "tuples"
category: "data-structures"
applicable: true
---

Zig has anonymous structs that serve as tuples. Positional fields are accessed with `tuple.@"0"`, `tuple.@"1"`, etc. Zig also has a native comptime tuple concept used in `@TypeOf`, `std.meta.Tuple`, and format argument lists (`.{a, b, c}`). For named alternatives, regular structs are preferred.

## Example

```zig
const std = @import("std");

pub fn main() void {
    // Anonymous struct as tuple (positional fields)
    const t = .{ @as(i32, 1), "hello", @as(f64, 3.14) };
    std.debug.print("{d}\n", .{t[0]});      // 1
    std.debug.print("{s}\n", .{t[1]});      // hello
    std.debug.print("{d:.2}\n", .{t[2]});   // 3.14

    // Named struct (preferred over positional tuples)
    const Point = struct { x: f32, y: f32 };
    const p = Point{ .x = 3.0, .y = 4.0 };
    std.debug.print("({d}, {d})\n", .{p.x, p.y});

    // Tuple in format args (most common use)
    const name = "Alice";
    const age: u32 = 30;
    std.debug.print("{s} is {d}\n", .{name, age});   // .{...} is an anon struct/tuple

    // std.meta.Tuple for type-level tuples
    const Pair = std.meta.Tuple(&.{i32, []const u8});
    const pair: Pair = .{ 42, "answer" };
    std.debug.print("{d} {s}\n", .{pair[0], pair[1]});
}
```

## Gotchas

- Zig's anonymous struct `.{a, b}` fields are unnamed and accessed by index; use named structs for clarity.
- `std.meta.Tuple` creates a struct type with fields `@"0"`, `@"1"`, etc.; the syntax `pair[0]` uses comptime indexing.
- Tuple literals are primarily used as format argument lists to `std.debug.print` and `std.fmt.format`.
