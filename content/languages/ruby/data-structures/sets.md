---
title: "Sets"
language: "ruby"
feature: "sets"
category: "data-structures"
applicable: true
---

Ruby's `Set` class (from the standard library) stores unique, unordered values with O(1) membership testing. It supports standard set operations: union, intersection, difference, and subset checks. In Ruby 3.2+ `Set` is built-in; earlier versions require `require 'set'`.

## Example

```ruby
require 'set'   # not needed in Ruby 3.2+

# Creation
fruits = Set.new(["apple", "banana", "cherry"])
primes = Set[2, 3, 5, 7, 11]

# Add / remove
fruits.add("date")
fruits.delete("banana")

# Membership
fruits.include?("apple")   # => true

# Set operations
a = Set[1, 2, 3, 4]
b = Set[3, 4, 5, 6]

a | b    # union       => {1, 2, 3, 4, 5, 6}
a & b    # intersection => {3, 4}
a - b    # difference   => {1, 2}
a ^ b    # symmetric difference => {1, 2, 5, 6}

# Subset / superset
Set[1, 2].subset?(Set[1, 2, 3])   # => true
```

## Gotchas

- `Set` is not a core class in Ruby < 3.2; always `require 'set'` for compatibility
- Sets are unordered — do not rely on iteration order
- Adding a duplicate element is silently ignored, which is the intended behavior
