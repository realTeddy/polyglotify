---
title: "Style Conventions"
language: "kotlin"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Kotlin style is defined in the official Kotlin Coding Conventions and enforced by `ktlint` or `detekt`. Naming uses `camelCase` for functions, properties, and local variables; `PascalCase` for classes and objects; `SCREAMING_SNAKE_CASE` for constants. Files may contain multiple top-level declarations when they are closely related. Prefer expression bodies for short functions.

## Example

```kotlin
// Idiomatic Kotlin style
package com.example.users

const val MAX_USERNAME_LENGTH = 50

data class User(
    val id: Long,
    val username: String,
    val email: String,
) {
    val isValid: Boolean
        get() = username.length in 1..MAX_USERNAME_LENGTH && email.contains('@')
}

fun List<User>.findByEmail(email: String): User? =
    firstOrNull { it.email.equals(email, ignoreCase = true) }

object UserDefaults {
    val anonymous = User(id = 0L, username = "anonymous", email = "none@example.com")
}
```

## Gotchas

- Trailing commas in parameter lists and argument lists are allowed and encouraged — they make version-control diffs cleaner when adding or reordering items.
- `ktlint` enforces a strict set of rules; `detekt` is a static analyzer with configurable rules — use both for comprehensive style and quality checks.
- Prefer `object` for singletons over companion objects when the singleton does not need access to the enclosing class's private members.
