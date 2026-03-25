---
title: "Control Flow"
language: "cpp"
feature: "control-flow"
category: "basics"
applicable: true
---

C++ control flow is identical to C: `if/else`, `switch`, `for`, range-`for` (C++11), `while`, `do/while`, `break`, `continue`, and `goto` (rarely used). C++17 adds `if constexpr` for compile-time branch selection in templates. C++17 also allows an init statement in `if` and `switch` (`if (auto x = f(); x > 0)`). `[[likely]]` and `[[unlikely]]` attributes (C++20) hint branch prediction.

## Example

```cpp
#include <vector>
#include <string>
#include <variant>
#include <iostream>

int main() {
    // Range-for (C++11)
    std::vector<int> nums = {1, 2, 3, 4, 5};
    int total = 0;
    for (const auto& n : nums) total += n;

    // if with initializer (C++17)
    if (auto pos = std::string("hello world").find("world"); pos != std::string::npos) {
        std::cout << "Found at " << pos << "\n";  // 6
    }

    // switch with enum class
    enum class Color { Red, Green, Blue };
    Color c = Color::Green;
    switch (c) {
        case Color::Red:   std::cout << "red\n";   break;
        case Color::Green: std::cout << "green\n"; break;
        case Color::Blue:  std::cout << "blue\n";  break;
    }

    // if constexpr — compile-time branch in templates
    auto describe = []<typename T>(T val) {
        if constexpr (std::is_integral_v<T>)
            return std::string("int: ") + std::to_string(val);
        else
            return std::string("other");
    };
    std::cout << describe(42) << "\n";  // int: 42

    // std::visit — pattern match over std::variant
    std::variant<int, std::string> v = "hello";
    std::visit([](auto&& arg) { std::cout << arg << "\n"; }, v);

    return 0;
}
```

## Gotchas

- `switch` on integers and enums still falls through between cases unless you `break` or `return`. Unscoped `enum` values pollute the enclosing namespace; prefer `enum class`.
- Range-`for` loops call `begin()` and `end()` once; modifying the container's size during iteration is undefined behavior.
