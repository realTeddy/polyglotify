---
title: "Tuples"
language: "cpp"
feature: "tuples"
category: "data-structures"
applicable: true
---

C++ provides `std::tuple<T1, T2, ...>` for heterogeneous fixed-size collections and `std::pair<T1, T2>` for two-element pairs. Elements are accessed via `std::get<N>()` or structured bindings (C++17). `std::make_tuple` and `std::tie` are utility helpers. For named fields, a simple struct is often clearer than a tuple. C++23 adds `std::tuple` index deduction improvements.

## Example

```cpp
#include <tuple>
#include <string>
#include <iostream>

// Function returning multiple values via tuple
std::tuple<int, int, int> rgb_from_hex(uint32_t hex) {
    return {
        (hex >> 16) & 0xFF,
        (hex >>  8) & 0xFF,
        (hex >>  0) & 0xFF
    };
}

// std::pair
std::pair<bool, int> find_first(const std::vector<int>& v, int target) {
    for (int i = 0; i < (int)v.size(); i++)
        if (v[i] == target) return {true, i};
    return {false, -1};
}

int main() {
    // std::tuple
    auto person = std::make_tuple(std::string("Alice"), 30, 1.72);

    // Access by index
    std::cout << std::get<0>(person) << "\n";  // Alice

    // Structured binding (C++17) — preferred
    auto [name, age, height] = person;
    std::cout << name << " is " << age << "\n";  // Alice is 30

    // std::tie — unpack into existing variables
    std::string n; int a; double h;
    std::tie(n, a, h) = person;

    // RGB example
    auto [r, g, b] = rgb_from_hex(0xFF8000);
    std::cout << r << " " << g << " " << b << "\n";  // 255 128 0

    // Tuple comparison (lexicographic)
    auto t1 = std::make_tuple(1, 2, 3);
    auto t2 = std::make_tuple(1, 2, 4);
    std::cout << (t1 < t2) << "\n";  // 1

    // std::pair
    auto [found, idx] = find_first({3, 1, 4}, 4);
    std::cout << found << " at " << idx << "\n";  // 1 at 2

    return 0;
}
```

## Gotchas

- Accessing `std::get<N>()` with an out-of-range index is a compile error (index must be a compile-time constant), not a runtime error. This is a feature, not a bug.
- For named fields, prefer a simple `struct` over `std::tuple` — `person.name` is far clearer than `std::get<0>(person)`.
