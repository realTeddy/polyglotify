---
title: "Interfaces & Traits"
language: "kotlin"
feature: "interfaces"
category: "oop"
applicable: true
---

Kotlin interfaces can have abstract methods, default implementations, and abstract properties — but they cannot hold state (no backing fields). A class can implement multiple interfaces. Interface delegation (`by`) allows a class to delegate all interface implementations to another object, enabling composition over inheritance cleanly.

## Example

```kotlin
interface Printable {
    fun print()
}

interface Serializable {
    fun serialize(): String
    fun deserialize(data: String) = println("Deserializing: $data")  // default impl
}

data class Document(val title: String, val content: String) : Printable, Serializable {
    override fun print() = println("[$title]: $content")
    override fun serialize() = "$title|$content"
}

// Interface delegation
interface Logger { fun log(msg: String) }

class ConsoleLogger : Logger {
    override fun log(msg: String) = println("[LOG] $msg")
}

class Service(logger: Logger) : Logger by logger {
    fun doWork() { log("Working...") }
}

fun main() {
    val doc = Document("Report", "Q4 results")
    doc.print()
    println(doc.serialize())

    val service = Service(ConsoleLogger())
    service.doWork()
}
```

## Gotchas

- Interface properties are abstract by default and have no backing field; implementing them requires overriding them in the class (either as a constructor `val` or with a custom getter).
- When a class implements two interfaces with the same default method, the compiler requires an explicit override to resolve the ambiguity.
- The `by` delegation clause generates delegation methods at compile time — it is syntactic sugar over maintaining a reference and forwarding calls manually.
