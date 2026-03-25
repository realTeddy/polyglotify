---
title: "Arrays & Lists"
language: "ruby"
feature: "arrays"
category: "data-structures"
applicable: true
---

Ruby arrays are ordered, zero-indexed collections that can hold mixed types. They are dynamic (auto-resize) and come with a rich set of enumerable methods. The `Array` class includes `Enumerable`, providing `map`, `select`, `reduce`, and dozens more.

## Example

```ruby
# Creation
nums = [1, 2, 3, 4, 5]
mixed = [1, "two", :three, nil]
words = %w[apple banana cherry]   # shorthand for string arrays

# Access
nums[0]    # => 1
nums[-1]   # => 5
nums[1..3] # => [2, 3, 4]

# Mutation
nums.push(6)       # => [1,2,3,4,5,6]
nums << 7          # shovel operator
nums.pop           # removes and returns last
nums.unshift(0)    # prepend
nums.shift         # removes first

# Common operations
nums.map { |n| n * 2 }
nums.select { |n| n.even? }
nums.reject { |n| n > 3 }
nums.reduce(0) { |sum, n| sum + n }
nums.sort
nums.flatten          # flatten nested arrays
nums.compact          # remove nils
nums.uniq             # remove duplicates
```

## Gotchas

- Accessing an out-of-bounds index returns `nil`, not an error
- `Array#sort` returns a new array; `Array#sort!` mutates in place
- `flatten` without an argument flattens all levels; pass a depth integer to limit
