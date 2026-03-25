---
title: "Maps & Dictionaries"
language: "dart"
feature: "maps"
category: "data-structures"
applicable: true
---

Dart's `Map<K, V>` is an ordered (insertion-order) key-value store. Both `HashMap` (unordered, faster lookup) and `LinkedHashMap` (ordered, the default) are available. Map literals use curly brace syntax.

## Example

```dart
// Map literal
final person = <String, dynamic>{
  'name': 'Alice',
  'age':  30,
};

// Typed map
final scores = <String, int>{
  'Alice': 95,
  'Bob':   87,
};

// Access
print(scores['Alice']);           // => 95
print(scores['Unknown']);         // => null (no error)
print(scores['Unknown'] ?? 0);   // => 0

// Mutation
scores['Carol'] = 92;
scores.remove('Bob');

// Iteration
scores.forEach((key, value) {
  print('$key: $value');
});
for (final entry in scores.entries) {
  print('${entry.key}: ${entry.value}');
}

// Transform
final doubled = scores.map((k, v) => MapEntry(k, v * 2));

// Check keys / values
scores.containsKey('Alice');   // => true
scores.keys.toList();
scores.values.toList();
```

## Gotchas

- `Map[]` returns `null` for missing keys; use `.putIfAbsent` or `??` for defaults
- The default `Map` literal creates a `LinkedHashMap` which preserves insertion order
- `const {'a': 1}` creates a compile-time constant, deeply immutable map
