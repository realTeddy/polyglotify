---
title: "Generics"
language: "dart"
feature: "generics"
category: "oop"
applicable: true
---

Dart has reified generics — type parameters are available at runtime, unlike Java's type erasure. Generic classes, methods, and functions are supported. Bounds restrict type parameters with `extends`.

## Example

```dart
// Generic class
class Stack<T> {
  final _items = <T>[];

  void push(T item)  => _items.add(item);
  T    pop()         => _items.removeLast();
  T    get peek      => _items.last;
  bool get isEmpty   => _items.isEmpty;
}

final intStack    = Stack<int>();
final stringStack = Stack<String>();
intStack.push(1);

// Generic function
T first<T>(List<T> items) => items.first;
first<String>(['a', 'b']);  // explicit
first([1, 2, 3]);           // inferred

// Bounded type parameter
class NumberBox<T extends num> {
  final T value;
  NumberBox(this.value);
  T doubled() => (value * 2) as T;
}

// Reified generics at runtime
final stack = Stack<int>();
print(stack is Stack<int>);    // => true
print(stack is Stack<String>); // => false

// Covariance with extends
List<int> ints = [1, 2, 3];
List<num> nums = ints;   // OK — List is covariant in Dart
```

## Gotchas

- Dart `List<int>` is NOT a subtype of `List<Object>` for mutable lists in sound mode
- `List` (without type) is equivalent to `List<dynamic>` — avoid it
- Reified generics allow runtime type checks on generic containers, unlike Java
