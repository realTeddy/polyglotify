---
title: "Generics"
language: "zig"
feature: "generics"
category: "oop"
applicable: true
---

Zig achieves generics through `comptime` — type parameters are regular `comptime` function parameters of type `type`. Generic functions and structs are written as functions that accept type arguments and return specialized types or values. This is more powerful than traditional generics because any comptime computation can be performed on types.

## Example

```zig
const std = @import("std");

// Generic function
fn max(comptime T: type, a: T, b: T) T {
    return if (a > b) a else b;
}

// Generic struct (function returning a type)
fn Stack(comptime T: type) type {
    return struct {
        items: std.ArrayList(T),

        const Self = @This();

        pub fn init(allocator: std.mem.Allocator) Self {
            return .{ .items = std.ArrayList(T).init(allocator) };
        }

        pub fn deinit(self: *Self) void {
            self.items.deinit();
        }

        pub fn push(self: *Self, item: T) !void {
            try self.items.append(item);
        }

        pub fn pop(self: *Self) ?T {
            if (self.items.items.len == 0) return null;
            return self.items.pop();
        }
    };
}

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();

    std.debug.print("{d}\n", .{max(i32, 5, 3)});
    std.debug.print("{d}\n", .{max(f64, 1.5, 2.7)});

    var s = Stack(i32).init(gpa.allocator());
    defer s.deinit();

    try s.push(10);
    try s.push(20);
    try s.push(30);

    while (s.pop()) |val| {
        std.debug.print("{d} ", .{val});
    }
    std.debug.print("\n", .{});
}
```

## Gotchas

- Generic code is fully monomorphized at compile time — each instantiation (`Stack(i32)`, `Stack(f64)`) generates separate code.
- Type constraints are enforced via `comptime` assertions: `comptime assert(@typeInfo(T) == .Int)` for integer-only generics.
- `@This()` inside a function-returned struct refers to the struct type itself, enabling self-referential methods.
