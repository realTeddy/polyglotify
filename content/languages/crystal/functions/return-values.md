---
title: "Return Values"
language: "crystal"
feature: "return-values"
category: "functions"
applicable: true
---

Crystal methods return the value of their last expression. Explicit `return` exits early. Methods can return union types such as `String | Nil` (often written `String?`). Multiple values can be returned as a `Tuple`. The compiler enforces that callers handle nilable return values.

## Example

```crystal
# Implicit return
def double(n : Int32) : Int32
  n * 2
end

# Early return
def find(arr : Array(Int32), target : Int32) : Int32?
  arr.each_with_index do |val, idx|
    return idx if val == target
  end
  nil  # explicit nil for "not found"
end

# Tuple return
def min_max(arr : Array(Int32)) : {Int32, Int32}
  {arr.min, arr.max}
end

lo, hi = min_max([3, 1, 4, 1, 5, 9])
puts lo  # => 1
puts hi  # => 9

# Union return with nil handling
result = find([10, 20, 30], 20)
if result
  puts "found at index #{result}"
else
  puts "not found"
end
```

## Gotchas

- The compiler infers the return type as the union of all possible return paths; annotating with `: ReturnType` will cause a compile error if any path returns a different type.
- `return` inside a block returns from the enclosing **method**, not just the block.
- Returning a tuple allows destructuring assignment, which is idiomatic for multiple return values.
