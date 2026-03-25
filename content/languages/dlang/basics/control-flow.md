---
title: "Control Flow"
language: "dlang"
feature: "control-flow"
category: "basics"
applicable: true
---

D provides the standard C-family control-flow statements — `if`/`else`, `while`, `do`/`while`, `for`, `switch`/`case`, `break`, `continue`, `return` — plus a `foreach` loop that works over ranges and arrays, a `with` statement, `goto` (rarely used), and the compile-time `static if`. The `final switch` enforces exhaustive enum matching at compile time.

## Example

```d
import std.stdio;

void main()
{
    // if / else
    int x = 42;
    if (x > 0)
        writeln("positive");
    else if (x < 0)
        writeln("negative");
    else
        writeln("zero");

    // foreach over array
    int[] nums = [1, 2, 3, 4, 5];
    foreach (n; nums)
        write(n, " ");
    writeln();

    // foreach with index
    foreach (i, n; nums)
        writef("%d:%d ", i, n);
    writeln();

    // for loop
    for (int i = 0; i < 3; i++)
        write(i, " ");
    writeln();

    // while
    int i = 0;
    while (i < 3) { write(i++, " "); }
    writeln();

    // switch (fall-through requires explicit goto)
    int day = 2;
    switch (day)
    {
        case 1:  writeln("Mon"); break;
        case 2:  writeln("Tue"); break;
        default: writeln("Other");
    }

    // static if (compile-time)
    static if (size_t.sizeof == 8)
        writeln("64-bit");
    else
        writeln("32-bit");
}
```

## Gotchas

- D's `switch` does NOT fall through by default; each `case` must end with `break`, `return`, `goto case`, or `goto default`.
- `foreach` iterates by value by default; use `ref` to mutate: `foreach (ref n; nums)`.
- `static if` is evaluated at compile time and can appear at module scope; it is the main tool for conditional compilation.
- Range-based `foreach` works with any type that provides `empty`, `front`, and `popFront`.
