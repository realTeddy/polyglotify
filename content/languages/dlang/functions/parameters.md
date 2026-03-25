---
title: "Parameters & Arguments"
language: "dlang"
feature: "parameters"
category: "functions"
applicable: true
---

D supports positional parameters, default values, `ref` (pass by reference), `out` (output parameter, zero-initialised before call), `lazy` (deferred evaluation), `in` (value + `const`), and variadic parameters with `...`. Template functions add compile-time parameters. Named arguments are supported from D 2.103.

## Example

```d
import std.stdio;

// ref — caller's variable is modified
void increment(ref int n) { n++; }

// out — guaranteed initialised to T.init before body runs
void divide(int a, int b, out int quotient, out int remainder)
{
    quotient  = a / b;
    remainder = a % b;
}

// lazy — argument evaluated only if used
void log(bool cond, lazy string msg)
{
    if (cond) writeln(msg);
}

// Default parameters
void connect(string host, ushort port = 8080) { writeln(host, ":", port); }

// Variadic (homogeneous)
int sum(int[] nums...) { int s; foreach (n; nums) s += n; return s; }

void main()
{
    int v = 5;
    increment(v);
    writeln(v);             // 6

    int q, r;
    divide(17, 5, q, r);
    writeln(q, " ", r);    // 3 2

    log(false, "expensive " ~ "string");  // never evaluated

    connect("localhost");
    connect("example.com", 443);

    writeln(sum(1, 2, 3, 4, 5));  // 15
}
```

## Gotchas

- `ref` parameters bind to lvalues only; you cannot pass a literal as `ref`.
- `out` parameters are zero-initialised at the call site before the function body executes, regardless of what the caller passed in.
- `lazy` wraps the argument in a zero-argument delegate; calling the parameter more than once evaluates it multiple times.
- Variadic `T[]...` creates a slice from the arguments; it is distinct from C-style `va_args` variadic (the latter uses `...` alone and `va_list`).
