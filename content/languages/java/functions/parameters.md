---
title: "Parameters"
language: "java"
feature: "parameters"
category: "functions"
applicable: true
---

Java passes all arguments by value. For primitives, this means the method receives a copy of the value. For reference types, the method receives a copy of the reference — the method can mutate the object's state but cannot reassign the caller's variable to point to a different object. Java has no named parameters or default parameter values; overloading or the Builder pattern serves that role.

## Example

```java
import java.util.List;
import java.util.ArrayList;

public class ParameterDemo {

    // Primitive — pass by value (copy)
    static void increment(int n) {
        n++;  // no effect on caller's variable
    }

    // Reference — pass by value of the reference (mutation works)
    static void addItem(List<String> list, String item) {
        list.add(item);  // modifies the same list object
    }

    // Varargs — zero or more arguments of the same type
    static double average(double first, double... rest) {
        double sum = first;
        for (double v : rest) sum += v;
        return sum / (1 + rest.length);
    }

    // Simulating defaults via overloading
    static String greet(String name, String greeting) {
        return greeting + ", " + name + "!";
    }
    static String greet(String name) {
        return greet(name, "Hello");
    }

    public static void main(String[] args) {
        int x = 5;
        increment(x);
        System.out.println(x);       // still 5

        var names = new ArrayList<String>();
        addItem(names, "Alice");
        System.out.println(names);   // [Alice]

        System.out.println(average(1, 2, 3, 4)); // 2.5
        System.out.println(greet("Bob"));         // Hello, Bob!
    }
}
```

## Gotchas

- "Pass by reference" is a common misconception in Java. The reference itself is copied — reassigning the parameter inside the method (`list = new ArrayList<>()`) does not affect the caller's variable.
- Using `final` on a parameter prevents reassignment within the method body but does not prevent mutation of the referenced object.
