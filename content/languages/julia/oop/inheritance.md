---
title: "Inheritance"
language: "julia"
feature: "inheritance"
category: "oop"
applicable: false
---

Julia has no struct inheritance. Only **abstract types** can be subtyped. Concrete structs cannot inherit from other concrete structs. Code reuse is achieved through abstract type hierarchies, shared method implementations for abstract supertypes, and composition (embedding a struct as a field). This avoids the fragile-base-class problem.

## Example

```julia
# Abstract type hierarchy
abstract type Shape end
abstract type TwoD <: Shape end

struct Circle <: TwoD
    radius::Float64
end

struct Rectangle <: TwoD
    width::Float64
    height::Float64
end

# Method on the abstract supertype
area(s::Shape) = error("area not implemented for $(typeof(s))")
area(c::Circle)    = π * c.radius^2
area(r::Rectangle) = r.width * r.height

# Shared behavior via abstract type
describe(s::TwoD) = println("2D shape, area = ", area(s))

# Composition for code reuse
struct ColoredCircle
    circle::Circle      # embed Circle
    color::String
end
area(cc::ColoredCircle) = area(cc.circle)  # delegate

# Usage
c = Circle(5.0)
r = Rectangle(3.0, 4.0)
describe(c)
describe(r)
```

## Gotchas

- Only abstract types can be subtyped with `<:`; `struct Foo <: ConcreteBar` is an error.
- Use composition (fields) to reuse struct data; use abstract type methods to share behavior.
- `isa(x, AbstractType)` checks the full type hierarchy, enabling polymorphism through dispatch.
