---
title: "Exceptions & Try/Catch"
language: "dlang"
feature: "exceptions"
category: "error-handling"
applicable: true
---

D uses a class-based exception hierarchy rooted at `Throwable`. `Exception` covers recoverable errors; `Error` covers unrecoverable ones (like assertion failures). The `try`/`catch`/`finally` syntax is identical to Java/C#. D also has `scope(exit)`, `scope(success)`, and `scope(failure)` statements as a scope-guard alternative to `finally`.

## Example

```d
import std.stdio;
import std.conv : ConvException, to;

class AppException : Exception
{
    int code;
    this(string msg, int code, string file = __FILE__, size_t line = __LINE__)
    {
        super(msg, file, line);
        this.code = code;
    }
}

int parsePositive(string s)
{
    int n = to!int(s);       // throws ConvException on failure
    if (n <= 0)
        throw new AppException("must be positive", 400);
    return n;
}

void main()
{
    // try / catch / finally
    try
    {
        writeln(parsePositive("42"));
        writeln(parsePositive("-1"));
    }
    catch (AppException e)
    {
        writeln("App error [", e.code, "]: ", e.msg);
    }
    catch (ConvException e)
    {
        writeln("Conversion error: ", e.msg);
    }
    finally
    {
        writeln("Cleanup always runs");
    }

    // scope guards (idiomatic D alternative)
    {
        writeln("Opening resource");
        scope(exit)    writeln("exit: always");
        scope(success) writeln("success: on normal exit");
        scope(failure) writeln("failure: on exception");
        writeln("Doing work");
        // no exception here, so success + exit fire
    }
}
```

## Gotchas

- `Error` (e.g., `AssertError`, `RangeError`) should NOT be caught in production code — they indicate unrecoverable bugs.
- `scope(failure)` fires when any exception propagates out of the scope, enabling precise cleanup without `try/catch` nesting.
- `nothrow` functions cannot throw `Exception` but can still throw `Error` (which bypasses `nothrow`).
- Exceptions carry file and line information automatically via default template parameters.
