---
title: "Structs & Classes"
language: "dart"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Dart does not have a separate `struct` keyword. Lightweight, immutable data containers are expressed with classes using `final` fields, a `const` constructor, or with Dart 3's Records. The `freezed` package is popular for generating immutable data classes with copyWith, equality, and serialization.

## Example

```dart
// Immutable class (manual)
class Point {
  final int x;
  final int y;

  const Point(this.x, this.y);

  @override
  bool operator ==(Object other) =>
      other is Point && other.x == x && other.y == y;

  @override
  int get hashCode => Object.hash(x, y);

  @override
  String toString() => 'Point($x, $y)';
}

const p = Point(3, 4);

// Record as lightweight struct (Dart 3)
typedef Color = ({int r, int g, int b});
const red = (r: 255, g: 0, b: 0);

// Data class with copyWith (freezed-style, manual)
class User {
  final String name;
  final int age;
  const User({required this.name, required this.age});

  User copyWith({String? name, int? age}) =>
      User(name: name ?? this.name, age: age ?? this.age);
}
```

## Gotchas

- Dart classes are reference types; use `const` constructors and `==`/`hashCode` overrides for value semantics
- Records (Dart 3+) provide the most concise struct-like syntax with built-in structural equality
- The `freezed` code-generation package is the community standard for complex immutable data classes
