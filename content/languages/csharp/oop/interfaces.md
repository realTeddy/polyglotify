---
title: "Interfaces"
language: "csharp"
feature: "interfaces"
category: "oop"
applicable: true
---

C# interfaces define contracts with methods, properties, events, and indexers. C# 8+ allows `default` interface method implementations, enabling interface evolution without breaking existing implementations. A class can implement multiple interfaces. Interfaces can inherit from other interfaces. Explicit interface implementation resolves naming conflicts between interfaces with the same member name.

## Example

```csharp
interface IReadable {
    string Read();
}

interface IWritable {
    void Write(string content);
}

interface IStorage : IReadable, IWritable {
    long Size { get; }

    // Default method (C# 8+)
    string ReadOrDefault(string fallback = "") {
        try { return Read(); }
        catch { return fallback; }
    }
}

class MemoryStorage : IStorage {
    private string _data = "";

    public string Read() => _data;
    public void Write(string content) => _data = content;
    public long Size => _data.Length;
}

// Explicit interface implementation — resolves ambiguity
interface ILogger {
    void Log(string message);
}

interface IAudit {
    void Log(string action);  // same name as ILogger.Log
}

class AuditLogger : ILogger, IAudit {
    void ILogger.Log(string message) => Console.WriteLine($"[LOG] {message}");
    void IAudit.Log(string action)   => Console.WriteLine($"[AUDIT] {action}");
}

// Usage
IStorage store = new MemoryStorage();
store.Write("hello");
Console.WriteLine(store.Read());  // hello
Console.WriteLine(store.ReadOrDefault()); // hello
```

## Gotchas

- Default interface methods are accessed only through the interface reference, not the concrete class variable — implementing classes don't automatically inherit default method implementations as class members.
- Explicitly-implemented members are invisible unless the object is cast to the interface type, which can be surprising when calling code holds the concrete type.
