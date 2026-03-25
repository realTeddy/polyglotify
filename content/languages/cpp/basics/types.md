---
title: "Types"
language: "cpp"
feature: "types"
category: "basics"
applicable: true
---

C++ has a rich type system including fundamental types (`int`, `double`, `bool`, `char`), compound types (arrays, pointers, references), user-defined types (classes, structs, enums, unions), and standard library types. `std::string`, `std::vector`, and `std::optional` (C++17) are the workhorse types. C++20 adds `std::span` for non-owning views and `std::expected` for error-or-value returns.

## Example

```cpp
#include <string>
#include <optional>
#include <variant>
#include <cstdint>

int main() {
    // Fundamental types
    int32_t i = 42;       // fixed-width (prefer over plain int for portability)
    int64_t big = 9'223'372'036L;  // digit separators (C++14)
    double d = 3.14;
    float f = 3.14f;
    bool flag = true;
    char c = 'A';

    // std::string — dynamic, owning string
    std::string greeting = "Hello, C++!";
    std::string_view view = greeting;  // non-owning reference (C++17)

    // Enum class — scoped, type-safe
    enum class Direction { North, South, East, West };
    Direction dir = Direction::North;

    // std::optional — value or nothing (C++17)
    std::optional<int> maybe = 42;
    std::optional<int> nothing;
    int value = maybe.value_or(0);  // 42

    // std::variant — type-safe union (C++17)
    std::variant<int, double, std::string> v = "hello";
    // Access with std::get<> or std::visit

    // Structured binding (C++17)
    auto [x, y] = std::pair{3, 4};

    return 0;
}
```

## Gotchas

- Plain `int` size is platform-dependent (typically 32-bit); use `<cstdint>` types (`int32_t`, `uint64_t`) for code that relies on specific widths.
- `std::string_view` does not own the string — it becomes a dangling reference if the underlying `string` is destroyed or reallocated. Never return a `string_view` to a local `string`.
