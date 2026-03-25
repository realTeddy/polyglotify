---
title: "Control Flow"
language: "julia"
feature: "control-flow"
category: "basics"
applicable: true
---

Julia has `if/elseif/else/end`, `for ... in ... end`, `while ... end`, `break`, `continue`, and ternary `? :`. `if` is an expression returning a value. `for` loops can iterate over any iterable. List comprehensions provide concise collection transformation. `do ... end` blocks create anonymous functions for callback-style APIs.

## Example

```julia
# if/elseif/else (expression — returns a value)
x = 7
label = if x > 0
    "positive"
elseif x < 0
    "negative"
else
    "zero"
end
println(label)

# Ternary
sign = x >= 0 ? "non-negative" : "negative"

# for loop
for i in 1:5
    print(i, " ")
end
println()

# Iterate a collection
fruits = ["apple", "banana", "cherry"]
for fruit in fruits
    println(fruit)
end

# while with break/continue
n = 0
while true
    n += 1
    n % 2 == 0 && continue
    n > 7       && break
    println(n)
end

# Comprehensions
squares = [x^2 for x in 1:5]
evens   = [x   for x in 1:10 if x % 2 == 0]
println(squares)
println(evens)
```

## Gotchas

- All blocks end with `end`; forgetting it causes a parse error.
- `1:5` creates a range (inclusive on both ends), not a Python-style half-open range.
- Short-circuit operators `&&` and `||` can be used as inline conditionals: `condition && action`.
