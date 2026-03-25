---
title: "Style Conventions"
language: "java"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Java follows the Oracle Java Code Conventions and Google Java Style Guide. Naming: `camelCase` for variables/methods, `PascalCase` for classes/interfaces/records, `SCREAMING_SNAKE_CASE` for constants. Braces use the "Egyptian" style (opening brace on the same line). Google's `google-java-format` and Checkstyle automate enforcement. Modern teams use `Spotless` in their Gradle/Maven build for automatic formatting.

## Example

```java
package com.example.service;

import java.util.List;
import java.util.Optional;

// PascalCase class name
public class UserService {

    // SCREAMING_SNAKE_CASE constant
    private static final int MAX_USERS = 1000;

    // camelCase field
    private final UserRepository userRepository;

    // Constructor injection preferred over field injection
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // camelCase method name, explicit return type
    public Optional<User> findById(long id) {
        return userRepository.findById(id);
    }

    // Verb-noun method names
    public User createUser(String name, String email) {
        if (name.isBlank()) throw new IllegalArgumentException("Name must not be blank");
        return userRepository.save(new User(0L, name, email));
    }

    // Boolean methods start with is/has/can
    public boolean isEmailTaken(String email) {
        return userRepository.existsByEmail(email);
    }
}
```

## Gotchas

- Java uses `//` for inline comments and `/** */` for Javadoc. All public API elements should have Javadoc; implementation details use `//` comments.
- Avoid abbreviations in names (`usr` → `user`, `mgr` → `manager`); Java's verbosity is intentional — IDE autocomplete makes long names practical.
