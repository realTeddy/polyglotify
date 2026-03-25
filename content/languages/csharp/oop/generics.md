---
title: "Generics"
language: "csharp"
feature: "generics"
category: "oop"
applicable: true
---

C# generics are reified — type information is preserved at runtime, unlike Java's erasure. This means `List<int>` and `List<string>` are genuinely different types at runtime, `typeof(List<int>)` works, and `is List<int>` works. Constraints (`where T : class`, `where T : struct`, `where T : new()`, `where T : IComparable<T>`) restrict type arguments. Variance (`in`/`out`) applies to generic interfaces and delegates.

## Example

```csharp
// Generic class
class Stack<T> {
    private readonly List<T> _items = new();

    public void Push(T item) => _items.Add(item);
    public T Pop() {
        if (_items.Count == 0) throw new InvalidOperationException("Stack is empty");
        var item = _items[^1];
        _items.RemoveAt(_items.Count - 1);
        return item;
    }
    public T Peek() => _items.Count > 0 ? _items[^1]
        : throw new InvalidOperationException("Stack is empty");
    public int Count => _items.Count;
}

// Generic method with constraint
static T Max<T>(T a, T b) where T : IComparable<T> =>
    a.CompareTo(b) >= 0 ? a : b;

// Multiple constraints
static T CreateAndLog<T>(ILogger logger) where T : class, new() {
    var instance = new T();
    logger.Log($"Created {typeof(T).Name}");
    return instance;
}

// Covariant interface (out — producer, read-only)
interface IProducer<out T> {
    T Produce();
}

// Contravariant interface (in — consumer, write-only)
interface IConsumer<in T> {
    void Consume(T item);
}

// Usage
var stack = new Stack<int>();
stack.Push(1); stack.Push(2); stack.Push(3);
Console.WriteLine(stack.Pop()); // 3
Console.WriteLine(Max("apple", "banana")); // banana

// Reified: runtime type check works
object list = new List<int>();
Console.WriteLine(list is List<int>); // true
Console.WriteLine(list is List<string>); // false
```

## Gotchas

- `where T : struct` constrains to non-nullable value types; `where T : class` constrains to reference types and allows `null` comparisons.
- Variance (`in`/`out`) is available only on generic interface and delegate type parameters, not on generic classes.
