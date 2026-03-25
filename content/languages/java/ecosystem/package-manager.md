---
title: "Package Manager"
language: "java"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Java's two dominant build and dependency management tools are **Maven** and **Gradle**. Maven uses XML (`pom.xml`) and a convention-over-configuration lifecycle. Gradle uses a Groovy or Kotlin DSL (`build.gradle` / `build.gradle.kts`) and offers faster incremental builds with better caching. Both resolve dependencies from Maven Central and other repositories. Gradle is the standard for Android; Maven remains common in enterprise Java.

## Example

```xml
<!-- pom.xml — Maven -->
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>

  <properties>
    <java.version>21</java.version>
    <maven.compiler.release>21</maven.compiler.release>
  </properties>

  <dependencies>
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.17.0</version>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.10.2</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

```kotlin
// build.gradle.kts — Gradle Kotlin DSL
plugins {
    java
    application
}

repositories { mavenCentral() }

dependencies {
    implementation("com.fasterxml.jackson.core:jackson-databind:2.17.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.2")
}

tasks.test { useJUnitPlatform() }
```

## Gotchas

- Maven resolves dependency version conflicts by "nearest definition" (shortest path in the dependency tree), which can pull in older versions of transitive dependencies. Use `<dependencyManagement>` to pin versions explicitly.
- Gradle's build cache and incremental compilation make it significantly faster than Maven for large projects; Maven's stricter lifecycle is easier to reason about for newcomers.
