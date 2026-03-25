---
title: "Closures & Lambdas"
language: "crystal"
feature: "closures"
category: "functions"
applicable: true
---

Crystal has blocks (inline closures passed to methods with `do...end` or `{...}`), `Proc` objects (explicit closures stored in variables), and lambdas (`->(args) { body }`). Blocks are the most common and efficient form. A `Proc` captures its surrounding variables. `yield` transfers control to the caller's block.

## Example

```crystal
# Block (most common)
[1, 2, 3].map { |x| x * 2 }  # => [2, 4, 6]

# Block with do...end (multi-line)
[1, 2, 3].each do |x|
  puts x * x
end

# Proc
doubler = Proc(Int32, Int32).new { |x| x * 2 }
doubler.call(5)  # => 10

# Lambda (arrow syntax)
add = ->(a : Int32, b : Int32) { a + b }
add.call(3, 4)   # => 7

# Closure capturing outer variable
def make_counter
  count = 0
  -> { count += 1; count }
end

c = make_counter
c.call  # => 1
c.call  # => 2
c.call  # => 3

# Method reference as Proc
[1, -2, 3, -4].select(&.positive?)  # => [1, 3]
["a", "bb", "ccc"].map(&.size)       # => [1, 2, 3]
```

## Gotchas

- Blocks are not objects and cannot be stored without `&block` capture; `Proc` is the storable form.
- `&.method_name` is Crystal's shorthand for `{ |x| x.method_name }` — very commonly used.
- Procs and lambdas both close over outer variables, but a `return` inside a `Proc` returns from the enclosing method, while a lambda `return` only exits the lambda.
