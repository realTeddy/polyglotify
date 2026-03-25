---
title: "Operators"
language: "dart"
feature: "operators"
category: "basics"
applicable: true
---

Dart supports standard arithmetic, relational, and logical operators, plus null-aware operators (`??`, `?.`, `??=`) that are essential in null-safe code. Operators can be overloaded in classes by defining the `operator` keyword method.

## Example

```dart
// Arithmetic
print(10 ~/ 3);  // => 3 (integer division)
print(10 %  3);  // => 1

// Null-aware operators
String? name;
print(name ?? 'Guest');        // ?? default if null
name ??= 'Alice';              // assign if null
print(name?.length);           // ?. safe call, null if name is null

// Type test operators
var x = 'hello';
print(x is String);    // => true
print(x is! int);      // => true

// Cascade (..) — call multiple methods on same object
final buffer = StringBuffer()
  ..write('Hello')
  ..write(', ')
  ..write('World');
print(buffer.toString());  // => "Hello, World"

// Spread in collections
var a = [1, 2];
var b = [0, ...a, 3];    // => [0, 1, 2, 3]

// Conditional spread
List<int>? extras;
var c = [1, 2, ...?extras];  // safe spread of nullable
```

## Gotchas

- `~/` is integer division (returns `int`); `/` always returns `double` even for whole numbers
- Cascade `..` returns the original object, not the return value of the last call
- `==` tests value equality by default; override `operator ==` and `hashCode` together in custom classes
