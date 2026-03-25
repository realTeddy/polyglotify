---
title: "Function Declaration"
language: "dlang"
feature: "declaration"
category: "functions"
applicable: true
---

D functions are declared with a return type, name, parameter list, and body — identical in surface syntax to C but with many additions: default parameters, overloading, `pure`, `nothrow`, `@safe`, `@nogc`, and `@trusted` attributes, and compile-time function execution (CTFE) for functions marked `pure`.

## Example

```d
import std.stdio;

// Basic function
int add(int a, int b)
{
    return a + b;
}

// Default parameters
string greet(string name, string prefix = "Hello")
{
    return prefix ~ ", " ~ name ~ "!";
}

// Attribute annotations
pure nothrow @safe int square(int n)
{
    return n * n;
}

// Function overloading
double area(double r) { import std.math : PI; return PI * r * r; }
double area(double w, double h) { return w * h; }

// CTFE — called at compile time when arguments are known
enum ctResult = square(7);  // evaluated at compile time

void main()
{
    writeln(add(3, 4));
    writeln(greet("Alice"));
    writeln(greet("Bob", "Hi"));
    writeln(area(5.0));
    writeln(area(3.0, 4.0));
    writeln(ctResult);        // 49
}
```

## Gotchas

- `pure` in D means the function's result depends only on its arguments and it does not access global mutable state; it does NOT mean the function has no side effects (I/O is still forbidden, but mutations of parameters are allowed).
- Functions declared at module scope are implicitly `static` (not member functions).
- Overloads must differ in parameter types (not just return type).
