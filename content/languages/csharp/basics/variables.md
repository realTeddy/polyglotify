---
title: "Variables"
language: "csharp"
feature: "variables"
category: "basics"
applicable: true
---

C# variables are statically typed. The `var` keyword enables local type inference — the compiler determines the type from the initializer. `const` creates compile-time constants; `readonly` creates runtime-immutable fields. C# 11+ adds `required` for mandatory property initialization. Value types (structs, primitives) are stack-allocated; reference types (classes, strings) live on the heap.

## Example

```csharp
// Explicit types
int age = 30;
double pi = 3.14159;
bool isActive = true;
string name = "Alice";

// Local type inference
var count = 42;               // int
var items = new List<string>(); // List<string>

// Compile-time constant
const double MaxRate = 0.99;

// Readonly — set once (constructor or initializer)
readonly int id;

// Nullable value types
int? maybeInt = null;
maybeInt = 5;

// Null-coalescing
string display = name ?? "Anonymous";
string? nullable = null;
int length = nullable?.Length ?? 0;

// Deconstruction
var (x, y) = (10, 20);
var (first, second, _) = ("a", "b", "c"); // discard with _
```

## Gotchas

- `var` is not `dynamic` — the type is still statically resolved at compile time. `dynamic` bypasses the type system entirely and defers binding to runtime.
- C# strings are reference types but behave like value types for equality: `==` on strings compares content, not reference identity.
