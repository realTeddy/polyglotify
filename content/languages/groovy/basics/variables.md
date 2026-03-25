---
title: "Variables & Declaration"
language: "groovy"
feature: "variables"
category: "basics"
applicable: true
---

Groovy supports both dynamic and static variable declarations. Using `def` declares a variable with dynamic typing, letting the runtime infer the type. You can also use explicit Java types for static typing. Variables declared without `def` or a type are implicitly bound to the current scope (or become global in scripts).

## Example

```groovy
def name = "Alice"         // dynamic — type inferred as String
int age = 30               // static Java type
def pi = 3.14159           // BigDecimal by default for decimals
String greeting = "Hello"  // explicit String

// Multiple assignment via list destructuring
def (first, last) = ["Ada", "Lovelace"]

println "$greeting, $first $last! Age: $age"
```

## Gotchas

- Variables declared without `def` in a Groovy script are bound to the script binding, not the local scope, making them accessible as global-style variables.
- Decimal literals in Groovy default to `BigDecimal`, not `double`; use `3.14f` or `3.14d` for `float`/`double` explicitly.
- In `@CompileStatic` classes, `def` is still allowed but type inference is stricter and some dynamic features are disabled.
