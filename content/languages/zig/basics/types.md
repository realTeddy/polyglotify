---
title: "Types & Type Systems"
language: "zig"
feature: "types"
category: "basics"
applicable: true
---

Zig is statically typed with no implicit conversions. Integer types are sized explicitly: `u8`, `i8`, `u16`, `i16`, `u32`, `i32`, `u64`, `i64`, `usize`, `isize`. Floats: `f16`, `f32`, `f64`, `f128`. There is also `bool`, `void`, `noreturn`, `type` (types are values!), and `comptime_int`/`comptime_float` for compile-time numerics. Zig has no null — use optionals (`?T`) and error unions (`E!T`) instead.

## Example

```zig
const std = @import("std");

pub fn main() void {
    // Sized integers
    const a: u8  = 255;
    const b: i32 = -42;
    const c: u64 = 1_000_000;

    // Floats
    const f: f64 = 3.14159;

    // Boolean
    const flag: bool = true;

    // Optionals — ?T can hold T or null
    var opt: ?u32 = null;
    opt = 42;
    if (opt) |value| {
        std.debug.print("Optional: {d}\n", .{value});
    }

    // Type coercion — explicit only
    const x: u32 = 10;
    const y: u64 = x;          // widening allowed implicitly
    const z: i32 = @intCast(b); // explicit cast required for narrowing

    // Types are values at comptime
    const T = u32;
    const n: T = 100;

    std.debug.print("{d} {d} {d} {d} {any}\n", .{a, b, c, f, flag});
    _ = y; _ = z; _ = n;
}
```

## Gotchas

- Integer overflow is a runtime safety error in Debug/ReleaseSafe; use `+%`, `-%`, `*%` for wrapping arithmetic.
- Implicit widening is allowed; narrowing always requires `@intCast`, which traps on overflow in safe builds.
- `usize` is the pointer-width integer type, used for array indices and memory sizes.
