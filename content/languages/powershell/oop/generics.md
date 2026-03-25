---
title: "Generics"
language: "powershell"
feature: "generics"
category: "oop"
applicable: true
---

PowerShell supports .NET generics by constructing generic types using `[TypeName[T]]` syntax. You cannot define generic PowerShell classes — generic type definitions require C# via `Add-Type`. However, consuming and using existing .NET generic types (`List[T]`, `Dictionary[K,V]`, `HashSet[T]`, etc.) works natively and is idiomatic for performance-sensitive collections.

## Example

```powershell
# Using built-in generic types
$list = [System.Collections.Generic.List[string]]::new()
$list.Add("Alice")
$list.Add("Bob")
$list.Add("Carol")
$list | Where-Object { $_ -like "A*" }   # Alice

# Generic Dictionary
$dict = [System.Collections.Generic.Dictionary[string, int]]::new()
$dict["Alice"] = 95
$dict["Bob"]   = 87
$dict.ContainsKey("Alice")   # True

# Generic Queue and Stack
$queue = [System.Collections.Generic.Queue[string]]::new()
$queue.Enqueue("first")
$queue.Enqueue("second")
$queue.Dequeue()   # first

$stack = [System.Collections.Generic.Stack[int]]::new()
$stack.Push(1); $stack.Push(2); $stack.Push(3)
$stack.Pop()   # 3

# Generic type via Add-Type (define your own)
Add-Type @'
    public class Repository<T> {
        private System.Collections.Generic.List<T> _items = new();
        public void Add(T item)      => _items.Add(item);
        public int  Count            => _items.Count;
        public T    Get(int i)       => _items[i];
    }
'@
$repo = [Repository[string]]::new()
$repo.Add("hello")
Write-Host $repo.Count   # 1
Write-Host $repo.Get(0)  # hello
```

## Gotchas

- Generic type parameters in PowerShell use `[TypeName[T]]` syntax; for multiple type parameters use `[TypeName[T1, T2]]` — the comma goes inside the square brackets.
- PowerShell's `class` keyword does not support generic type parameters; you must use `Add-Type` with C# code to define a generic class.
- Type constraints on generic parameters (e.g., `where T : IComparable`) are only enforced at compile time in C#; they are not checked by PowerShell when constructing the type.
