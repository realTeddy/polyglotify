---
title: "Structs & Classes"
language: "zig"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Zig structs are the primary composite data type. They can have fields with default values, methods (functions that take `self`), and associated declarations. There are no classes — structs with methods are Zig's equivalent. Structs can be generic via `comptime` type parameters. Packed and extern structs control memory layout for C interop and low-level programming.

## Example

```zig
const std = @import("std");

const Vec2 = struct {
    x: f32,
    y: f32,

    // Constructor (associated function, not a method)
    pub fn init(x: f32, y: f32) Vec2 {
        return .{ .x = x, .y = y };
    }

    // Method (takes self by value)
    pub fn length(self: Vec2) f32 {
        return std.math.sqrt(self.x * self.x + self.y * self.y);
    }

    // Mutating method (takes pointer to self)
    pub fn scale(self: *Vec2, factor: f32) void {
        self.x *= factor;
        self.y *= factor;
    }

    pub fn add(self: Vec2, other: Vec2) Vec2 {
        return .{ .x = self.x + other.x, .y = self.y + other.y };
    }
};

// Generic struct
fn Pair(comptime A: type, comptime B: type) type {
    return struct {
        first: A,
        second: B,
    };
}

pub fn main() void {
    var v = Vec2.init(3.0, 4.0);
    std.debug.print("length={d}\n", .{v.length()});
    v.scale(2.0);
    std.debug.print("scaled=({d},{d})\n", .{v.x, v.y});

    const p = Pair(i32, []const u8){ .first = 42, .second = "hello" };
    std.debug.print("{d} {s}\n", .{p.first, p.second});
}
```

## Gotchas

- Structs are passed by value (copied) unless you use a pointer; large structs should always be passed as `*const Struct`.
- Zig has no visibility modifiers on fields; all fields are accessible; use naming conventions.
- `pub fn init` is a convention, not a language feature; Zig has no constructors or destructors.
