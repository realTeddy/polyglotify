---
title: "Control Flow"
language: "java"
feature: "control-flow"
category: "basics"
applicable: true
---

Java supports `if/else`, traditional `switch` statements, enhanced `switch` expressions (Java 14+), `for`, enhanced `for-each`, `while`, `do-while`, `break`, and `continue`. The switch expression with arrow cases is the modern idiom, eliminating fall-through bugs and producing a value directly. Pattern matching in `switch` (Java 21) allows matching on type and shape.

## Example

```java
// if / else if / else
int score = 85;
String grade;
if (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
else grade = "C";

// Modern switch expression (Java 14+)
String day = "MONDAY";
int numLetters = switch (day) {
  case "MONDAY", "FRIDAY", "SUNDAY" -> 6;
  case "TUESDAY"                    -> 7;
  case "THURSDAY", "SATURDAY"       -> 8;
  case "WEDNESDAY"                  -> 9;
  default -> throw new IllegalArgumentException("Unknown: " + day);
};

// Enhanced for-each
int[] nums = {1, 2, 3, 4, 5};
int total = 0;
for (int n : nums) {
  total += n;
}

// Pattern matching switch (Java 21)
Object obj = 3.14;
String description = switch (obj) {
  case Integer i -> "int: " + i;
  case Double d  -> "double: " + d;
  case String s  -> "string: " + s;
  default        -> "other";
};

// while with labeled break
outer:
for (int i = 0; i < 5; i++) {
  for (int j = 0; j < 5; j++) {
    if (i + j == 6) break outer;
  }
}
```

## Gotchas

- Classic `switch` statements fall through from one case to the next unless `break` is used — a notorious source of bugs. Prefer switch expressions with `->` arrows which do not fall through.
- `for-each` works on arrays and `Iterable` implementations; it does not provide the index, so use a traditional `for` loop when you need the position.
