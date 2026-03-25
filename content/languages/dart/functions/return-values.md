---
title: "Return Values"
language: "dart"
feature: "return-values"
category: "functions"
applicable: true
---

Dart functions declare their return type explicitly. A function declared `void` returns nothing. Functions without an explicit `return` statement return `null`. Async functions return `Future<T>`, and generator functions return `Iterable<T>` or `Stream<T>`.

## Example

```dart
// Explicit return type
int square(int n) => n * n;

// Multiple return values via a record (Dart 3+)
(int, String) getInfo() {
  return (42, 'hello');
}
final (number, text) = getInfo();

// Returning null for optional results
String? findName(List<String> names, String prefix) {
  for (final name in names) {
    if (name.startsWith(prefix)) return name;
  }
  return null;  // not found
}

// Async return value
Future<int> fetchCount() async {
  final data = await fetchFromApi();
  return data.length;
}

// Generator — lazy sequence
Iterable<int> range(int start, int end) sync* {
  for (var i = start; i <= end; i++) {
    yield i;
  }
}
range(1, 5).toList();  // => [1, 2, 3, 4, 5]
```

## Gotchas

- A `void` function that has a `return expr;` statement will cause a compile warning; use bare `return;`
- Records (Dart 3+) are the idiomatic way to return multiple values, replacing the previous pattern of returning a custom class or `List`
- `Future<void>` is different from `void` — an async void function should be declared `Future<void>` so it can be awaited
