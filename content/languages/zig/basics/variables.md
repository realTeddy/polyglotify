---
title: "Variables & Declaration"
language: "zig"
feature: "variables"
category: "basics"
applicable: true
---

Zig uses `const` for immutable bindings and `var` for mutable ones. All variables must be initialized; use `undefined` to explicitly defer initialization (unsafe). Type is inferred from the initializer or can be stated explicitly. Variables are `snake_case` by convention. Zig has no garbage collector — memory is managed explicitly.

## Example

```zig
const std = @import("std");

pub fn main() void {
    // const — immutable binding
    const name: []const u8 = "Alice";
    const pi = 3.14159;   // type inferred as comptime_float -> f64

    // var — mutable
    var age: u32 = 30;
    age += 1;

    // Explicitly uninitialized (use with caution — value is indeterminate)
    var buffer: [256]u8 = undefined;
    _ = buffer;

    // Comptime constants
    const max_size = 1024;  // comptime_int

    // Block expressions return values
    const result = blk: {
        const x = 10;
        const y = 20;
        break :blk x + y;
    };

    std.debug.print("{s} is {d}\n", .{name, age});
    std.debug.print("result={d}, pi={d:.2}\n", .{result, pi});
    _ = max_size;
}
```

## Gotchas

- `const` applies to the *binding*, not the pointed-to data; use `*const T` for a pointer to immutable data.
- `undefined` does not zero memory; reading from it is safety-checked in Debug/ReleaseSafe builds.
- Variables declared but unused are a compile error; use `_ = varname;` to explicitly discard.
