---
title: "Generics"
language: "dlang"
feature: "generics"
category: "oop"
applicable: true
---

D's generics are called **templates**. Templates work for functions, structs, classes, and interfaces, and are instantiated at compile time. Template parameters can be types, values, or aliases. D templates are far more powerful than most generics systems: they support variadic template parameters, CTFE, string mixins, and static introspection.

## Example

```d
import std.stdio;

// Generic function
T max(T)(T a, T b) { return a > b ? a : b; }

// Generic struct
struct Stack(T)
{
    private T[] data;

    void push(T item) { data ~= item; }

    T pop()
    {
        assert(data.length > 0, "Stack underflow");
        T top = data[$-1];
        data.length--;
        return top;
    }

    @property bool empty() const { return data.length == 0; }
    @property size_t length() const { return data.length; }
}

// Template constraint (like a bound)
T sum(T)(T[] arr) if (__traits(isArithmetic, T))
{
    T total = 0;
    foreach (x; arr) total += x;
    return total;
}

// Variadic template
void printAll(T...)(T args)
{
    foreach (a; args) write(a, " ");
    writeln();
}

void main()
{
    writeln(max(3, 7));
    writeln(max(3.14, 2.71));
    writeln(max("apple", "banana"));

    Stack!int s;
    s.push(1); s.push(2); s.push(3);
    writeln(s.pop());   // 3
    writeln(s.length);  // 2

    writeln(sum([1, 2, 3, 4, 5]));
    writeln(sum([1.1, 2.2, 3.3]));

    printAll(1, "hello", 3.14, true);
}
```

## Gotchas

- Template instantiation happens at compile time; each distinct set of type arguments produces a separate specialisation.
- Template constraints using `if (...)` give better error messages than unconstrained templates, which produce long error cascades.
- `__traits` is a compile-time introspection mechanism; it is not runtime reflection.
- Eponymous templates (a template whose name matches the one inner declaration) are the idiomatic way to write generic types.
