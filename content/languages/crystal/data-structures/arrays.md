---
title: "Arrays & Lists"
language: "crystal"
feature: "arrays"
category: "data-structures"
applicable: true
---

Crystal's `Array(T)` is a generic, resizable, heap-allocated array. Literals use `[]`. Type is inferred from the literal contents. Arrays support a rich set of methods from `Enumerable`. Elements are accessed by index (0-based); negative indices count from the end. Out-of-bounds access with `[]` raises `IndexError`; `[]?` returns `nil`.

## Example

```crystal
# Creation
nums = [1, 2, 3, 4, 5]
strs = ["a", "b", "c"]
empty = Array(Int32).new
with_default = Array(Int32).new(5, 0)  # [0, 0, 0, 0, 0]

# Access
nums[0]    # => 1
nums[-1]   # => 5
nums[1..3] # => [2, 3, 4]
nums[6]?   # => nil  (safe access)

# Modification
nums.push(6)         # append
nums.unshift(0)      # prepend
nums.pop             # remove last
nums.shift           # remove first
nums.insert(2, 99)   # insert at index

# Iteration and transforms
nums.map { |x| x * 2 }
nums.select { |x| x.odd? }
nums.reject { |x| x > 3 }
nums.reduce(0) { |acc, x| acc + x }
nums.each_with_index { |x, i| puts "#{i}: #{x}" }
nums.sort
nums.sort_by { |x| -x }  # descending
nums.flatten              # if nested
[1, 2] + [3, 4]           # => [1, 2, 3, 4]
```

## Gotchas

- `Array` is generic: `Array(Int32)` and `Array(String)` are distinct types; mixed-type arrays infer a union type like `Array(Int32 | String)`.
- `push` returns the array itself; `pop` returns the removed element.
- Slices with ranges (`arr[1..3]`) return a new `Array`, not a view.
