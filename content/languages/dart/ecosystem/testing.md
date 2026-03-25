---
title: "Testing"
language: "dart"
feature: "testing"
category: "ecosystem"
applicable: true
---

Dart's standard testing library is the `test` package. Tests use `test()`, `group()`, and `expect()`. The `mockito` or `mocktail` packages provide mocking. Flutter adds `flutter_test` with widget and integration testing utilities.

## Example

```dart
// test/calculator_test.dart
import 'package:test/test.dart';
import 'package:my_app/calculator.dart';

void main() {
  group('Calculator', () {
    late Calculator calc;

    setUp(() {
      calc = Calculator();
    });

    test('add returns sum of two numbers', () {
      expect(calc.add(2, 3), equals(5));
    });

    test('divide throws on zero divisor', () {
      expect(() => calc.divide(1, 0), throwsA(isA<ArgumentError>()));
    });

    test('async operations', () async {
      final result = await calc.fetchAndCompute();
      expect(result, greaterThan(0));
    });
  });
}
```

```bash
dart test                    # run all tests
dart test test/calculator_test.dart
dart test --coverage=coverage
flutter test                 # run Flutter tests
```

## Gotchas

- `setUp` / `tearDown` run before/after each test; `setUpAll` / `tearDownAll` run once per group
- Use `throwsA(isA<ExceptionType>())` for exception testing — not `throws` alone
- Flutter's `testWidgets` pump-and-settle pattern is needed for widget lifecycle
