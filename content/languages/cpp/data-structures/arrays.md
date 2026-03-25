---
title: "Arrays"
language: "cpp"
feature: "arrays"
category: "data-structures"
applicable: true
---

C++ provides C-style arrays (avoid in new code), `std::array<T, N>` (fixed-size, stack-allocated), and `std::vector<T>` (dynamic, heap-allocated). `std::span<T>` (C++20) is a non-owning view over contiguous data. Prefer `std::vector` for most use cases, `std::array` when the size is fixed at compile time, and `std::span` for functions that accept any contiguous sequence.

## Example

```cpp
#include <array>
#include <vector>
#include <span>
#include <algorithm>
#include <numeric>
#include <iostream>

// std::array — fixed-size, stack-allocated
constexpr std::array<int, 5> fibonacci = {1, 1, 2, 3, 5};

// std::vector — dynamic, heap-allocated
std::vector<int> make_squares(int n) {
    std::vector<int> v;
    v.reserve(n);  // pre-allocate
    for (int i = 1; i <= n; i++) v.push_back(i * i);
    return v;
}

// std::span — non-owning view (C++20)
double average(std::span<const int> nums) {
    if (nums.empty()) return 0.0;
    return static_cast<double>(std::reduce(nums.begin(), nums.end())) / nums.size();
}

int main() {
    // std::array
    auto arr = fibonacci;
    std::cout << arr[2] << "\n";  // 2
    std::cout << arr.size() << "\n";  // 5

    // std::vector
    auto squares = make_squares(5);  // {1, 4, 9, 16, 25}

    // STL algorithms
    std::sort(squares.begin(), squares.end(), std::greater<>{}); // {25,16,9,4,1}
    auto it = std::find(squares.begin(), squares.end(), 9);
    std::cout << std::distance(squares.begin(), it) << "\n";  // 2

    // span works with array, vector, C-array
    std::cout << average(squares) << "\n";  // 11
    std::cout << average(arr) << "\n";       // works with std::array too

    // 2D vector
    std::vector<std::vector<int>> matrix(3, std::vector<int>(3, 0));
    matrix[1][1] = 5;

    return 0;
}
```

## Gotchas

- `std::vector` iterators and references are invalidated when the vector reallocates (e.g., after `push_back` exceeds capacity). Don't hold iterators across mutations.
- Passing a `std::vector` by value copies all elements. Pass by `const std::vector<T>&` for read-only access, or use `std::span<const T>` for a more general interface.
