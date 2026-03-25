---
title: "Common Patterns"
language: "crystal"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Crystal idioms are heavily Ruby-inspired but with static types. Method chaining, blocks for iteration, `&.method` shorthand, nilable types for optional values, and `case`/`when` with type narrowing are all idiomatic. The type system is used to enforce correctness at compile time rather than at runtime with dynamic checks.

## Example

```crystal
# Method chaining
result = [1, 2, 3, 4, 5, 6]
  .select(&.odd?)
  .map { |x| x ** 2 }
  .sum
# => 35

# Nil coalescing with ||
name = ENV["USER"]? || "anonymous"

# Type narrowing in conditionals
def process(val : Int32 | String | Nil) : String
  case val
  when Int32  then "number: #{val}"
  when String then "string: #{val.upcase}"
  when Nil    then "nothing"
  else             "unknown"
  end
end

# Builder pattern
class QueryBuilder
  def initialize
    @conditions = [] of String
    @limit = nil
  end

  def where(cond : String) : self
    @conditions << cond
    self
  end

  def limit(n : Int32) : self
    @limit = n
    self
  end

  def build : String
    sql = "SELECT * FROM table"
    sql += " WHERE #{@conditions.join(" AND ")}" unless @conditions.empty?
    sql += " LIMIT #{@limit}" if @limit
    sql
  end
end

QueryBuilder.new.where("age > 18").where("active = true").limit(10).build
```

## Gotchas

- Use `&.method` shorthand freely — it is idiomatic and zero-overhead (compiled to direct calls).
- Prefer returning nilable types over raising exceptions for "not found" cases; keep exceptions for truly exceptional situations.
- `case`/`when` with types is Crystal's primary type narrowing mechanism; the compiler understands what type each branch has.
