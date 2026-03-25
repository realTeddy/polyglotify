---
title: "Exceptions"
language: "cpp"
feature: "exceptions"
category: "error-handling"
applicable: true
---

C++ exceptions use `throw`, `try`, and `catch`. All standard library exceptions derive from `std::exception`. `noexcept` functions promise not to throw — violating this calls `std::terminate`. RAII (Resource Acquisition Is Initialization) ensures resources are released during stack unwinding. Many performance-sensitive codebases (embedded, game engines) disable exceptions and use error codes or `std::expected` instead.

## Example

```cpp
#include <stdexcept>
#include <string>
#include <iostream>
#include <fstream>

// Custom exception hierarchy
class AppError : public std::runtime_error {
public:
    explicit AppError(const std::string& msg) : std::runtime_error(msg) {}
};

class ValidationError : public AppError {
public:
    explicit ValidationError(const std::string& field, const std::string& msg)
        : AppError("Validation failed on '" + field + "': " + msg),
          field_(field) {}
    const std::string& field() const { return field_; }
private:
    std::string field_;
};

// RAII wrapper — destructor releases resource automatically
class FileHandle {
public:
    explicit FileHandle(const std::string& path)
        : file_(path) {
        if (!file_.is_open())
            throw std::ios_base::failure("Cannot open: " + path);
    }
    // file_ closes automatically in destructor

    std::string read_all() {
        return std::string(std::istreambuf_iterator<char>(file_),
                           std::istreambuf_iterator<char>());
    }

private:
    std::ifstream file_;
};

int parse_age(const std::string& s) {
    try {
        int age = std::stoi(s);
        if (age < 0 || age > 150)
            throw ValidationError("age", "must be 0-150");
        return age;
    } catch (const std::invalid_argument&) {
        throw ValidationError("age", "not a number");
    }
}

int main() {
    try {
        int age = parse_age("abc");
    } catch (const ValidationError& e) {
        std::cerr << "Field '" << e.field() << "': " << e.what() << "\n";
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << "\n";
    }
    return 0;
}
```

## Gotchas

- Throwing exceptions from destructors during stack unwinding calls `std::terminate`. Mark destructors `noexcept` (the default) and handle errors within them.
- `catch (...)` catches everything including non-standard throws. Always re-throw with `throw;` if you can't handle the exception — don't silently swallow it.
