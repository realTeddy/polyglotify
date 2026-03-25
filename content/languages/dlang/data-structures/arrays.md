---
title: "Arrays & Lists"
language: "dlang"
feature: "arrays"
category: "data-structures"
applicable: true
---

D has three array flavours: static arrays (`T[N]`, fixed size, stack-allocated), dynamic arrays (`T[]`, a fat pointer with length and capacity managed by the GC), and slices (a view into another array). Dynamic arrays grow with `~=` or `std.array.appender`. The standard library's `std.algorithm` provides functional operations via lazy ranges.

## Example

```d
import std.stdio;
import std.algorithm : sort, filter, map, sum;
import std.array : array, appender;

void main()
{
    // Static array
    int[3] fixed = [10, 20, 30];
    writeln(fixed.length);   // 3

    // Dynamic array
    int[] dyn = [1, 2, 3];
    dyn ~= 4;                // append
    dyn ~= [5, 6];           // append range
    writeln(dyn);            // [1, 2, 3, 4, 5, 6]

    // Slicing
    int[] slice = dyn[1..4]; // [2, 3, 4] — shared memory
    writeln(slice);

    // Appender (efficient repeated appending)
    auto app = appender!(int[])();
    foreach (i; 0..5) app ~= i * i;
    writeln(app.data);       // [0, 1, 4, 9, 16]

    // Functional pipeline
    auto result = dyn
        .filter!(n => n % 2 == 0)
        .map!(n => n * n)
        .array;
    writeln(result);         // [4, 16, 36]

    // Sort (in-place)
    int[] unsorted = [5, 3, 1, 4, 2];
    sort(unsorted);
    writeln(unsorted);       // [1, 2, 3, 4, 5]

    writeln(dyn.sum);        // 21
}
```

## Gotchas

- Slices share underlying memory with the original array; modifying one modifies the other until a reallocation occurs.
- Appending to a slice can trigger a reallocation; after that, the slice and the original array no longer share memory.
- Static arrays are value types (copied on assignment); dynamic arrays are reference types (the slice header is copied, not the data).
