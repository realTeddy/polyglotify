---
title: "Common Patterns"
language: "dart"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Idiomatic Dart favors null-safety operators, cascade notation, collection-if/for in literals, and `sealed` classes for discriminated unions. The factory constructor pattern enables singletons and caching. `extension` methods add functionality to existing types without subclassing.

## Example

```dart
// Extension methods
extension StringX on String {
  bool get isEmail => contains('@') && contains('.');
  String capitalize() => '${this[0].toUpperCase()}${substring(1)}';
}
'alice@example.com'.isEmail  // => true
'hello'.capitalize()         // => "Hello"

// Singleton via factory constructor
class Config {
  static final Config _instance = Config._();
  factory Config() => _instance;
  Config._();
  String apiUrl = 'https://api.example.com';
}

// Sealed class for discriminated union
sealed class Shape {}
class Circle    extends Shape { final double radius; Circle(this.radius); }
class Rectangle extends Shape { final double w, h;  Rectangle(this.w, this.h); }

double area(Shape s) => switch (s) {
  Circle(radius: final r)           => 3.14 * r * r,
  Rectangle(width: final w, height: final h) => w * h,
};

// Collection-if and collection-for
final items = [
  'always',
  if (isAdmin) 'admin-item',
  for (final tag in tags) 'tag:$tag',
];
```

## Gotchas

- Extensions cannot add instance fields or override existing methods
- Sealed class exhaustiveness is checked in `switch` expressions — adding a new subclass is a compile error until all switches are updated
- Cascade `..` is great for builder-style APIs but can be confusing when mixed with null-aware (`?..`)
