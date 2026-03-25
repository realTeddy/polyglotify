---
title: "Build Tools"
language: "groovy"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

**Gradle** is the primary build tool for Groovy projects and was originally written in Groovy (Groovy DSL for `build.gradle`). Gradle handles compilation, testing, packaging, and dependency resolution. **Maven** is a fully supported alternative using XML configuration. Gradle's Groovy DSL (`build.gradle`) is being complemented by the Kotlin DSL (`build.gradle.kts`) in many projects, but the Groovy DSL remains widely used.

## Example

```groovy
// build.gradle (Groovy DSL)
plugins {
    id 'groovy'
    id 'application'
}

group = 'com.example'
version = '1.0.0'
mainClass = 'com.example.App'

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.apache.groovy:groovy-all:4.0.15'
    testImplementation 'org.spockframework:spock-core:2.3-groovy-4.0'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
}

test {
    useJUnitPlatform()
}

jar {
    manifest {
        attributes 'Main-Class': mainClass
    }
}
```

```bash
./gradlew build        # compile + test + jar
./gradlew run          # run the application
./gradlew test         # run tests only
./gradlew dependencies # show dependency tree
```

## Gotchas

- The Groovy DSL and Kotlin DSL for Gradle are not interchangeable; switching between them requires renaming the build file and rewriting closures as lambdas.
- Gradle's incremental build cache can become stale when build scripts change; run `./gradlew clean build` when you see unexpected build failures.
- Using `groovy-all` includes all optional Groovy modules (JSON, XML, SQL, etc.); use individual `groovy` + specific module artifacts instead for smaller dependency footprints.
