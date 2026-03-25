---
title: "Common Patterns"
language: "cpp"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Idiomatic modern C++ revolves around RAII (Resource Acquisition Is Initialization), smart pointers (`unique_ptr`, `shared_ptr`), move semantics, algorithms from `<algorithm>`, and range-based operations. Avoid raw `new`/`delete`; avoid raw owning pointers. Prefer value semantics. Use `std::optional`, `std::variant`, and `std::expected` for expressing absence and errors. The Ranges library (C++20) enables composable, lazy pipelines.

## Example

```cpp
#include <memory>
#include <vector>
#include <algorithm>
#include <ranges>
#include <string>
#include <variant>
#include <iostream>

// 1. RAII — resource tied to object lifetime
class FileLogger {
public:
    explicit FileLogger(const std::string& path)
        : file_(path) {}  // opens file
    ~FileLogger() = default;  // file_ closes automatically

    void log(const std::string& msg) { file_ << msg << "\n"; }

private:
    std::ofstream file_;
};

// 2. Smart pointers — no manual delete
auto animal = std::make_unique<Dog>("Rex");
auto shared = std::make_shared<Config>();
std::weak_ptr<Config> observer = shared;  // non-owning

// 3. Move semantics — transfer ownership
std::vector<int> data = {1, 2, 3, 4, 5};
auto moved = std::move(data);  // data is now empty, no copy

// 4. std::variant — type-safe discriminated union
using JsonValue = std::variant<int, double, std::string, bool, std::nullptr_t>;
JsonValue val = std::string("hello");
std::visit([](auto&& v) { std::cout << v << "\n"; }, val);

// 5. C++20 Ranges — composable, lazy
std::vector<int> nums = {5, 3, 1, 4, 2, 6};
auto result = nums
    | std::views::filter([](int n) { return n % 2 == 0; })
    | std::views::transform([](int n) { return n * n; })
    | std::ranges::to<std::vector>();
// result = {16, 4, 36}

// 6. CRTP — compile-time polymorphism (no vtable)
template<typename Derived>
class Printable {
public:
    void print() const {
        static_cast<const Derived*>(this)->do_print();
    }
};
```

## Gotchas

- `std::move` does not move — it casts to an rvalue reference. Actual moving occurs in the move constructor or move assignment. After moving, the source object is in a valid but unspecified state.
- `std::ranges::to<std::vector>()` is C++23; for C++20 use `| std::ranges::views::common` followed by the vector range constructor.
