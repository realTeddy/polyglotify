---
title: "Package Manager"
language: "dart"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Dart's package manager is **pub**, accessed via `dart pub` (or `flutter pub` in Flutter projects). Packages are hosted on **pub.dev**. Dependencies are declared in `pubspec.yaml`; resolved versions are locked in `pubspec.lock`.

## Example

```yaml
# pubspec.yaml
name: my_app
description: A Dart application
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  http: ^1.1.0
  freezed_annotation: ^2.4.0

dev_dependencies:
  build_runner: ^2.4.0
  freezed: ^2.4.0
  lints: ^3.0.0

dependency_overrides:
  some_package: '2.0.0'
```

```bash
# Install dependencies
dart pub get

# Add a package
dart pub add http

# Add a dev dependency
dart pub add --dev lints

# Upgrade packages
dart pub upgrade

# Show outdated
dart pub outdated
```

## Gotchas

- `pubspec.lock` should be committed in applications but gitignored in published packages
- `^1.1.0` means `>=1.1.0 <2.0.0` (caret constraint respects major version)
- The `dependency_overrides` section forces a specific version and should only be used temporarily
