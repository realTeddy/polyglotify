---
title: "Build Tools"
language: "dart"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Dart uses `dart compile` for compilation and the `build_runner` package for code generation (used with `freezed`, `json_serializable`, etc.). Flutter projects use `flutter build` for multi-platform compilation. There is no separate Makefile-like build tool; `dart run` scripts or `Makefile`/`just` are used for task automation.

## Example

```bash
# Compile to native executable
dart compile exe bin/my_app.dart -o build/my_app

# Compile to JavaScript
dart compile js lib/main.dart -o build/main.js

# Run code generation (e.g., freezed, json_serializable)
dart run build_runner build
dart run build_runner watch    # watch mode for dev
dart run build_runner build --delete-conflicting-outputs

# Flutter builds
flutter build apk              # Android
flutter build ipa              # iOS
flutter build web

# Run a Dart script
dart run bin/my_app.dart
dart run my_package            # runs the package's main
```

```yaml
# build.yaml — configure build_runner targets
targets:
  $default:
    builders:
      json_serializable:
        options:
          explicit_to_json: true
```

## Gotchas

- `build_runner` generates `.g.dart` files; commit them or ensure CI runs code gen before builds
- `dart compile exe` produces a self-contained native binary; `dart compile aot-snapshot` requires the Dart runtime
- Always run `dart format .` before committing — the formatter is opinionated and non-configurable
