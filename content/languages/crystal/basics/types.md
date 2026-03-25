---
title: "Types & Type Systems"
language: "crystal"
feature: "types"
category: "basics"
applicable: true
---

Crystal has a static type system with full type inference. Types form a hierarchy with `Value` (stack-allocated) and `Reference` (heap-allocated) as the two main branches. Union types (`A | B`) arise naturally from `if` branches. The compiler performs global type inference. Generics, modules (as mixins), and abstract types provide powerful type abstractions without runtime overhead.

## Example

```crystal
# Primitive types
x : Int32   = 42
y : Float64 = 3.14
b : Bool    = true
c : Char    = 'a'
s : String  = "hello"

# Union types
val : Int32 | String = 42
val = "now a string"

# Nilable (most common union)
name : String? = nil

# Type checking
val.is_a?(Int32)   # => false (val is String now)
val.class          # => String

# Typeof (compile-time type)
typeof(42)         # => Int32
typeof(val)        # => (Int32 | String)

# Tuples (value types)
pair = {1, "hello"}
pair[0]  # => 1

# NamedTuples
point = {x: 1, y: 2}
point[:x]  # => 1

# Symbols
:hello.class  # => Symbol
```

## Gotchas

- `Int32` is the default integer literal type; use suffixes for others: `1_u8`, `1_i64`, `1.0_f32`.
- Union types are resolved at compile time; Crystal never boxes values for unions the way some languages do.
- `nil` has type `Nil`; the compiler forces you to handle `nil` explicitly (no null pointer surprises at runtime).
