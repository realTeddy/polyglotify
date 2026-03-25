---
title: "Return Values"
language: "ruby"
feature: "return-values"
category: "functions"
applicable: true
---

Ruby methods implicitly return the value of the last evaluated expression, making an explicit `return` unnecessary in most cases. `return` is used for early exits or returning multiple values as an array. Multiple values can be returned with implicit array packing.

## Example

```ruby
# Implicit return
def double(n)
  n * 2   # last expression is returned
end

# Explicit return for early exit
def find_user(id)
  return nil if id.nil?
  User.find(id)
end

# Returning multiple values (as array)
def min_max(arr)
  [arr.min, arr.max]
end

low, high = min_max([3, 1, 4, 1, 5])
# low => 1, high => 5

# Methods always return something; "void" methods return nil
def side_effect
  puts "done"
  # implicitly returns nil
end
```

## Gotchas

- `return` inside a block returns from the enclosing method, not just the block — use `next` to return from a block only
- Using `return` with multiple values packs them into an array automatically
- A method body of just a comment returns `nil`
