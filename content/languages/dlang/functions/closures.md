---
title: "Closures & Lambdas"
language: "dlang"
feature: "closures"
category: "functions"
applicable: true
---

D has first-class function types: `function` pointers (no capture), `delegate` (captures a context frame), and anonymous lambda syntax. Lambdas can be written as full `delegate { ... }` literals or with the short `(params) => expr` arrow syntax. The standard library's `std.functional` and `std.algorithm` use these heavily.

## Example

```d
import std.stdio;
import std.algorithm : map, filter;
import std.array : array;

void main()
{
    // Arrow lambda
    auto square = (int x) => x * x;
    writeln(square(5));   // 25

    // Multi-statement delegate
    auto clamp = delegate int(int v, int lo, int hi)
    {
        if (v < lo) return lo;
        if (v > hi) return hi;
        return v;
    };
    writeln(clamp(-5, 0, 10));  // 0

    // Closure capturing outer variable
    int base = 100;
    auto addBase = (int x) => x + base;
    writeln(addBase(7));        // 107
    base = 200;
    writeln(addBase(7));        // 207 — captures by reference

    // Higher-order functions
    int[] nums = [1, 2, 3, 4, 5, 6];
    auto evens = nums.filter!(n => n % 2 == 0).array;
    auto squares = evens.map!(n => n * n).array;
    writeln(squares);           // [4, 16, 36]

    // Returning a closure (factory)
    auto makeMultiplier = (int factor) => (int x) => x * factor;
    auto triple = makeMultiplier(3);
    writeln(triple(7));         // 21
}
```

## Gotchas

- Delegates capture by reference, so a closure that outlives its enclosing scope must be used carefully (the GC keeps the frame alive as long as the delegate exists, which is safe but may surprise in performance-sensitive code).
- `function` pointers cannot capture context; use `delegate` when you need captures.
- The `!` template syntax (`map!(...)`} is D's UFCS template instantiation — the lambda is a template argument, not a runtime argument.
