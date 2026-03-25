---
title: "Exceptions & Try/Catch"
language: "dart"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Dart uses `try/catch/finally` for exception handling. Any object can be thrown; by convention classes implement `Exception` or `Error`. The `on` clause matches specific types; `catch` provides the exception object. `rethrow` re-throws without losing the original stack trace.

## Example

```dart
// Basic try/catch/finally
try {
  final result = int.parse('abc');
  print(result);
} on FormatException catch (e) {
  print('Format error: ${e.message}');
} on RangeError catch (e, stackTrace) {
  print('Range error: $e');
  print(stackTrace);
} catch (e) {            // catches anything else
  rethrow;               // preserve original stack trace
} finally {
  print('Always runs');
}

// Custom exception
class InsufficientFundsException implements Exception {
  final double amount;
  InsufficientFundsException(this.amount);

  @override
  String toString() => 'InsufficientFundsException: cannot withdraw \$$amount';
}

void withdraw(double amount) {
  if (amount > balance) throw InsufficientFundsException(amount);
  // ...
}

// Async error handling
Future<void> fetchData() async {
  try {
    final data = await http.get(Uri.parse('https://api.example.com'));
    print(data.body);
  } on SocketException {
    print('No internet');
  }
}
```

## Gotchas

- Unlike Java, Dart has no checked exceptions — nothing forces callers to handle exceptions
- `Error` and its subclasses represent programming errors (bugs); do not catch them in general code
- `rethrow` preserves the original stack trace; `throw e` resets it to the catch block's location
