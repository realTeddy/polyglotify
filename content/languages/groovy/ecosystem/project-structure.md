---
title: "Project Structure"
language: "groovy"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Gradle-based Groovy project follows the same Maven standard directory layout as Java: source files go under `src/main/groovy` and tests under `src/test/groovy`. Mixed Groovy/Java projects place Java under `src/main/java` and Groovy under `src/main/groovy`; the Groovy plugin handles joint compilation automatically. Resources live in `src/main/resources`.

## Example

```
my-groovy-app/
├── build.gradle
├── settings.gradle
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
└── src/
    ├── main/
    │   ├── groovy/
    │   │   └── com/example/
    │   │       ├── App.groovy
    │   │       └── service/
    │   │           └── UserService.groovy
    │   └── resources/
    │       └── application.properties
    └── test/
        └── groovy/
            └── com/example/
                └── service/
                    └── UserServiceSpec.groovy
```

```groovy
// settings.gradle
rootProject.name = 'my-groovy-app'

// build.gradle
plugins {
    id 'groovy'
    id 'application'
}
mainClassName = 'com.example.App'
repositories { mavenCentral() }
dependencies {
    implementation 'org.apache.groovy:groovy:4.0.15'
    testImplementation 'org.spockframework:spock-core:2.3-groovy-4.0'
}
```

## Gotchas

- Groovy source files must end with `.groovy`; placing them in `src/main/java` with a `.groovy` extension will cause the Java compiler to fail on them unless joint compilation is configured.
- Scripts (single-file Groovy programs) do not need a class declaration; placing a class-less script in the production source tree will compile fine but not produce a reusable class.
- The Groovy compiler generates `.class` files for each class and for the script's top-level code, so a single `.groovy` file can produce multiple `.class` files.
