---
title: "Maps & Dictionaries"
language: "zig"
feature: "maps"
category: "data-structures"
applicable: true
---

Zig's standard library provides `std.AutoHashMap(K, V)` for keys with auto-generated hash/eql functions, and `std.HashMap(K, V, Context, load_factor)` for custom hash functions. `std.StringHashMap(V)` is a convenience wrapper for string keys. All hash maps require an `Allocator` and must be deinitialized.

## Example

```zig
const std = @import("std");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    // AutoHashMap
    var map = std.AutoHashMap(u32, []const u8).init(allocator);
    defer map.deinit();

    // Insert
    try map.put(1, "one");
    try map.put(2, "two");
    try map.put(3, "three");

    // Lookup
    if (map.get(2)) |val| {
        std.debug.print("2 => {s}\n", .{val});
    }

    // Check membership
    std.debug.print("has 4: {}\n", .{map.contains(4)});

    // Remove
    _ = map.remove(3);

    // Iterate
    var it = map.iterator();
    while (it.next()) |entry| {
        std.debug.print("{d} => {s}\n", .{entry.key_ptr.*, entry.value_ptr.*});
    }

    // StringHashMap
    var smap = std.StringHashMap(i32).init(allocator);
    defer smap.deinit();
    try smap.put("alpha", 1);
    try smap.put("beta",  2);
    std.debug.print("alpha={d}\n", .{smap.get("alpha").?});
}
```

## Gotchas

- Hash maps require an `Allocator`; always pair `init` with `defer deinit`.
- `get` returns `?V` (optional); use `orelse` or `if (map.get(k)) |v|` for safe access.
- String keys in `AutoHashMap([]const u8, V)` compare by pointer, not value; use `StringHashMap` for value-based string keys.
