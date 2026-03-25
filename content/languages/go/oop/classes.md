---
title: "Classes"
language: "go"
feature: "classes"
category: "oop"
applicable: false
---

Go has no `class` keyword. The equivalent pattern is a struct type combined with methods that have that type as their receiver. Constructors are conventionally implemented as `New` functions that return an initialized pointer to the struct. This approach achieves encapsulation through unexported fields without the overhead of a class hierarchy.

## Example

```go
package main

import "fmt"

type Person struct {
    name string // unexported — private to package
    age  int
}

func NewPerson(name string, age int) *Person {
    return &Person{name: name, age: age}
}

func (p *Person) Name() string { return p.name }
func (p *Person) Age() int     { return p.age }

func (p *Person) String() string {
    return fmt.Sprintf("%s (%d)", p.name, p.age)
}

func main() {
    p := NewPerson("Alice", 30)
    fmt.Println(p)
}
```

## Gotchas

- There is no `this` or `self` keyword; the receiver name is chosen by convention (usually the first letter of the type name, e.g., `p` for `Person`).
- Go has no access modifiers beyond exported (uppercase) vs. unexported (lowercase); there is no `protected` or `private` at the field level for subtypes.
