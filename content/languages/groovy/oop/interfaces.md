---
title: "Interfaces & Traits"
language: "groovy"
feature: "interfaces"
category: "oop"
applicable: true
---

Groovy supports Java interfaces and adds **traits** — a more powerful alternative that allows concrete method implementations, field declarations, and multiple composition. Traits are the idiomatic Groovy solution for sharing behaviour across unrelated class hierarchies. A single-method interface can also be satisfied by a Groovy closure using the `as` coercion operator.

## Example

```groovy
// Traditional interface
interface Printable {
    void print()
}

// Trait with concrete implementation
trait Serializable {
    String serialize() {
        def props = this.properties.findAll { k, v -> k != 'class' }
        props.collect { k, v -> "$k=$v" }.join(", ")
    }
}

trait Auditable {
    String createdBy = "system"
    String audit() { "Created by: $createdBy" }
}

// Class implementing interface and using traits
class Document implements Printable, Serializable, Auditable {
    String title
    String content

    Document(String title, String content) {
        this.title = title
        this.content = content
    }

    @Override
    void print() { println "[$title]: $content" }
}

def doc = new Document("Intro", "Hello Groovy")
doc.print()
println doc.serialize()
println doc.audit()

// Closure as functional interface
Runnable r = { println "Running!" } as Runnable
r.run()
```

## Gotchas

- Traits with fields store state on the implementing class; if two traits declare a field with the same name, there will be a conflict resolved by linearisation (right-most wins).
- Unlike Java default methods, trait methods can access `this` and declared trait fields, making them more like mixins.
- Traits cannot be used with `@CompileStatic` in all scenarios; some dynamic trait features are incompatible with static compilation.
