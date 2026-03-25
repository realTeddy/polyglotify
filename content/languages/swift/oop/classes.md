---
title: "Classes"
language: "swift"
feature: "classes"
category: "oop"
applicable: true
---

Swift classes are reference types that support single inheritance, designated and convenience initializers, `deinit`, and reference-counting memory management (ARC). Classes can be marked `final` to prevent subclassing. Unlike structs, class instances are shared across assignments.

## Example

```swift
class Animal {
    let name: String
    private var sound: String

    init(name: String, sound: String) {
        self.name = name
        self.sound = sound
    }

    func speak() -> String {
        "\(name) says \(sound)"
    }
}

class Dog: Animal {
    var breed: String

    init(name: String, breed: String) {
        self.breed = breed
        super.init(name: name, sound: "woof")
    }

    override func speak() -> String {
        "\(super.speak()) (tail wagging)"
    }
}

let dog = Dog(name: "Rex", breed: "Labrador")
print(dog.speak())
print(dog is Animal)  // true
```

## Gotchas

- All designated initializers must initialize every stored property before calling `super.init`; Swift enforces a strict two-phase initialization.
- ARC (Automatic Reference Counting) manages memory, but strong reference cycles between class instances cause memory leaks; break them with `weak` or `unowned` references.
- `final class` prevents subclassing and enables the compiler to devirtualize method calls, improving performance.
