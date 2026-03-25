---
title: "Build Tools"
language: "java"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Java projects are built with **Maven** or **Gradle**. Maven's fixed lifecycle (`compile`, `test`, `package`, `install`, `deploy`) is predictable but rigid. Gradle's flexible task graph enables custom pipelines and is significantly faster with its build cache. Both produce JAR or WAR artifacts. Spring Boot's Maven/Gradle plugins create executable "fat JARs" containing all dependencies. GraalVM Native Image compiles Java to a standalone native binary.

## Example

```bash
# Maven
mvn compile              # compile src/main/java
mvn test                 # run tests
mvn package              # produce target/my-app-1.0.jar
mvn clean install        # clean, build, install to local ~/.m2
mvn dependency:tree      # show dependency tree
mvn versions:display-dependency-updates  # check for newer versions

# Gradle
./gradlew compileJava    # compile
./gradlew test           # run tests
./gradlew build          # assemble and test
./gradlew dependencies   # show dependency tree
./gradlew clean build    # clean then build
./gradlew bootRun        # Spring Boot: run the app

# Create executable fat JAR (Spring Boot)
./gradlew bootJar
java -jar build/libs/my-app-1.0.jar
```

```kotlin
// build.gradle.kts — Spring Boot example
plugins {
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
    java
}

java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}
```

## Gotchas

- Always use the Gradle wrapper (`./gradlew`) rather than a globally-installed `gradle` command; the wrapper ensures all developers use the exact same Gradle version.
- Maven's local repository cache (`~/.m2/repository`) can become stale; use `mvn dependency:purge-local-repository` to force re-downloads when facing resolution issues.
