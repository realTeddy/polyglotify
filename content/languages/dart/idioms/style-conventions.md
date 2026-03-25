---
title: "Style Conventions"
language: "dart"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Dart style is enforced by `dart format` (non-configurable) and the `lints` or `flutter_lints` package. Naming: `lowerCamelCase` for variables/functions, `UpperCamelCase` for types, `lowercase_with_underscores` for files/packages, and `SCREAMING_CAPS` for constants defined with `const`.

## Example

```dart
// File: user_repository.dart
// Package: my_package

// Constants
const int maxRetries = 3;          // lowerCamelCase for const in code
const double kPadding = 8.0;       // Flutter prefix k convention

// Types
class UserRepository { }
typedef JsonMap = Map<String, dynamic>;

// Functions / variables
String formatUserName(String firstName, String lastName) {
  final fullName = '$firstName $lastName';
  return fullName.trim();
}

// Prefer final for locals that don't change
final user = User(name: 'Alice');

// Prefer named parameters for clarity when ≥2 bool/int params
void configure({required bool debug, int timeout = 30}) { }
configure(debug: true, timeout: 60);

// doc comments use ///
/// Returns the user with the given [id], or null if not found.
User? findById(String id) => _cache[id];
```

## Gotchas

- `dart format` is non-negotiable — it will reformat code without options; integrate it into pre-commit hooks
- Prefer `final` over `var` for variables that are only assigned once (enforced by `prefer_final_locals` lint)
- The `avoid_print` lint flags `print()` in production code; use a proper logging package
