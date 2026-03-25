---
title: "Operators"
language: "dlang"
feature: "operators"
category: "basics"
applicable: true
---

D's operators closely follow C/C++ conventions with several additions: `^^` for exponentiation, `~` for array/string concatenation (and `~=` for append), `in` for associative-array membership, `is` / `!is` for identity comparison, and `>>>` for unsigned right shift. Operator overloading uses named methods (`opAdd`, `opCmp`, `opIndex`, etc.) called through `opBinary`, `opUnary`, etc.

## Example

```d
import std.stdio;

void main()
{
    // Arithmetic
    int a = 10, b = 3;
    writeln(a + b, " ", a - b, " ", a * b, " ", a / b, " ", a % b);
    writeln(2 ^^ 8);          // 256  (exponentiation)

    // Comparison & logical
    writeln(a > b, " ", a == b, " ", a != b);
    writeln(true && false, " ", true || false, " ", !true);

    // Bitwise
    writeln(a & b, " ", a | b, " ", a ^ b, " ", a << 1, " ", a >> 1, " ", cast(uint)(-1) >>> 1);

    // String / array concatenation
    string s = "hello" ~ " " ~ "world";
    int[]  arr = [1, 2] ~ [3, 4];
    writeln(s, " ", arr);

    // in operator
    int[string] map = ["x": 1, "y": 2];
    writeln("x" in map);   // pointer to value, or null
    writeln("z" in map);   // null

    // Identity
    Object o = null;
    writeln(o is null);    // true
}
```

## Gotchas

- `~` is concatenation, NOT bitwise complement (use `~` as unary for complement as in C).
- `/` on integers truncates toward zero; use `float` casts for true division.
- `in` returns a pointer to the value (or `null`), not a `bool` — dereference it to get the value.
- `^^` has right-to-left associativity: `2 ^^ 3 ^^ 2` is `2 ^^ 9`, not `8 ^^ 2`.
