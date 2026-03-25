---
title: "Project Structure"
language: "java"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Java projects follow the standard Maven/Gradle directory layout: source files in `src/main/java`, test files in `src/test/java`, and resources in `src/main/resources`. The package namespace mirrors the directory hierarchy. A typical modern project uses modules (Java 9+ JPMS) or relies on the classpath convention. Spring Boot projects add `src/main/resources/application.yml` for configuration.

## Example

```
my-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/myapp/
│   │   │       ├── Main.java
│   │   │       ├── service/
│   │   │       │   └── UserService.java
│   │   │       └── model/
│   │   │           └── User.java
│   │   └── resources/
│   │       └── application.yml
│   └── test/
│       └── java/
│           └── com/example/myapp/
│               └── service/
│                   └── UserServiceTest.java
├── pom.xml         (Maven) or build.gradle.kts (Gradle)
└── .gitignore
```

```java
// com/example/myapp/model/User.java
package com.example.myapp.model;

public record User(long id, String name, String email) {}
```

```java
// com/example/myapp/Main.java
package com.example.myapp;

import com.example.myapp.model.User;

public class Main {
    public static void main(String[] args) {
        var user = new User(1L, "Alice", "alice@example.com");
        System.out.println(user);
    }
}
```

## Gotchas

- The package declaration at the top of each file must exactly match the directory path relative to the source root — a mismatch causes compile errors.
- Java 9 JPMS modules (`module-info.java`) add explicit dependency and export declarations; they are powerful but can conflict with libraries that haven't adopted them.
