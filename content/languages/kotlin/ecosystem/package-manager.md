---
title: "Package Manager"
language: "kotlin"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Kotlin projects use either Gradle (the standard) or Maven for dependency management. Gradle with the Kotlin DSL (`build.gradle.kts`) is the modern choice. Dependencies are declared with Maven coordinates and fetched from Maven Central or JitPack. The `libs.versions.toml` version catalog centralizes version management in multi-module projects.

## Example

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.0.0"
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    testImplementation(kotlin("test"))
    testImplementation("io.mockk:mockk:1.13.10")
}

application {
    mainClass.set("com.example.MainKt")
}
```

```bash
# Build
./gradlew build

# Run
./gradlew run

# Test
./gradlew test

# Publish to local Maven repository
./gradlew publishToMavenLocal
```

## Gotchas

- The Kotlin compiler plugin for serialization (`kotlinx.serialization`) must be declared as a Gradle plugin in addition to adding the library dependency.
- Gradle's build cache (`--build-cache`) significantly speeds up CI builds; enable it in `gradle.properties`.
- Version catalog (`libs.versions.toml`) is the recommended way to share dependency versions across modules in a multi-project build.
