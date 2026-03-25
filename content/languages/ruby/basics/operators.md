---
title: "Operators"
language: "ruby"
feature: "operators"
category: "basics"
applicable: true
---

Ruby supports the standard arithmetic, comparison, and logical operators, plus several expressive additions like the spaceship operator `<=>`, safe navigation `&.`, and pattern-match `===`. Most operators are actually method calls, meaning they can be overridden in custom classes.

## Example

```ruby
# Arithmetic
10 + 3   # => 13
10 ** 3  # => 1000 (exponentiation)
10 % 3   # => 1

# Comparison
5 <=> 3  # => 1  (spaceship: -1, 0, or 1)
"apple" === "apple"  # => true

# Logical
true && false   # => false
true || false   # => true
!true           # => false

# Safe navigation (avoids NoMethodError on nil)
user&.name      # => nil if user is nil

# Conditional assignment
x = nil
x ||= 42   # assigns 42 only if x is nil/false
y = 5
y &&= y * 2  # assigns only if y is truthy => 10

# String / Array operators
"hello " + "world"  # => "hello world"
[1, 2] + [3, 4]     # => [1, 2, 3, 4]
[1, 2, 3] - [2]     # => [1, 3]
```

## Gotchas

- `==` tests value equality; `equal?` tests object identity (same `object_id`)
- `and`/`or` have very low precedence compared to `&&`/`||`; prefer `&&`/`||` in conditionals
