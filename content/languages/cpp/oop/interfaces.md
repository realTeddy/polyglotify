---
title: "Interfaces"
language: "cpp"
feature: "interfaces"
category: "oop"
applicable: true
---

C++ has no `interface` keyword, but the pattern is implemented with abstract classes — classes with only pure virtual functions (`= 0`) and a virtual destructor. C++20 **concepts** provide a cleaner compile-time alternative to interface constraints for templates, enabling duck-typing with clear error messages. A class "implements" an interface by publicly inheriting and overriding all pure virtual methods.

## Example

```cpp
#include <string>
#include <memory>
#include <iostream>
#include <concepts>

// Interface via abstract class
class ISerializer {
public:
    virtual ~ISerializer() = default;
    virtual std::string serialize(const std::string& data) = 0;
    virtual std::string deserialize(const std::string& input) = 0;
};

// Multiple interface implementation
class ILogger {
public:
    virtual ~ILogger() = default;
    virtual void log(const std::string& message) = 0;
};

class JsonSerializer : public ISerializer, public ILogger {
public:
    std::string serialize(const std::string& data) override {
        return "{\"data\":\"" + data + "\"}";
    }
    std::string deserialize(const std::string& input) override {
        // Simplified: strip JSON wrapper
        auto start = input.find('"', input.find(':') + 1) + 1;
        auto end = input.rfind('"');
        return input.substr(start, end - start);
    }
    void log(const std::string& message) override {
        std::cout << "[JSON] " << message << "\n";
    }
};

// C++20 Concept — compile-time interface constraint
template<typename T>
concept Printable = requires(T t) {
    { t.print() } -> std::same_as<void>;
    { t.to_string() } -> std::convertible_to<std::string>;
};

struct Document {
    std::string content;
    void print() const { std::cout << content << "\n"; }
    std::string to_string() const { return content; }
};

void render(Printable auto& item) { item.print(); }

int main() {
    JsonSerializer js;
    std::string encoded = js.serialize("hello");
    js.log("Serialized: " + encoded);

    Document doc{"Hello, concepts!"};
    render(doc);  // Works: Document satisfies Printable

    return 0;
}
```

## Gotchas

- Abstract classes cannot be instantiated; attempting `new ISerializer` is a compile error. Always instantiate the concrete subclass and store in a base pointer.
- C++20 concepts produce far better error messages than SFINAE-based interface checks and are the modern standard for constraining templates.
