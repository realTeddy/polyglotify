---
title: "Classes"
language: "zig"
feature: "classes"
category: "oop"
applicable: false
---

Zig has no classes. The idiomatic equivalent is a **struct with methods** — functions defined in the struct's namespace that take a `self` parameter. There is no inheritance, no virtual dispatch, and no runtime type information by default. Polymorphism is achieved at compile time via generics (`comptime`) or at runtime via tagged unions and function pointers.

## Example

```zig
const std = @import("std");

// Struct with methods — Zig's "class"
const Counter = struct {
    value: u32 = 0,
    step: u32 = 1,

    pub fn init(step: u32) Counter {
        return .{ .step = step };
    }

    pub fn increment(self: *Counter) void {
        self.value += self.step;
    }

    pub fn reset(self: *Counter) void {
        self.value = 0;
    }

    pub fn get(self: Counter) u32 {
        return self.value;
    }
};

pub fn main() void {
    var c = Counter.init(2);
    c.increment();
    c.increment();
    c.increment();
    std.debug.print("value={d}\n", .{c.get()});   // 6
    c.reset();
    std.debug.print("after reset={d}\n", .{c.get()});
}
```

## Gotchas

- Method calls `c.increment()` are syntactic sugar for `Counter.increment(&c)` — Zig auto-passes the pointer.
- There is no `this`/`self` keyword; name the first parameter `self` by convention.
- For virtual dispatch (runtime polymorphism), use tagged unions or an explicit vtable struct with function pointers.
