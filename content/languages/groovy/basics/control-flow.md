---
title: "Control Flow"
language: "groovy"
feature: "control-flow"
category: "basics"
applicable: true
---

Groovy supports all Java control-flow constructs plus enhanced versions. The `switch` statement accepts any type and supports `case` with ranges, lists, regex patterns, and class checks — making it far more expressive than Java's switch. Groovy also adds the `for-in` loop for iterating over any `Iterable`, and conditional expressions leverage Groovy truth (null, 0, empty string/collection are all falsy).

## Example

```groovy
// Enhanced switch
def classify = { score ->
    switch (score) {
        case 90..100: return "A"
        case 80..<90: return "B"
        case { it < 60 }: return "F"
        default: return "C/D"
    }
}
println classify(95)   // A
println classify(45)   // F

// for-in loop
for (lang in ["Groovy", "Kotlin", "Scala"]) {
    println lang
}

// Groovy truth in conditionals
def items = []
if (!items) println "empty list is falsy"

// while with destructuring-style
def stack = [1, 2, 3]
while (stack) {
    println stack.pop()
}
```

## Gotchas

- Groovy's `switch` falls through only if you omit `break`, just like Java, so always use `return` or `break` in closures-as-cases.
- Range literals like `1..10` are inclusive on both ends; use `1..<10` for an exclusive upper bound.
- Groovy truth means `0` and `""` are falsy; this can cause bugs when checking numeric or string variables expected to be valid non-null values.
