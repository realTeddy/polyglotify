---
title: "Variables & Declaration"
language: "dlang"
feature: "variables"
category: "basics"
applicable: true
---

D supports both explicit typing and type inference via `auto`. Variables are declared with a type or with `auto`, followed by a name and optional initialiser. Module-level variables are zero-initialised by default. D also has `immutable` (deep compile-time immutability) and `const` (shallow runtime immutability).

## Example

```d
import std.stdio;

int globalCount = 0;

void main()
{
    int x = 10;
    auto name = "Alice";     // inferred as string
    immutable double pi = 3.14159;
    const int limit = 100;

    auto a = 1, b = 2;      // multiple declarations
    writeln(x, " ", name, " ", pi, " ", limit, " ", a, " ", b);
}
```

## Gotchas

- `auto` resolves at compile time — it is not dynamic typing.
- `immutable` applies transitively to all data reachable through the variable; `const` is a view that does not propagate.
- Unintialised variables (without `auto`) get the type's `.init` value (0 for numerics, `null` for references), so undefined-value bugs are rare but still possible with pointers.
