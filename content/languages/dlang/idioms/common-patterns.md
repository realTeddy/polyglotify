---
title: "Common Patterns"
language: "dlang"
feature: "common-patterns"
category: "idioms"
applicable: true
---

D idioms blend systems-programming patterns (RAII, compile-time polymorphism) with functional patterns (ranges, UFCS). Key patterns: UFCS (Uniform Function Call Syntax) for method chaining on any type, range-based pipelines, compile-time code generation with `mixin`, RAII with `scope`, and `alias this` for transparent delegation.

## Example

```d
import std.stdio;
import std.algorithm : map, filter, sort, sum;
import std.array : array;
import std.range : iota;
import std.string : toUpper;

void main()
{
    // UFCS: free functions called as methods
    auto result = iota(1, 11)           // 1..10
        .filter!(n => n % 2 == 0)       // [2, 4, 6, 8, 10]
        .map!(n => n * n)               // [4, 16, 36, 64, 100]
        .sum;                           // 220
    writeln(result);

    // String as range
    auto upper = "hello world"
        .filter!(c => c != ' ')
        .map!toUpper
        .array;
    writeln(upper);  // HELLOWORLD

    // RAII with scope guard
    void processFile(string path)
    {
        import std.stdio : File;
        auto f = File(path, "w");
        scope(exit) f.close();   // guaranteed close
        f.writeln("data");
    }

    // Compile-time mixin for boilerplate
    mixin template Singleton(T)
    {
        private static T _instance;
        static T instance()
        {
            if (!_instance) _instance = new T();
            return _instance;
        }
    }

    // alias this — transparent delegation
    struct Wrapper
    {
        int[] data;
        alias data this;   // Wrapper acts like int[]
    }
    Wrapper w = Wrapper([1, 2, 3]);
    writeln(w.length);   // 3 — delegates to data.length
    writeln(w[1]);       // 2 — delegates to data[1]
}
```

## Gotchas

- UFCS calls `foo(obj, args)` as `obj.foo(args)` — the function must still be imported into scope.
- Range pipelines are lazy by default; call `.array` or iterate to force evaluation.
- `mixin template` injects code into the mixin site; name collisions with the surrounding scope are possible.
- `alias this` only works with one field at a time (no multiple alias this).
