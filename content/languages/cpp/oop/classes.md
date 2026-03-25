---
title: "Classes"
language: "cpp"
feature: "classes"
category: "oop"
applicable: true
---

C++ classes are the cornerstone of OOP, supporting encapsulation, inheritance, and polymorphism. Key C++ distinctions: destructors enable deterministic cleanup (RAII), virtual functions enable runtime polymorphism, and copy/move semantics are explicit. Modern C++ uses `= default` and `= delete` to control special member generation. `[[nodiscard]]` attributes and `constexpr` methods apply to class members.

## Example

```cpp
#include <string>
#include <iostream>
#include <memory>

class Animal {
public:
    explicit Animal(std::string name) : name_(std::move(name)) {}

    // Virtual destructor — essential for polymorphic base classes
    virtual ~Animal() = default;

    virtual std::string sound() const = 0;  // pure virtual

    std::string describe() const {
        return name_ + " says \"" + sound() + "\"";
    }

    const std::string& name() const { return name_; }

    // Delete copy to enforce move-only semantics (optional)
    // Animal(const Animal&) = delete;

protected:
    std::string name_;
};

class Dog final : public Animal {
public:
    explicit Dog(std::string name, std::string breed)
        : Animal(std::move(name)), breed_(std::move(breed)) {}

    std::string sound() const override { return "Woof"; }
    const std::string& breed() const { return breed_; }

private:
    std::string breed_;
};

int main() {
    // Polymorphism via pointer to base
    std::unique_ptr<Animal> pet = std::make_unique<Dog>("Rex", "Labrador");
    std::cout << pet->describe() << "\n";  // Rex says "Woof"

    // Dynamic cast
    if (auto* dog = dynamic_cast<Dog*>(pet.get())) {
        std::cout << "Breed: " << dog->breed() << "\n";
    }

    return 0;
}
```

## Gotchas

- Every polymorphic base class (with virtual methods) must have a `virtual` destructor. Without it, deleting a `Derived*` through a `Base*` causes undefined behavior (only `~Base` runs, leaking `Derived` resources).
- `final` prevents further inheritance of a class, enabling devirtualization optimizations in the compiler.
