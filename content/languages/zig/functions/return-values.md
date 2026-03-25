---
title: "Return Values"
language: "zig"
feature: "return-values"
category: "functions"
applicable: true
---

Zig functions return a single value with an explicit `return` statement. For multiple values, return a struct or tuple. Error handling uses error union return types (`!T`): callers use `try` to propagate errors or `catch` to handle them. A function returning nothing has return type `void`. `noreturn` marks functions that never return (e.g., `std.process.exit`).

## Example

```zig
const std = @import("std");

// Return a struct (multiple values)
const Point = struct { x: f32, y: f32 };

fn midpoint(a: Point, b: Point) Point {
    return .{
        .x = (a.x + b.x) / 2.0,
        .y = (a.y + b.y) / 2.0,
    };
}

// Error union return
const ParseError = error{InvalidInput, Overflow};

fn parse_positive(s: []const u8) ParseError!u32 {
    const n = std.fmt.parseUnsigned(u32, s, 10) catch
        return ParseError.InvalidInput;
    return n;
}

// Optional return
fn find(haystack: []const u32, needle: u32) ?usize {
    for (haystack, 0..) |val, i| {
        if (val == needle) return i;
    }
    return null;
}

pub fn main() !void {
    const mid = midpoint(.{.x=0, .y=0}, .{.x=4, .y=4});
    std.debug.print("mid=({d},{d})\n", .{mid.x, mid.y});

    const n = try parse_positive("42");
    std.debug.print("parsed: {d}\n", .{n});

    const nums = [_]u32{10, 20, 30};
    if (find(&nums, 20)) |idx| {
        std.debug.print("found at {d}\n", .{idx});
    }
}
```

## Gotchas

- `try expr` is shorthand for `expr catch |err| return err` — it propagates the error to the caller.
- A function with `!void` return type must be called with `try` or the error explicitly handled.
- Returning a pointer to a local variable is a compile error in safe builds; Zig enforces memory safety here.
