---
title: "Tuples"
language: "dart"
feature: "tuples"
category: "data-structures"
applicable: true
---

Dart 3.0 introduced **Records** as the native tuple equivalent. Records are fixed-size, immutable, anonymous value types that can be positional or named. They have structural equality and work seamlessly with pattern matching.

## Example

```dart
// Positional record
(int, String) point = (10, 'hello');
print(point.$1);  // => 10
print(point.$2);  // => "hello"

// Named fields
({int x, int y}) coord = (x: 10, y: 20);
print(coord.x);   // => 10

// Mixed positional + named
(int, {String label}) item = (42, label: 'answer');

// Destructuring
final (a, b) = (1, 'two');

// Returning multiple values from a function
(int min, int max) minMax(List<int> nums) {
  return (nums.reduce((a, b) => a < b ? a : b),
          nums.reduce((a, b) => a > b ? a : b));
}
final (lo, hi) = minMax([3, 1, 4, 1, 5]);

// Pattern matching with records
switch ((statusCode, body)) {
  case (200, var data): print('OK: $data');
  case (404, _):        print('Not found');
}
```

## Gotchas

- Records are immutable — you cannot modify fields after creation
- Record equality is structural: `(1, 2) == (1, 2)` is `true` even for different instances
- Records are not subtypes of each other even with the same fields in different order
