---
title: "Interfaces & Traits"
language: "zig"
feature: "interfaces"
category: "oop"
applicable: false
---

Zig has no interfaces or traits. The two idiomatic approaches are: (1) **comptime duck typing** — generic functions that work on any type with the required methods, checked at compile time; and (2) **explicit vtables** — a struct holding function pointers plus an `*anyopaque` context pointer, enabling runtime polymorphism. `std.mem.Allocator` is the canonical example of the vtable pattern.

## Example

```zig
const std = @import("std");

// 1. Comptime duck typing (compile-time interface)
fn printLength(comptime T: type, item: T) void {
    // Works for any type with a .len field
    std.debug.print("len={d}\n", .{item.len});
}

// 2. Explicit vtable (runtime interface)
const Writer = struct {
    context: *anyopaque,
    writeFn: *const fn(ctx: *anyopaque, bytes: []const u8) anyerror!usize,

    pub fn write(self: Writer, bytes: []const u8) !usize {
        return self.writeFn(self.context, bytes);
    }
};

const StdoutWriter = struct {
    fn writeFn(ctx: *anyopaque, bytes: []const u8) anyerror!usize {
        _ = ctx;
        try std.io.getStdOut().writer().writeAll(bytes);
        return bytes.len;
    }
    fn writer() Writer {
        return .{ .context = undefined, .writeFn = writeFn };
    }
};

pub fn main() !void {
    const arr = [_]u32{1, 2, 3};
    const slice: []const u32 = &arr;
    printLength([]const u32, slice);

    const w = StdoutWriter.writer();
    _ = try w.write("Hello via vtable!\n");
}
```

## Gotchas

- Comptime duck typing errors appear as long, compiler-generated messages when the method is missing; document requirements clearly.
- The vtable pattern has runtime overhead (pointer indirection) but enables dynamic dispatch across type-erased pointers.
- `std.mem.Allocator` is the standard reference implementation of the vtable interface pattern in Zig.
