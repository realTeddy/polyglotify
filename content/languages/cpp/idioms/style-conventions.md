---
title: "Style Conventions"
language: "cpp"
feature: "style-conventions"
category: "idioms"
applicable: true
---

C++ has no single universal style guide. Popular choices are the **C++ Core Guidelines** (Bjarne Stroustrup / Herb Sutter), **Google C++ Style Guide**, and **LLVM Coding Standards**. Common ground: use `clang-format` for automated formatting, `clang-tidy` for static analysis, `snake_case` for functions/variables (Core Guidelines) or `camelCase` (Google). `SCREAMING_SNAKE_CASE` is universal for macros. Avoid macros where `constexpr`, `inline`, and templates suffice.

## Example

```cpp
// Core Guidelines-inspired style
#include <string>
#include <vector>
#include <memory>

// snake_case functions and variables (Core Guidelines)
class BankAccount {
public:
    // Constructor with gsl::not_null or assertions for preconditions
    explicit BankAccount(std::string owner, double initial_balance = 0.0)
        : owner_{std::move(owner)}
        , balance_{initial_balance} {}

    // Const member functions for observers
    [[nodiscard]] double balance() const noexcept { return balance_; }
    [[nodiscard]] const std::string& owner() const noexcept { return owner_; }

    // Verbs for mutating operations
    void deposit(double amount);
    bool try_withdraw(double amount);

private:
    std::string owner_;    // trailing underscore for private members
    double balance_{0.0};  // brace-init, not =
};

// Free functions: snake_case
[[nodiscard]] std::vector<int> make_range(int start, int end);

// Constants: ALL_CAPS or kCamelCase (Google style)
constexpr int kMaxRetries = 3;
constexpr int MAX_BUFFER_SIZE = 4096;

// Prefer enum class over plain enum
enum class Status { Ok, Error, Pending };
```

## Gotchas

- `[[nodiscard]]` should be applied to functions whose return value must not be ignored (factory functions, error codes, resource handles). The compiler then warns when the caller discards the return value.
- Trailing `_` on private fields (Core Guidelines style) and leading `m_` (older style) are both common — pick one and apply it consistently throughout the project.
