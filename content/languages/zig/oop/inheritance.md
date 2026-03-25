---
title: "Inheritance"
language: "zig"
feature: "inheritance"
category: "oop"
applicable: false
---

Zig has no inheritance. Code reuse is achieved through **composition** (embedding a struct as a field) and **comptime generics**. Runtime polymorphism uses **tagged unions** (the Zig equivalent of a sum type) or **interface structs** with explicit vtables. Zig deliberately avoids inheritance to keep code explicit and predictable.

## Example

```zig
const std = @import("std");

// Composition instead of inheritance
const Animal = struct {
    name: []const u8,
    pub fn describe(self: Animal) void {
        std.debug.print("Animal: {s}\n", .{self.name});
    }
};

const Dog = struct {
    animal: Animal,  // embed Animal
    breed: []const u8,
    pub fn speak(self: Dog) void {
        std.debug.print("{s} says: Woof!\n", .{self.animal.name});
    }
};

// Tagged union for runtime polymorphism
const Shape = union(enum) {
    circle: struct { radius: f32 },
    rect:   struct { w: f32, h: f32 },
};

fn area(s: Shape) f32 {
    return switch (s) {
        .circle => |c| std.math.pi * c.radius * c.radius,
        .rect   => |r| r.w * r.h,
    };
}

pub fn main() void {
    const d = Dog{
        .animal = .{ .name = "Rex" },
        .breed  = "Labrador",
    };
    d.animal.describe();
    d.speak();

    const shapes = [_]Shape{
        .{ .circle = .{ .radius = 3.0 } },
        .{ .rect   = .{ .w = 4.0, .h = 5.0 } },
    };
    for (shapes) |s| {
        std.debug.print("area={d:.2}\n", .{area(s)});
    }
}
```

## Gotchas

- Composition requires explicit delegation: `d.animal.describe()` not `d.describe()` (no method promotion).
- Tagged unions require exhaustive `switch`; adding a variant later is a compile error until all switches are updated.
- Vtable-based interfaces are possible but require manual setup; see `std.mem.Allocator` as a standard example.
