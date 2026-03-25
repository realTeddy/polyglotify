---
title: "Project Structure"
language: "dart"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Dart package/application has a conventional layout: `lib/` for public library code, `bin/` for executables, `test/` for tests, and `pubspec.yaml` for metadata. Flutter projects add `lib/main.dart` as the entry point and platform-specific directories.

## Example

```
my_package/
├── bin/
│   └── my_app.dart          # entry point for CLI
├── lib/
│   ├── my_package.dart      # main library export barrel
│   └── src/
│       ├── client.dart
│       └── models/
│           └── user.dart
├── test/
│   ├── client_test.dart
│   └── helpers/
│       └── test_helpers.dart
├── pubspec.yaml
├── pubspec.lock
├── analysis_options.yaml    # linter config
└── README.md

# Flutter layout additions
flutter_app/
├── lib/
│   ├── main.dart
│   ├── screens/
│   ├── widgets/
│   └── services/
├── assets/
├── android/
├── ios/
└── web/
```

## Gotchas

- Code in `lib/src/` is private by convention; only export what you intend as public API via the barrel file in `lib/`
- `analysis_options.yaml` configures the Dart analyzer and linter rules — always include one
- `dart create` scaffolds a new project with the correct structure
