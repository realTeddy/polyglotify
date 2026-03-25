---
title: "Style Conventions"
language: "scala"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Scala style follows the **Scala Style Guide** and is enforced by **Scalafmt** (formatting) and **Scalafix** (linting/rewrites). Key conventions: `camelCase` for methods/variables, `PascalCase` for types, two-space indentation, prefer immutability (`val`), and favor expression-oriented code.

## Example

```scala
// Naming
val maxRetries: Int      = 3          // val for constants
def findUser(id: Long): Option[User]  // camelCase methods
class UserRepository                   // PascalCase types
object Config                          // PascalCase singletons

// Prefer expression style over statement style
// Good
val result = if condition then "yes" else "no"

// Avoid
var result = ""
if (condition) result = "yes" else result = "no"

// Formatting: Scalafmt enforced
case class User(
  name:  String,
  email: String,
  age:   Int,
)

// Prefer for-comprehension over nested flatMap
val combined = for
  user  <- findUser(id)
  order <- findOrder(user.id)
yield (user, order)

// Doc comments
/** Returns the user with the given [[id]], or [[None]] if absent. */
def findById(id: Long): Option[User] = ???
```

## Gotchas

- Scalafmt is non-configurable in opinionated mode; add a `.scalafmt.conf` at the project root with `version` specified
- The `@` symbol denotes annotations in Scala; `@deprecated`, `@tailrec`, `@main` are commonly used
- Avoid mutable `var` outside performance-critical code — reviewers will question it
