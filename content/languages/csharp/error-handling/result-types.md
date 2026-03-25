---
title: "Result Types"
language: "csharp"
feature: "result-types"
category: "error-handling"
applicable: true
---

C# has no built-in `Result<T, E>` type, but the `Try*` method pattern (like `int.TryParse`) is idiomatic for methods that may fail. For explicit success/failure flows, discriminated unions via `OneOf` library or hand-rolled generic results using `readonly struct` are popular. C# 9 records make lightweight result types concise. The `FluentResults` and `ErrorOr` libraries provide polished implementations.

## Example

```csharp
// OneOf-style Result using readonly record struct
readonly record struct Result<T> {
    private readonly T? _value;
    private readonly string? _error;
    private readonly bool _isSuccess;

    private Result(T value) { _value = value; _isSuccess = true; _error = null; }
    private Result(string error) { _error = error; _isSuccess = false; _value = default; }

    public static Result<T> Ok(T value) => new(value);
    public static Result<T> Fail(string error) => new(error);

    public bool IsSuccess => _isSuccess;
    public T Value => _isSuccess ? _value! : throw new InvalidOperationException("No value");
    public string Error => !_isSuccess ? _error! : throw new InvalidOperationException("No error");

    public Result<U> Map<U>(Func<T, U> f) =>
        _isSuccess ? Result<U>.Ok(f(_value!)) : Result<U>.Fail(_error!);

    public T ValueOrDefault(T fallback) => _isSuccess ? _value! : fallback;
}

// Usage
static Result<int> Divide(int a, int b) =>
    b == 0 ? Result<int>.Fail("Division by zero") : Result<int>.Ok(a / b);

var r1 = Divide(10, 2).Map(n => n * 3);
var r2 = Divide(10, 0);

Console.WriteLine(r1.IsSuccess ? $"OK: {r1.Value}" : $"Err: {r1.Error}"); // OK: 15
Console.WriteLine(r2.IsSuccess ? $"OK: {r2.Value}" : $"Err: {r2.Error}"); // Err: Division by zero

// TryParse pattern — built-in C# idiom
if (int.TryParse("42", out int parsed))
    Console.WriteLine($"Parsed: {parsed}");
```

## Gotchas

- The `out` parameter pattern is the traditional C# approach to "try" operations; it is idiomatic but less composable than a proper `Result` type.
- `readonly record struct` is ideal here — it has value equality, is stack-allocated, and generates `ToString` automatically. Avoid class-based results in hot paths due to heap allocation.
