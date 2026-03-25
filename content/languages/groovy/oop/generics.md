---
title: "Generics"
language: "groovy"
feature: "generics"
category: "oop"
applicable: true
---

Groovy fully supports Java generics at the syntax level and in statically compiled code. In dynamic mode, generic type parameters are erased at runtime (as in Java), so Groovy does not enforce them at runtime. With `@TypeChecked` or `@CompileStatic`, the compiler does verify generic type usage. Groovy also supports wildcard bounds and the same covariance/contravariance rules as Java.

## Example

```groovy
import groovy.transform.TypeChecked

// Generic class
class Box<T> {
    T value

    Box(T value) { this.value = value }

    T get() { value }

    def <R> Box<R> map(Closure<R> transform) {
        new Box<R>(transform(value))
    }
}

def intBox = new Box<Integer>(42)
def strBox = intBox.map { it.toString() + "!" }
println strBox.get()   // 42!

// Generic method with type checking
@TypeChecked
class Utils {
    static <T extends Comparable<T>> T max(List<T> items) {
        items.max()
    }
}

println Utils.max([3, 1, 4, 1, 5, 9])   // 9
println Utils.max(["banana", "apple", "cherry"])   // cherry

// Bounded type parameters
class NumberBox<T extends Number> {
    T value
    NumberBox(T v) { this.value = v }
    double doubled() { value.doubleValue() * 2 }
}
println new NumberBox<Integer>(7).doubled()   // 14.0
```

## Gotchas

- In dynamic Groovy (no `@TypeChecked`), generic types are completely erased; you can add a `String` to a `List<Integer>` at runtime without any error.
- Groovy's type inference for generics is less powerful than Kotlin's; explicit type parameters are sometimes required to help the compiler.
- Generic type bounds like `<T extends Comparable<T>>` work at compile time under `@TypeChecked` but are ignored at runtime in dynamic mode.
