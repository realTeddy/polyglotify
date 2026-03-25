---
title: "Package Manager"
language: "groovy"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Groovy projects use **Gradle** or **Maven** as their build and dependency management tools, backed by the Maven Central repository. Gradle is the dominant choice in the Groovy ecosystem (and is itself written in Groovy/Kotlin). For standalone scripts, the `@Grab` annotation (part of Grape) fetches dependencies directly from Maven Central at runtime without a build file.

## Example

```groovy
// @Grab in a standalone script (Grape)
@Grab('com.google.guava:guava:32.1.3-jre')
import com.google.common.collect.ImmutableList

def list = ImmutableList.of("a", "b", "c")
println list

// Gradle dependency block (build.gradle)
/*
plugins {
    id 'groovy'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.apache.groovy:groovy:4.0.15'
    implementation 'com.google.guava:guava:32.1.3-jre'
    testImplementation 'org.spockframework:spock-core:2.3-groovy-4.0'
}
*/

// Maven pom.xml snippet
/*
<dependency>
    <groupId>org.apache.groovy</groupId>
    <artifactId>groovy</artifactId>
    <version>4.0.15</version>
</dependency>
*/
```

## Gotchas

- `@Grab` downloads dependencies to a local Grape cache (`~/.groovy/grapes`) the first time it runs; subsequent runs use the cache but there is no lock file, so builds are not fully reproducible without pinning versions.
- Groovy's package namespace (`org.apache.groovy` for Groovy 4+) changed from `org.codehaus.groovy` in older versions — mixing them in a single project causes classpath conflicts.
- When using Gradle with Groovy, always declare the `groovy` plugin instead of `java`; the `groovy` plugin adds joint compilation support for mixed Groovy/Java source sets.
