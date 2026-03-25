---
title: "Structs & Classes"
language: "cpp"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

In C++, `struct` and `class` are nearly identical — the only difference is the default access (public for struct, private for class). Convention: use `struct` for passive data with all-public members, `class` for objects with invariants, constructors, and encapsulated state. C++ classes support constructors, destructors, copy/move semantics, operator overloading, and templates. Aggregate initialization works on structs with no user-provided constructors.

## Example

```cpp
#include <string>
#include <iostream>
#include <utility>

// Struct — data aggregate (C++20 designated initializers)
struct Point {
    double x = 0.0;
    double y = 0.0;

    double distance_to(const Point& o) const {
        return std::sqrt((x-o.x)*(x-o.x) + (y-o.y)*(y-o.y));
    }

    // Spaceship operator — auto-generates all comparisons (C++20)
    auto operator<=>(const Point&) const = default;
    bool operator==(const Point&) const = default;
};

// Class — encapsulated state with invariants
class BankAccount {
public:
    BankAccount(std::string owner, double balance = 0.0)
        : owner_(std::move(owner)), balance_(balance) {
        if (balance < 0) throw std::invalid_argument("Negative balance");
    }

    void deposit(double amount) { balance_ += amount; }
    bool withdraw(double amount) {
        if (amount > balance_) return false;
        balance_ -= amount;
        return true;
    }

    double balance() const { return balance_; }
    const std::string& owner() const { return owner_; }

private:
    std::string owner_;
    double balance_;
};

int main() {
    // Aggregate init / designated init (C++20)
    Point p1{.x = 3, .y = 0};
    Point p2{.x = 0, .y = 4};
    std::cout << p1.distance_to(p2) << "\n";  // 5

    BankAccount acct("Alice", 1000.0);
    acct.deposit(500.0);
    acct.withdraw(200.0);
    std::cout << acct.balance() << "\n";  // 1300

    return 0;
}
```

## Gotchas

- If you define any constructor, the compiler no longer generates the default constructor automatically. Define all the special members you need, or use `= default`.
- The Rule of Five: if you define a custom destructor, copy constructor, copy assignment, move constructor, or move assignment, you should define all five to ensure correct resource management.
