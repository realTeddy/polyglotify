---
title: "Sets"
language: "dart"
feature: "sets"
category: "data-structures"
applicable: true
---

Dart's `Set<T>` stores unique elements with no guaranteed order (default `LinkedHashSet` preserves insertion order). Sets support standard mathematical operations and are useful for deduplication and fast membership testing.

## Example

```dart
// Set literal (must have type annotation to distinguish from map)
final fruits = <String>{'apple', 'banana', 'cherry'};

// From list (deduplication)
final nums   = {1, 2, 3, 2, 1};  // => {1, 2, 3}
final unique = Set<int>.from([1, 2, 2, 3]);

// Add / remove
fruits.add('date');
fruits.remove('banana');

// Membership
print(fruits.contains('apple'));  // => true

// Set operations
final a = {1, 2, 3, 4};
final b = {3, 4, 5, 6};

a.union(b);        // => {1, 2, 3, 4, 5, 6}
a.intersection(b); // => {3, 4}
a.difference(b);   // => {1, 2}

// Conversion
fruits.toList();
List<String>.from(fruits);
```

## Gotchas

- An empty `{}` creates a `Map`, not a `Set`; use `<Type>{}` or `Set<Type>()` for an empty set
- `LinkedHashSet` (default) preserves insertion order; `HashSet` does not
- Sets use `==` and `hashCode` for equality — custom objects must override both
