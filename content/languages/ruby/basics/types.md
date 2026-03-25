---
title: "Types & Type Systems"
language: "ruby"
feature: "types"
category: "basics"
applicable: true
---

Ruby is dynamically and strongly typed — types are checked at runtime and implicit coercions between unrelated types are not performed. Everything in Ruby is an object, including integers and `nil`. RBS and Sorbet can add optional static type annotations.

## Example

```ruby
# Core types
integer  = 42
float    = 3.14
string   = "hello"
symbol   = :status
boolean  = true
nothing  = nil
array    = [1, 2, 3]
hash     = { key: "value" }
range    = (1..10)

# Type checking
integer.class   # => Integer
"hi".is_a?(String) # => true

# No implicit coercion
"3" + 3  # => TypeError: no implicit conversion of Integer into String

# Explicit conversion
"3".to_i + 3   # => 6
3.to_s + "3"   # => "33"
```

## Gotchas

- Only `false` and `nil` are falsy; `0` and `""` are truthy in Ruby
- `Symbol` and `String` are distinct types; `:foo != "foo"`
- Integer division truncates: `7 / 2 # => 3`, use `7.0 / 2` for floats
