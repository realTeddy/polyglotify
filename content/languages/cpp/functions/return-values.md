---
title: "Return Values"
language: "cpp"
feature: "return-values"
category: "functions"
applicable: true
---

C++ functions return a single value by type. Return Value Optimization (RVO/NRVO) eliminates the copy when returning local objects — rely on it rather than returning by pointer or reference. `std::optional<T>` signals a possibly-absent value. `std::expected<T, E>` (C++23) returns a value or an error. Multiple values are returned via `std::pair`, `std::tuple`, or a struct, destructured with structured bindings.

## Example

```cpp
#include <optional>
#include <expected>
#include <tuple>
#include <string>
#include <vector>
#include <stdexcept>

// Return by value — RVO applies, no copy
std::vector<int> make_range(int n) {
    std::vector<int> result;
    result.reserve(n);
    for (int i = 0; i < n; i++) result.push_back(i);
    return result;  // NRVO: no copy
}

// std::optional — value or nothing
std::optional<int> find_first(const std::vector<int>& v, int target) {
    for (int i = 0; i < (int)v.size(); i++)
        if (v[i] == target) return i;
    return std::nullopt;
}

// Tuple / structured binding for multiple returns
std::tuple<int, int> divmod(int a, int b) {
    return {a / b, a % b};
}

// std::expected — value or error (C++23)
std::expected<double, std::string> safe_sqrt(double x) {
    if (x < 0) return std::unexpected("Cannot take sqrt of negative");
    return std::sqrt(x);
}

int main() {
    auto nums = make_range(5);  // {0,1,2,3,4}, no copy

    auto idx = find_first(nums, 3);
    if (idx) std::cout << "Found at " << *idx << "\n";  // 3

    auto [q, r] = divmod(17, 5);  // structured binding
    std::cout << q << " remainder " << r << "\n";  // 3 remainder 2

    auto result = safe_sqrt(25.0);
    if (result) std::cout << *result << "\n";  // 5.0

    return 0;
}
```

## Gotchas

- Never return a reference or pointer to a local variable — the local is destroyed when the function returns, leaving a dangling reference.
- RVO is guaranteed by the C++17 standard for prvalues (copy elision). For named return values (NRVO), it is still a permitted optimization but not guaranteed; add a move constructor to your types to make the fallback cheap.
