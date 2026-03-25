---
title: "Types & Type Systems"
language: "dlang"
feature: "types"
category: "basics"
applicable: true
---

D is statically typed with a rich built-in type system. It has the standard C-derived numeric types (`int`, `long`, `float`, `double`, `real`), `bool`, `char`/`wchar`/`dchar` for UTF-8/16/32 characters, and `string`/`wstring`/`dstring` as immutable character arrays. D also has first-class arrays, associative arrays, pointers, structs, classes, interfaces, enums, and aliases. Type qualifiers (`const`, `immutable`, `shared`, `inout`) are part of the type.

## Example

```d
import std.stdio;

void main()
{
    // Numeric types
    byte   b  = -128;
    ubyte  ub = 255;
    int    i  = 42;
    uint   ui = 42u;
    long   l  = 1_000_000_000L;
    float  f  = 3.14f;
    double d  = 3.14159265358979;
    real   r  = 3.14159265358979L; // widest available FP

    // Boolean
    bool flag = true;

    // Characters and strings
    char   c  = 'A';
    string s  = "hello";           // immutable(char)[]

    // Type alias
    alias MyInt = int;
    MyInt m = 7;

    // Enum
    enum Color { Red, Green, Blue }
    Color col = Color.Green;

    writeln(b, ub, i, ui, l, f, d, r, flag, c, s, m, col);
}
```

## Gotchas

- `string` is `immutable(char)[]`; mutating individual characters requires a `char[]` (mutable slice).
- Integer literals with underscores (`1_000_000`) are valid and improve readability.
- `real` maps to 80-bit extended precision on x86; on other architectures it may alias `double`.
- Implicit narrowing conversions that could lose data are compile errors — explicit casts are required.
