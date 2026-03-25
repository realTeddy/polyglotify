---
title: "Function Declaration"
language: "cpp"
feature: "declaration"
category: "functions"
applicable: true
---

C++ functions can be free functions, member functions, lambdas, or function objects. A function declaration (prototype) tells the compiler the signature; the definition provides the body. `inline` suggests inlining (often redundant with modern compilers). `constexpr` and `consteval` (C++20) allow evaluation at compile time. Function overloading, default arguments, and templates provide flexible call signatures.

## Example

```cpp
#include <cmath>
#include <string>
#include <iostream>

// Free function declaration (prototype)
double distance(double x1, double y1, double x2, double y2);

// Template function
template<typename T>
T max_of(T a, T b) { return a > b ? a : b; }

// constexpr — computable at compile time
constexpr int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

// Default arguments
std::string greet(const std::string& name, const std::string& prefix = "Hello") {
    return prefix + ", " + name + "!";
}

// Overloaded functions
int    add(int a, int b)       { return a + b; }
double add(double a, double b) { return a + b; }

// Lambda
auto square = [](int x) { return x * x; };

// Function with noexcept guarantee
int safe_divide(int a, int b) noexcept(false) {
    if (b == 0) throw std::runtime_error("division by zero");
    return a / b;
}

// Definition of the earlier declaration
double distance(double x1, double y1, double x2, double y2) {
    return std::sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
}

int main() {
    constexpr int f5 = factorial(5);  // computed at compile time: 120
    std::cout << greet("Alice") << "\n";          // Hello, Alice!
    std::cout << max_of(3.14, 2.72) << "\n";      // 3.14
    std::cout << distance(0, 0, 3, 4) << "\n";    // 5
    return 0;
}
```

## Gotchas

- In C++, a function must be declared before it is used (unless the compiler sees the definition first). Headers exist specifically to provide forward declarations for use across translation units.
- `inline` in C++ means "multiple identical definitions are permitted across translation units" — not necessarily that the function will be inlined by the optimizer.
