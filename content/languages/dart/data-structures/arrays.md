---
title: "Arrays & Lists"
language: "dart"
feature: "arrays"
category: "data-structures"
applicable: true
---

Dart uses `List<T>` as its array/list type. Lists can be growable (default) or fixed-length. They are zero-indexed and support slicing, spreading, and a rich set of collection methods through the `Iterable` interface.

## Example

```dart
// Growable list
var nums = <int>[1, 2, 3];
nums.add(4);
nums.addAll([5, 6]);

// Fixed-length list
final fixed = List<int>.filled(5, 0);  // [0, 0, 0, 0, 0]
// fixed.add(1);  // throws UnsupportedError

// List literals with type inference
final fruits = ['apple', 'banana', 'cherry'];

// Access
print(fruits[0]);          // => "apple"
print(fruits.last);        // => "cherry"
print(fruits.sublist(1));  // => ["banana", "cherry"]

// Common operations
nums.map((n) => n * 2).toList();
nums.where((n) => n.isEven).toList();
nums.fold(0, (acc, n) => acc + n);   // sum
nums.sort();
nums.reversed.toList();

// Spread operator
var combined = [...nums, ...fruits.map(int.parse)];

// Collection if / for
var doubled = [for (var n in nums) n * 2];
var conditional = [1, 2, if (true) 3];
```

## Gotchas

- Accessing an out-of-bounds index throws `RangeError`, not null
- `List.generate` is useful for creating lists with computed values: `List.generate(5, (i) => i * i)`
- `const [1, 2, 3]` creates a compile-time constant, deeply immutable list
