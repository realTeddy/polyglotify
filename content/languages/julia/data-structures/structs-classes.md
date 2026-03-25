---
title: "Structs & Classes"
language: "julia"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Julia uses `struct` for immutable composite types and `mutable struct` for mutable ones. Structs can have type-annotated fields. Methods are defined separately using multiple dispatch — they are not contained inside the struct. This separates data from behavior, unlike OOP classes.

## Example

```julia
# Immutable struct
struct Point
    x::Float64
    y::Float64
end

# Mutable struct
mutable struct Counter
    value::Int
    Counter() = new(0)      # inner constructor
    Counter(n::Int) = new(n)
end

# Parametric struct
struct Pair{A, B}
    first::A
    second::B
end

# Methods are defined outside the struct
distance(p::Point, q::Point) = sqrt((p.x-q.x)^2 + (p.y-q.y)^2)
increment!(c::Counter) = (c.value += 1; c)

# Usage
p1 = Point(0.0, 0.0)
p2 = Point(3.0, 4.0)
println(distance(p1, p2))   # 5.0

c = Counter()
increment!(c)
increment!(c)
println(c.value)             # 2

pr = Pair("hello", 42)
println(pr.first, pr.second)
```

## Gotchas

- `struct` fields are immutable by default; use `mutable struct` for fields that need mutation.
- Inner constructors via `new(...)` allow validation and custom initialization logic.
- There is no inheritance of `struct` types; use abstract types + multiple dispatch for polymorphism.
