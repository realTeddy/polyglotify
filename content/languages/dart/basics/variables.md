---
title: "Variables & Declaration"
language: "dart"
feature: "variables"
category: "basics"
applicable: true
---

Dart variables can be declared with `var` (type inferred), an explicit type, `final` (single assignment, runtime constant), or `const` (compile-time constant). Dart is null-safe by default — to allow a variable to hold `null`, its type must be marked with `?`.

## Example

```dart
// Type inference
var name = 'Alice';
var age  = 30;

// Explicit types
String city   = 'London';
int    count  = 0;

// Nullable types
String? middleName = null;  // OK
// String noNull = null;    // compile error

// Final — assigned once, determined at runtime
final now = DateTime.now();

// Const — compile-time constant
const pi      = 3.14159;
const maxSize = 100;

// Late — deferred initialization (useful for non-nullable fields)
late String lazyValue;
lazyValue = expensiveComputation();  // initialized before first use

// Dynamic — opt out of static typing
dynamic anything = 42;
anything = 'now a string';  // allowed
```

## Gotchas

- `final` and `const` differ: `final` is evaluated at runtime, `const` at compile time
- Accessing a `late` variable before it is assigned throws a `LateInitializationError`
- `var` infers a non-nullable type; use `var?` or an explicit nullable type for nullables
