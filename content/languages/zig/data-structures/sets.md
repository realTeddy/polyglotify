---
title: "Sets"
language: "zig"
feature: "sets"
category: "data-structures"
applicable: true
---

Zig has no dedicated set type in the standard library. The idiomatic approach is to use `std.AutoHashMap(T, void)` — a hash map with `void` values acts as a set with O(1) membership testing. For compile-time integer sets, packed integers or `std.EnumSet` / `std.StaticBitSet` are efficient alternatives.

## Example

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const alloc = gpa.allocator();

    // Set via AutoHashMap(T, void)
    var set = std.AutoHashMap(u32, void).init(alloc);
    defer set.deinit();

    // Insert
    try set.put(1, {});
    try set.put(2, {});
    try set.put(3, {});
    try set.put(2, {});   // duplicate — no effect

    // Membership
    std.debug.print("has 2: {}\n", .{set.contains(2)});
    std.debug.print("has 9: {}\n", .{set.contains(9)});

    // Remove
    _ = set.remove(1);

    // Iterate
    var it = set.keyIterator();
    while (it.next()) |key| {
        std.debug.print("{d} ", .{key.*});
    }
    std.debug.print("\n", .{});

    // StaticBitSet — for small integer sets (comptime size)
    var bits = std.StaticBitSet(64).initEmpty();
    bits.set(5);
    bits.set(10);
    bits.set(20);
    std.debug.print("bit 5 set: {}\n", .{bits.isSet(5)});
    std.debug.print("bit 7 set: {}\n", .{bits.isSet(7)});
}
```

## Gotchas

- `put(key, {})` inserts with a zero-size void value; `{}` is the void literal in Zig.
- `StaticBitSet` requires the size to be known at compile time; use `DynamicBitSet` for runtime sizes (needs an allocator).
- There are no built-in set union/intersection operations; implement them with iteration over one set and membership checks in another.
