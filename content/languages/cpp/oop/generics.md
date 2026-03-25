---
title: "Generics"
language: "cpp"
feature: "generics"
category: "oop"
applicable: true
---

C++ uses **templates** rather than generics — a more powerful mechanism that generates specialized code at compile time (zero overhead at runtime). Class templates, function templates, variable templates, and alias templates all support type parameters. C++20 **concepts** constrain template parameters with named requirements, replacing the cryptic SFINAE technique with readable constraints. Template specialization allows custom behavior for specific types.

## Example

```cpp
#include <concepts>
#include <vector>
#include <stdexcept>
#include <iostream>

// Concept — named constraint (C++20)
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

// Constrained function template
template<Numeric T>
T clamp(T value, T low, T high) {
    return value < low ? low : (value > high ? high : value);
}

// Class template
template<typename T>
class Stack {
public:
    void push(T value) { items_.push_back(std::move(value)); }

    T pop() {
        if (empty()) throw std::underflow_error("Stack is empty");
        T top = std::move(items_.back());
        items_.pop_back();
        return top;
    }

    const T& top() const {
        if (empty()) throw std::underflow_error("Stack is empty");
        return items_.back();
    }

    bool empty() const { return items_.empty(); }
    std::size_t size() const { return items_.size(); }

private:
    std::vector<T> items_;
};

// Template specialization
template<>
class Stack<bool> {
    // Space-efficient bit-packed specialization
    std::vector<uint8_t> data_;
    int count_ = 0;
public:
    void push(bool val) { /* ... */ }
    bool pop() { return false; /* ... */ }
    bool empty() const { return count_ == 0; }
};

int main() {
    std::cout << clamp(15, 0, 10) << "\n";   // 10
    std::cout << clamp(3.5, 1.0, 5.0) << "\n"; // 3.5

    Stack<int> s;
    s.push(1); s.push(2); s.push(3);
    std::cout << s.pop() << "\n";  // 3

    Stack<std::string> ss;
    ss.push("hello");
    std::cout << ss.top() << "\n"; // hello

    return 0;
}
```

## Gotchas

- Templates are instantiated in every translation unit that uses them — class templates must be defined in headers (not `.cpp` files) or explicitly instantiated.
- Template error messages without concepts are notoriously long. Always add concept constraints to improve diagnostics and document intent.
