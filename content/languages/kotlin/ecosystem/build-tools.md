---
title: "Build Tools"
language: "kotlin"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Kotlin uses Gradle as the primary build tool (Kotlin DSL is preferred over Groovy). The Kotlin Gradle plugin handles compilation. `kotlinx.serialization`, `kapt`/`ksp` (annotation processing), and the Compose compiler plugin are common additions. `KSP` (Kotlin Symbol Processing) is the modern replacement for `kapt`.

## Example

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.0.0"
    id("com.google.devtools.ksp") version "2.0.0-1.0.21"
    kotlin("plugin.serialization") version "2.0.0"
}

kotlin {
    jvmToolchain(17)
    compilerOptions {
        freeCompilerArgs.add("-Xcontext-receivers")
    }
}

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
    ksp("io.github.raamcosta.compose-destinations:ksp:1.10.2")
}
```

```bash
# Build all
./gradlew build

# Compile only
./gradlew compileKotlin

# Run with arguments
./gradlew run --args="--port 8080"

# Generate dependency report
./gradlew dependencies
```

## Gotchas

- Gradle's configuration cache speeds up builds by caching the configuration phase; not all plugins support it — check compatibility before enabling.
- `kapt` is deprecated in favor of `ksp`; migrate annotation-processor dependencies to KSP for faster incremental compilation.
- The Kotlin compiler can be slow on large projects; use `--parallel` and `--configuration-cache` flags and ensure `kotlin.incremental=true` is set in `gradle.properties`.
