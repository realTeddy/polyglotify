---
title: "Inheritance"
language: "go"
feature: "inheritance"
category: "oop"
applicable: false
---

Go deliberately has no inheritance. Instead, it uses struct embedding (composition) to reuse and promote fields and methods from an embedded type. This avoids the fragile base-class problem and encourages a "has-a" design over "is-a". Polymorphism is achieved entirely through interfaces.

## Example

```go
package main

import "fmt"

type Animal struct {
    Name string
}

func (a Animal) Speak() string {
    return a.Name + " makes a sound"
}

type Dog struct {
    Animal        // embedded — promotes Name and Speak
    Breed string
}

func (d Dog) Speak() string { // overrides the promoted method
    return d.Name + " barks"
}

func main() {
    d := Dog{Animal: Animal{Name: "Rex"}, Breed: "Labrador"}
    fmt.Println(d.Speak())  // Rex barks
    fmt.Println(d.Name)     // promoted field
}
```

## Gotchas

- Embedding is not inheritance; a `Dog` is not an `Animal` at the type level and cannot be passed where an `Animal` is expected.
- If multiple embedded types define the same method, calling that method on the outer struct is a compile error due to ambiguity.
- Method promotion through embedding can make large struct types hard to understand; document promoted methods explicitly.
