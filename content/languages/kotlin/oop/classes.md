---
title: "Classes"
language: "kotlin"
feature: "classes"
category: "oop"
applicable: true
---

Kotlin classes are concise — the primary constructor is inline in the class header. Properties declared with `val`/`var` in the constructor are automatically fields with getters (and setters for `var`). Classes are `final` by default and must be marked `open` to allow subclassing. Kotlin has no `static`; use companion objects instead.

## Example

```kotlin
class Person(val name: String, var age: Int) {
    val isAdult: Boolean get() = age >= 18

    fun greet(): String = "Hi, I'm $name, age $age"

    override fun toString() = "Person(name=$name, age=$age)"
}

class Counter(initial: Int = 0) {
    var count = initial
        private set  // setter is private

    fun increment() { count++ }
    fun reset() { count = 0 }

    companion object {
        fun create() = Counter(0)
    }
}

fun main() {
    val p = Person("Alice", 30)
    println(p.greet())
    println(p.isAdult)

    val c = Counter.create()
    c.increment()
    c.increment()
    println(c.count)  // 2
}
```

## Gotchas

- Classes are `final` by default; forgetting `open` causes an "error: this type is final" compile error when trying to subclass.
- Primary constructor parameters with `val`/`var` become properties; without the keyword they are just constructor arguments and do not generate fields.
- Kotlin has no `static`; top-level functions and companion objects fill this role, with companion objects also able to implement interfaces.
