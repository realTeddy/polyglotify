---
title: "Style Conventions"
language: "csharp"
feature: "style-conventions"
category: "idioms"
applicable: true
---

C# follows Microsoft's official .NET Runtime Coding Conventions. Naming: `PascalCase` for all public members (classes, methods, properties, events), `camelCase` for local variables and parameters, `_camelCase` for private fields. Interfaces are prefixed with `I`. Async methods are suffixed with `Async`. `dotnet format` and `.editorconfig` automate style enforcement. Roslyn analyzers catch style violations at compile time.

## Example

```csharp
// Naming conventions
public interface IEmailSender {              // I-prefix for interfaces
    Task SendAsync(string to, string body);  // PascalCase, Async suffix
}

public class SmtpEmailSender : IEmailSender {
    private readonly string _host;           // _camelCase private field
    private static readonly TimeSpan DefaultTimeout = TimeSpan.FromSeconds(30);

    public SmtpEmailSender(string host) {    // PascalCase constructor
        _host = host;
    }

    public string Host => _host;             // PascalCase property

    public async Task SendAsync(string to, string body) {
        // camelCase local variables
        var message = BuildMessage(to, body);
        await DeliverAsync(message);
    }

    private static string BuildMessage(string to, string body) =>
        $"To: {to}\n\n{body}";

    private Task DeliverAsync(string message) =>
        Task.CompletedTask; // stub
}

// Constants and enums
public enum LogLevel { Debug, Info, Warning, Error }   // PascalCase members
public const int MaxRetries = 3;
```

## Gotchas

- Unlike Java's `camelCase` for constants, C# uses `PascalCase` for `const` and `static readonly` fields in public APIs (e.g., `MaxRetries`). Private constants sometimes use `_camelCase` or `SCREAMING_SNAKE_CASE` by team preference.
- Methods that return `Task` but don't need `async/await` internally should still be named with the `Async` suffix if they are part of an async interface contract — this signals to callers that the return is awaitable.
