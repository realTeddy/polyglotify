---
title: "Result Types"
language: "dart"
feature: "result-types"
category: "error-handling"
applicable: false
---

Dart does not have a built-in `Result` type. The idiomatic approach uses exceptions or nullable return types. Libraries like `fpdart` and `dartz` provide `Either`/`Option` monads. Some teams implement a lightweight `Result<T, E>` sealed class using Dart 3's sealed classes.

## Example

```dart
// Nullable return (simple cases)
String? findUser(String id) => users[id];  // null = not found

// Sealed Result type (Dart 3 sealed classes)
sealed class Result<T> {}
class Success<T> extends Result<T> {
  final T value;
  Success(this.value);
}
class Failure<T> extends Result<T> {
  final String error;
  Failure(this.error);
}

Result<int> divide(int a, int b) {
  if (b == 0) return Failure('Division by zero');
  return Success(a ~/ b);
}

final result = divide(10, 2);
switch (result) {
  case Success(value: final v): print('Result: $v');
  case Failure(error: final e): print('Error: $e');
}

// Using fpdart Either
import 'package:fpdart/fpdart.dart';
Either<String, int> safeDivide(int a, int b) =>
    b == 0 ? left('Division by zero') : right(a ~/ b);
```

## Gotchas

- Null returns are fine for simple optional values but lose error information; use `Result` when error context matters
- Dart 3 sealed classes with pattern matching provide exhaustive switch handling without external libraries
