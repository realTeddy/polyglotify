---
title: "Control Flow"
language: "kotlin"
feature: "control-flow"
category: "basics"
applicable: true
---

Kotlin's control-flow constructs include `if`, `when`, `for`, `while`, and `do-while`. `if` and `when` are expressions that return values. `when` replaces `switch` and is more powerful — it matches against arbitrary expressions, type checks, and ranges. `for` iterates over anything that provides an iterator.

## Example

```kotlin
fun classify(n: Int): String = when {
    n < 0  -> "negative"
    n == 0 -> "zero"
    n < 10 -> "small"
    else   -> "large"
}

fun main() {
    // if as expression
    val max = if (5 > 3) 5 else 3
    println(max)

    // when with argument
    val result = when (val x = 42) {
        in 1..9   -> "single digit"
        in 10..99 -> "double digit: $x"
        else      -> "large"
    }
    println(result)

    // for loop with range and step
    for (i in 1..5 step 2) {
        print("$i ")
    }
    println()

    // Iterate with index
    for ((idx, v) in listOf("a", "b", "c").withIndex()) {
        println("$idx: $v")
    }
}
```

## Gotchas

- `when` without an argument acts like an `if-else if` chain; `when` with an argument matches against the value.
- There is no `for(;;)` style loop; use `while` or `repeat(n) { }` for index-based iteration when ranges don't fit.
- `break` and `continue` in Kotlin can use labels (`break@label`) to exit or continue outer loops — unlike Java, there is no `goto`.
