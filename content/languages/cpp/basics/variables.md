---
title: "Variables"
language: "cpp"
feature: "variables"
category: "basics"
applicable: true
---

C++ variables are statically typed with manual memory management unless using smart pointers. `auto` (C++11) infers the type from the initializer. `const` creates a compile-time-immutable value; `constexpr` additionally requires the value to be known at compile time. Variables have value semantics by default — assignment copies. References (`T&`) and pointers (`T*`) alias existing objects.

## Example

```cpp
#include <string>
#include <vector>

int main() {
    // Explicit types
    int age = 30;
    double pi = 3.14159;
    bool active = true;
    std::string name = "Alice";

    // auto — type deduced from initializer
    auto count = 42;              // int
    auto rate = 3.14;             // double
    auto items = std::vector<int>{1, 2, 3};

    // const and constexpr
    const int max = 100;           // runtime immutable
    constexpr int bufSize = 256;   // compile-time constant

    // References — alias for existing variable
    int x = 10;
    int& ref = x;
    ref = 20;  // modifies x
    // x is now 20

    // Raw pointer (prefer smart pointers in modern C++)
    int* ptr = &x;
    *ptr = 30;  // x is now 30

    // Structured bindings (C++17)
    auto [a, b] = std::pair{1, 2};

    return 0;
}
```

## Gotchas

- Uninitialized variables contain garbage values — unlike Java or C# which zero-initialize fields. Always initialize variables at their declaration.
- `auto` deduces the type but strips top-level `const` and references; use `const auto&` when you need a const reference and `auto&` for a mutable reference.
