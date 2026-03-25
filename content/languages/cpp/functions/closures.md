---
title: "Closures"
language: "cpp"
feature: "closures"
category: "functions"
applicable: true
---

C++ closures are created with lambda expressions (C++11). The capture list specifies which variables from the enclosing scope the lambda can access: `[=]` captures all by value, `[&]` captures all by reference, or list individual variables (`[x, &y]`). C++14 allows generic lambdas (`auto` parameters) and init captures. C++20 allows lambdas in unevaluated contexts and `[=, this]` explicit captures.

## Example

```cpp
#include <functional>
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    // Capture by value — lambda owns a copy
    int factor = 3;
    auto multiply = [factor](int x) { return x * factor; };
    factor = 99;  // does not affect the lambda's captured copy
    std::cout << multiply(5) << "\n";  // 15

    // Capture by reference — lambda sees live value
    int count = 0;
    auto increment = [&count]() { ++count; };
    increment(); increment(); increment();
    std::cout << count << "\n";  // 3

    // Init capture (C++14) — move into lambda
    auto data = std::vector<int>{1, 2, 3, 4, 5};
    auto process = [d = std::move(data)]() {  // data moved into d
        for (int n : d) std::cout << n << " ";
        std::cout << "\n";
    };
    process();  // 1 2 3 4 5

    // Generic lambda (C++14)
    auto add = [](auto a, auto b) { return a + b; };
    std::cout << add(1, 2) << "\n";   // 3
    std::cout << add(1.5, 2.5) << "\n"; // 4.0

    // std::function — type-erased callable
    std::function<int(int)> doubler = [](int x) { return x * 2; };

    // Lambda in STL algorithms
    std::vector<int> nums = {5, 3, 1, 4, 2};
    std::sort(nums.begin(), nums.end(), [](int a, int b) { return a < b; });

    return 0;
}
```

## Gotchas

- Capturing by reference (`[&]`) is dangerous when the lambda outlives the captured variables. Store lambdas in `std::function` or return them only when captured references remain valid.
- `[=]` in C++17 and earlier implicitly captures `this` when used in a member function, which can lead to dangling pointer bugs if the object is destroyed before the lambda runs. Use `[=, this]` (C++20) or `[self = *this]` to be explicit.
