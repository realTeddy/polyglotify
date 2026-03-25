---
title: "Result Types"
language: "dlang"
feature: "result-types"
category: "error-handling"
applicable: true
---

D does not have a built-in `Result` or `Option` type, but `std.typecons` provides `Nullable!T` (an optional value) and several community libraries (`mir-core`, `sumtype`) offer full discriminated unions. The idiomatic D approach for functions that can fail is to throw exceptions or return `Nullable!T`. `Expected` (error-or-value) is available via the `expected` DUB package.

## Example

```d
import std.stdio;
import std.typecons : Nullable, nullable;
import std.conv : to, ConvException;

// Nullable as an optional / Result-lite
Nullable!int tryParseInt(string s)
{
    try
        return nullable(to!int(s));
    catch (ConvException)
        return Nullable!int.init;   // null / none
}

// Struct-based Result (manual)
struct Result(T)
{
    private T   _value;
    private string _error;
    private bool   _ok;

    static Result ok(T v)          { return Result(v, "", true); }
    static Result err(string msg)  { return Result(T.init, msg, false); }

    bool isOk()  const { return _ok; }
    T    value() const { assert(_ok); return _value; }
    string error() const { return _error; }
}

Result!int safeDivide(int a, int b)
{
    if (b == 0) return Result!int.err("division by zero");
    return Result!int.ok(a / b);
}

void main()
{
    auto r1 = tryParseInt("42");
    if (!r1.isNull) writeln(r1.get);   // 42

    auto r2 = tryParseInt("abc");
    writeln(r2.isNull);                // true

    auto d1 = safeDivide(10, 2);
    if (d1.isOk) writeln(d1.value);   // 5

    auto d2 = safeDivide(10, 0);
    if (!d2.isOk) writeln(d2.error);  // division by zero
}
```

## Gotchas

- `Nullable!T` cannot distinguish "no value" from "the value is `.init`" for types where `.init` is a valid result — use a wrapper struct when that matters.
- Community `sumtype` and `mir-core` provide algebraic `Either`/`Result` with pattern matching; they are more ergonomic than a hand-rolled struct.
- D's exception-based error handling is idiomatic for most code; result types are preferred in `@nogc` or `nothrow` contexts.
