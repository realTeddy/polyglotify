---
title: "Tuples"
language: "dlang"
feature: "tuples"
category: "data-structures"
applicable: true
---

D provides tuples through `std.typecons.Tuple` for runtime heterogeneous value tuples, and through `AliasSeq` in `std.meta` for compile-time type sequences. `Tuple` supports named fields and can be destructured. The `tuple()` helper function creates instances with inferred types.

## Example

```d
import std.stdio;
import std.typecons : Tuple, tuple;

// Named tuple type alias
alias Point = Tuple!(int, "x", int, "y");

Tuple!(int, int) divmod(int a, int b)
{
    return tuple(a / b, a % b);
}

void main()
{
    // Anonymous tuple
    auto t = tuple(1, "hello", 3.14);
    writeln(t[0], " ", t[1], " ", t[2]);

    // Named fields
    Point p = Point(3, 4);
    writeln(p.x, " ", p.y);

    // Returning multiple values
    auto result = divmod(17, 5);
    writeln(result[0], " remainder ", result[1]);

    // Destructuring (D 2.088+)
    auto [q, r] = divmod(17, 5);
    writeln(q, " ", r);

    // Expanding a tuple as function arguments
    auto add = (int a, int b) => a + b;
    auto args = tuple(10, 20);
    writeln(add(args.expand));  // 30
}
```

## Gotchas

- `Tuple` is a struct, so it is a value type — assignment copies all fields.
- Named fields are accessed by name OR by index; the two are interchangeable.
- `AliasSeq` (from `std.meta`) is a compile-time list of types/values, not a runtime tuple; it cannot be stored in a variable directly.
- Tuple expansion with `.expand` works for any `std.typecons.Tuple` regardless of field count.
