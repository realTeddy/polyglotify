---
title: "Parameters"
language: "cpp"
feature: "parameters"
category: "functions"
applicable: true
---

C++ parameter passing is explicit: pass by value (copy), by lvalue reference (`T&`, alias to caller's variable), by const reference (`const T&`, read-only alias), or by rvalue reference (`T&&`, for move semantics). The idiomatic guidelines: pass small trivial types by value, large objects by `const T&` for read-only or `T&` for mutation, and `T&&` for "sink" parameters that take ownership. Default arguments must be in declarations from the right.

## Example

```cpp
#include <string>
#include <vector>
#include <iostream>

// Pass by value — cheap copy for small types
int square(int n) { return n * n; }

// Pass by const reference — read-only, no copy
double magnitude(const std::vector<double>& v) {
    double sum = 0;
    for (double x : v) sum += x * x;
    return std::sqrt(sum);
}

// Pass by reference — modify caller's variable
void normalize(std::vector<double>& v) {
    double mag = magnitude(v);
    for (auto& x : v) x /= mag;
}

// Sink parameter — take ownership via move
void append(std::string& dest, std::string src) {  // src is a copy
    dest += std::move(src);  // move src into dest (zero-copy)
}

// Default arguments
std::string format(int value, int base = 10, int width = 0);

// Variadic template (type-safe variadic)
template<typename... Args>
void print_all(Args&&... args) {
    (std::cout << ... << args) << "\n";  // fold expression (C++17)
}

int main() {
    int x = 5;
    std::cout << square(x) << "\n";  // x is unchanged (pass by value)

    std::vector<double> v = {3.0, 4.0};
    std::cout << magnitude(v) << "\n";  // 5.0

    print_all("Value: ", 42, ", done");
    return 0;
}
```

## Gotchas

- Forgetting `const` on reference parameters allows the function to accidentally modify the caller's data and prevents passing temporary objects (rvalues).
- Default arguments in the definition (not the declaration) are not visible to callers in other translation units — always put them in the header/declaration.
