---
title: "Arrays & Lists"
language: "zig"
feature: "arrays"
category: "data-structures"
applicable: true
---

Zig arrays have a compile-time known length: `[N]T`. Slices (`[]T`) are a pointer + length and are the idiomatic way to pass arrays to functions. `std.ArrayList(T)` is the dynamic array (heap-allocated, resizable). All arrays are 0-indexed. Array length is available as `.len`.

## Example

```zig
const std = @import("std");

pub fn main() !void {
    // Fixed-size array
    const arr = [5]u32{1, 2, 3, 4, 5};
    const arr2 = [_]u32{10, 20, 30};   // length inferred

    std.debug.print("arr[0]={d}, len={d}\n", .{arr[0], arr.len});

    // Slice (pointer into array)
    const slice: []const u32 = arr[1..4];  // [2, 3, 4]
    std.debug.print("slice len={d}\n", .{slice.len});

    // Iterate
    for (arr) |val| {
        std.debug.print("{d} ", .{val});
    }
    std.debug.print("\n", .{});

    // ArrayList — dynamic array
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var list = std.ArrayList(u32).init(allocator);
    defer list.deinit();

    try list.append(100);
    try list.append(200);
    try list.append(300);

    std.debug.print("list len={d}\n", .{list.items.len});
    std.debug.print("list[1]={d}\n", .{list.items[1]});

    _ = arr2;
}
```

## Gotchas

- Array bounds are checked at runtime in Debug/ReleaseSafe; out-of-bounds access causes a panic.
- Passing `[5]u32` to a function copies the array; pass `[]const u32` (slice) to avoid the copy.
- `ArrayList` requires an `Allocator`; always `defer list.deinit()` to free memory.
