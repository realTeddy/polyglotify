---
title: "Exceptions"
language: "csharp"
feature: "exceptions"
category: "error-handling"
applicable: true
---

C# uses `try/catch/finally` and `throw` for exception handling. All exceptions derive from `System.Exception`. C# has no checked exceptions — all are unchecked. `when` clauses add conditional filtering to catch blocks without unwinding the stack. `using` declarations and `using` statements automatically call `Dispose()`, replacing many `finally` blocks. Exception filters and `ExceptionDispatchInfo` enable advanced re-throw patterns.

## Example

```csharp
using System.Runtime.ExceptionServices;

// Custom exception
class DomainException : Exception {
    public string Code { get; }

    public DomainException(string code, string message) : base(message) =>
        Code = code;

    public DomainException(string code, string message, Exception inner)
        : base(message, inner) => Code = code;
}

// try / catch with when filter
static int ParsePositive(string s) {
    try {
        int n = int.Parse(s);
        if (n <= 0) throw new DomainException("INVALID", "Value must be positive");
        return n;
    }
    catch (FormatException ex) {
        throw new DomainException("PARSE_ERROR", $"'{s}' is not a number", ex);
    }
    catch (OverflowException ex) when (ex.Message.Contains("overflow")) {
        throw new DomainException("OVERFLOW", "Number too large", ex);
    }
    finally {
        // Runs whether or not an exception occurred
        Console.WriteLine("ParsePositive completed");
    }
}

// using — automatic disposal (replaces try/finally)
static string ReadAll(string path) {
    using var reader = new System.IO.StreamReader(path);
    return reader.ReadToEnd();
}

// Re-throw preserving stack trace
static void SafeCall(Action action) {
    try { action(); }
    catch (Exception ex) {
        Console.Error.WriteLine($"Error: {ex.Message}");
        throw; // 'throw;' preserves original stack trace; 'throw ex;' resets it
    }
}
```

## Gotchas

- `throw ex;` resets the stack trace to the current location; `throw;` (without an expression) preserves the original stack trace. Always prefer `throw;` when re-throwing.
- Exception filters (`catch (X ex) when (condition)`) do not unwind the stack when the condition is false, so debuggers can inspect the original call site.
