---
title: "Maps & Dictionaries"
language: "groovy"
feature: "maps"
category: "data-structures"
applicable: true
---

Groovy map literals use `[key: value]` syntax and produce a `LinkedHashMap` by default, preserving insertion order. Keys in the literal syntax are treated as strings unless wrapped in parentheses for variable keys. Maps support dot-notation access, the `get` method with a default value, and all standard Groovy collection methods.

## Example

```groovy
// Map literal (LinkedHashMap)
def person = [name: "Alice", age: 30, active: true]

// Dot notation and bracket notation
println person.name        // Alice
println person["age"]      // 30

// Dynamic key (parentheses required)
def key = "active"
println person[(key)]      // true

// Default value with get
println person.get("role", "viewer")   // viewer

// Iteration
person.each { k, v -> println "$k = $v" }

// Transformation
def upper = person.collectEntries { k, v ->
    [k, v instanceof String ? v.toUpperCase() : v]
}
println upper   // [name:ALICE, age:30, active:true]

// Merging maps
def extra = [role: "admin", age: 31]
def merged = person + extra
println merged
```

## Gotchas

- Unquoted keys in map literals are always treated as `String`, even if a variable with the same name exists. Wrap the variable in `()` to use its value as a key.
- Map access with dot notation on a non-existent key returns `null`, not a `MissingPropertyException`.
- `+` on maps creates a new map; use `putAll` to mutate in place. The `+` operator does not modify either operand.
