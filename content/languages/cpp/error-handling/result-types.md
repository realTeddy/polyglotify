---
title: "Result Types"
language: "cpp"
feature: "result-types"
category: "error-handling"
applicable: true
---

C++23 adds `std::expected<T, E>` as a standard result type — it holds either a value (`T`) or an unexpected error (`E`). Before C++23, `std::optional<T>` (value or nothing) and custom error types (or libraries like `outcome`) filled this role. `std::expected` supports monadic operations (`and_then`, `or_else`, `transform`) for chaining without exception overhead.

## Example

```cpp
#include <expected>
#include <optional>
#include <string>
#include <charconv>
#include <cmath>
#include <iostream>

// std::expected<T, E> — C++23
std::expected<int, std::string> parse_int(std::string_view s) {
    int value = 0;
    auto [ptr, ec] = std::from_chars(s.data(), s.data() + s.size(), value);
    if (ec != std::errc{})
        return std::unexpected("Not a valid integer: " + std::string(s));
    return value;
}

std::expected<double, std::string> safe_sqrt(double x) {
    if (x < 0) return std::unexpected("sqrt of negative: " + std::to_string(x));
    return std::sqrt(x);
}

// Chaining with monadic operations (C++23)
void demo_chaining() {
    auto result = parse_int("16")
        .and_then([](int n) { return safe_sqrt(static_cast<double>(n)); })
        .transform([](double d) { return d * 2.0; });

    if (result) {
        std::cout << "Result: " << *result << "\n";  // 8.0
    }

    auto bad = parse_int("abc");
    std::cout << bad.error() << "\n";  // Not a valid integer: abc
}

// std::optional — for "might not exist" (no error info)
std::optional<int> find_positive(const std::vector<int>& v) {
    for (int n : v) if (n > 0) return n;
    return std::nullopt;
}

int main() {
    demo_chaining();

    auto r1 = parse_int("42");
    auto r2 = parse_int("xyz");
    std::cout << (r1 ? std::to_string(*r1) : r1.error()) << "\n"; // 42
    std::cout << (r2 ? std::to_string(*r2) : r2.error()) << "\n"; // Not a valid...

    return 0;
}
```

## Gotchas

- Accessing `*expected` when it holds an error is undefined behavior. Always check with `if (result)` or use `value()` (which throws `std::bad_expected_access` if it's an error).
- `std::expected` is a C++23 feature. For C++17, use `std::optional` for nullable returns and a custom `Result` type or the `tl::expected` library for error-or-value semantics.
