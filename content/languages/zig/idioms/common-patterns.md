---
title: "Common Patterns"
language: "zig"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Zig idioms include explicit allocator passing, `defer` for resource cleanup, `errdefer` for error-path cleanup, `comptime` for zero-cost generics, error unions for fallible operations, and tagged unions for sum types. The language prioritizes explicit control over convenience — every allocation, every error path, every pointer dereference is visible in the source.

## Example

```zig
const std = @import("std");

pub fn main() !void {
    // 1. Allocator passing + defer cleanup
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    // 2. defer for cleanup
    const buf = try alloc.alloc(u8, 256);
    defer alloc.free(buf);

    // 3. Error union chaining with try
    const n = try std.fmt.parseInt(i32, "42", 10);
    std.debug.print("parsed: {d}\n", .{n});

    // 4. Optional unwrapping with orelse
    const maybe: ?u32 = null;
    const val = maybe orelse 0;
    std.debug.print("val={d}\n", .{val});

    // 5. Tagged union (sum type)
    const Expr = union(enum) {
        num: i64,
        add: struct { lhs: i64, rhs: i64 },
    };
    const e = Expr{ .add = .{ .lhs = 3, .rhs = 4 } };
    const result = switch (e) {
        .num  => |n2| n2,
        .add  => |a| a.lhs + a.rhs,
    };
    std.debug.print("expr result={d}\n", .{result});

    // 6. comptime branching
    comptime {
        const x: u32 = 100;
        if (x > 50) @compileLog("x is large");
    }
}
```

## Gotchas

- Always pair allocations with `defer free`; Zig has no GC and memory leaks are your responsibility.
- `defer` runs in LIFO order at end of scope; for error-only cleanup use `errdefer`.
- Zig's `comptime` is not just for generics — it can perform arbitrary computation at compile time including reading files.
