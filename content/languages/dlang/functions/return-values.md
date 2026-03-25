---
title: "Return Values"
language: "dlang"
feature: "return-values"
category: "functions"
applicable: true
---

D functions return a single value declared in the signature. Multiple values are handled via `Tuple` from `std.typecons`, `out` parameters, or structs. Functions can also return `ref` to allow chaining and in-place modification. `void` functions return nothing. CTFE allows return values to be computed at compile time.

## Example

```d
import std.stdio;
import std.typecons : Tuple, tuple;

// Single return
int square(int n) { return n * n; }

// Returning a tuple (multiple values)
Tuple!(int, int) divmod(int a, int b)
{
    return tuple(a / b, a % b);
}

// ref return — returns a reference into a container
ref int first(ref int[] arr) { return arr[0]; }

// auto return (type inferred)
auto makeGreeting(string name) { return "Hello, " ~ name; }

void main()
{
    writeln(square(9));

    auto result = divmod(17, 5);
    writeln(result[0], " remainder ", result[1]);

    // Structured binding-style unpacking
    auto [q, r] = divmod(17, 5);
    writeln(q, " ", r);

    int[] data = [10, 20, 30];
    first(data) = 99;
    writeln(data);     // [99, 20, 30]

    writeln(makeGreeting("World"));
}
```

## Gotchas

- Returning `ref` to a local variable is a bug (dangling reference); the compiler warns in many cases but cannot always detect it.
- Tuple unpacking with `auto [a, b] = ...` requires D 2.088 or later (AliasSeq destructuring).
- A `void` function that falls off the end is fine; a non-`void` function that falls off the end without returning is a compile error if the compiler can detect it, or undefined behaviour at runtime if it cannot.
