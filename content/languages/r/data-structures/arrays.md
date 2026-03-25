---
title: "Arrays & Lists"
language: "r"
feature: "arrays"
category: "data-structures"
applicable: true
---

R's fundamental data structure is the **atomic vector** — a homogeneous, one-dimensional sequence. Multi-dimensional arrays are vectors with a `dim` attribute. R also has **lists**, which are heterogeneous vectors that can hold any type including other lists.

## Example

```r
# Atomic vector (homogeneous)
nums  <- c(1, 2, 3, 4, 5)
words <- c("apple", "banana", "cherry")
flags <- c(TRUE, FALSE, TRUE)

# Access (1-indexed!)
nums[1]    # => 1 (first element)
nums[2:4]  # => c(2, 3, 4)
nums[c(1, 3, 5)]  # => c(1, 3, 5)
nums[-1]   # => everything except first

# Common operations
length(nums)         # => 5
sum(nums)            # => 15
rev(nums)            # => c(5, 4, 3, 2, 1)
sort(nums, decreasing = TRUE)
unique(c(1, 2, 2, 3))  # => c(1, 2, 3)
which(nums > 2)         # => c(3, 4, 5) (indices)

# List (heterogeneous)
person <- list(name = "Alice", age = 30, scores = c(95, 87, 92))
person$name         # => "Alice"
person[["age"]]     # => 30
person[[3]]         # => c(95, 87, 92)

# Matrix (2D array)
m <- matrix(1:9, nrow = 3, ncol = 3)
m[2, 3]  # row 2, col 3
```

## Gotchas

- R vectors are 1-indexed, not 0-indexed
- `x[0]` returns a zero-length vector, not an error
- Accessing a single element from a list with `[` returns a list; use `[[` to extract the element itself
