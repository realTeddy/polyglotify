---
title: "Inheritance"
language: "cpp"
feature: "inheritance"
category: "oop"
applicable: true
---

C++ supports single and multiple inheritance. `public` inheritance models an is-a relationship; `protected` and `private` inheritance model implementation reuse. Virtual functions enable runtime polymorphism — `override` (C++11) makes overrides explicit and catches signature mismatches. Virtual inheritance resolves the diamond problem. Modern C++ prefers composition and mixins via templates over deep inheritance hierarchies.

## Example

```cpp
#include <string>
#include <memory>
#include <vector>
#include <iostream>

class Shape {
public:
    explicit Shape(std::string color) : color_(std::move(color)) {}
    virtual ~Shape() = default;

    virtual double area() const = 0;
    virtual double perimeter() const = 0;

    virtual std::string describe() const {
        return color_ + " " + class_name() +
               " (area=" + std::to_string(area()) + ")";
    }

protected:
    virtual std::string class_name() const = 0;
    std::string color_;
};

class Circle : public Shape {
public:
    Circle(std::string color, double r)
        : Shape(std::move(color)), radius_(r) {}

    double area() const override { return 3.14159 * radius_ * radius_; }
    double perimeter() const override { return 2 * 3.14159 * radius_; }

protected:
    std::string class_name() const override { return "Circle"; }

private:
    double radius_;
};

class Rectangle : public Shape {
public:
    Rectangle(std::string color, double w, double h)
        : Shape(std::move(color)), width_(w), height_(h) {}

    double area() const override { return width_ * height_; }
    double perimeter() const override { return 2 * (width_ + height_); }

protected:
    std::string class_name() const override { return "Rectangle"; }

private:
    double width_, height_;
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>("red", 5.0));
    shapes.push_back(std::make_unique<Rectangle>("blue", 4.0, 6.0));

    for (const auto& s : shapes)
        std::cout << s->describe() << "\n";

    return 0;
}
```

## Gotchas

- Multiple inheritance can cause ambiguity when two bases define the same member. Use virtual inheritance (`virtual public Base`) to share a single base subobject in diamond hierarchies, but this has performance and complexity costs.
- Slicing: assigning a `Derived` object to a `Base` variable (not pointer/reference) copies only the `Base` part, silently discarding `Derived` data and virtual dispatch.
