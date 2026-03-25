---
title: "Operators"
language: "cpp"
feature: "operators"
category: "basics"
applicable: true
---

C++ supports all C operators plus operator overloading for user-defined types. Almost every operator can be overloaded (`+`, `-`, `*`, `/`, `==`, `<`, `[]`, `()`, `->`, etc.). The spaceship operator `<=>` (C++20) provides three-way comparison and generates all six comparison operators automatically. Prefer the idiomatic C++20 approach: define `operator<=>` and `operator==`, and the rest are synthesized.

## Example

```cpp
#include <compare>
#include <string>
#include <iostream>

struct Rational {
    int num, den;

    Rational(int n, int d) : num(n), den(d) {}

    // Arithmetic operator
    Rational operator+(const Rational& o) const {
        return {num * o.den + o.num * den, den * o.den};
    }

    // Equality
    bool operator==(const Rational& o) const {
        return num * o.den == o.num * den;
    }

    // Three-way comparison (C++20) — generates <, <=, >, >= automatically
    auto operator<=>(const Rational& o) const {
        return (num * o.den) <=> (o.num * den);
    }
};

int main() {
    // Standard operators
    int a = 10, b = 3;
    std::cout << a / b << "\n";   // 3 (integer division)
    std::cout << a % b << "\n";   // 1

    // Bitwise
    int flags = 0b1010 | 0b0101;  // 0b1111
    bool set = (flags & 0b0010) != 0;

    // User-defined
    Rational r1{1, 2}, r2{1, 3};
    auto sum = r1 + r2;            // 5/6
    std::cout << (r1 == r2) << "\n";  // 0
    std::cout << (r1 > r2) << "\n";   // 1 (auto-generated from <=>)

    return 0;
}
```

## Gotchas

- Integer overflow of signed types is undefined behavior in C++ — the compiler may optimize assuming it doesn't happen. Use unsigned types or explicit overflow-safe arithmetic when needed.
- Overloading `operator=` (assignment) requires handling self-assignment; if you define a custom destructor, copy constructor, or copy assignment, you likely need all three (Rule of Three / Five).
