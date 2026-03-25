---
title: "Project Structure"
language: "kotlin"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Kotlin JVM projects follow Maven/Gradle conventions: source files live in `src/main/kotlin` and tests in `src/test/kotlin`. Packages mirror directory structure. Multi-module Gradle projects use a `settings.gradle.kts` to include submodules. Android projects follow the Android Gradle plugin conventions with additional `res/` directories.

## Example

```
my-app/
├── settings.gradle.kts
├── build.gradle.kts
├── gradle/
│   └── libs.versions.toml
├── app/
│   ├── build.gradle.kts
│   └── src/
│       ├── main/
│       │   └── kotlin/
│       │       └── com/example/
│       │           ├── Main.kt
│       │           ├── models/
│       │           └── services/
│       └── test/
│           └── kotlin/
│               └── com/example/
│                   └── ServiceTest.kt
└── core/
    ├── build.gradle.kts
    └── src/main/kotlin/...
```

```kotlin
// settings.gradle.kts
rootProject.name = "my-app"
include(":app", ":core")
```

## Gotchas

- Kotlin package names don't need to match directory structure (unlike Java), but matching is strongly encouraged for tooling compatibility.
- The `internal` visibility modifier makes a declaration visible within the same Gradle module (compilation unit), not just the same package.
- Each Gradle submodule can use a different Kotlin target (JVM, JS, Native) in a Kotlin Multiplatform project.
