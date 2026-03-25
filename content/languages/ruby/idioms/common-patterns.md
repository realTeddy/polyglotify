---
title: "Common Patterns"
language: "ruby"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Ruby's expressiveness enables idiomatic patterns like method chaining, the builder pattern via blocks, memoization with `||=`, and the null object pattern. Metaprogramming tools like `method_missing` and `define_method` allow highly dynamic APIs.

## Example

```ruby
# Memoization with ||=
def current_user
  @current_user ||= User.find(session[:user_id])
end

# Builder pattern with block + yield self
class QueryBuilder
  def initialize
    @conditions = []
  end

  def where(condition)
    @conditions << condition
    self   # enable chaining
  end

  def build
    "SELECT * WHERE #{@conditions.join(' AND ')}"
  end
end

QueryBuilder.new.where("age > 18").where("active = true").build

# Tap for debugging in a chain
[1, 2, 3].map { |n| n * 2 }.tap { |r| puts r.inspect }.select(&:odd?)

# Symbol#to_proc shorthand
[1, 2, 3].map(&:to_s)   # => ["1", "2", "3"]
words.map(&:upcase)

# Struct as value object
Result = Struct.new(:value, :error) do
  def success?; error.nil?; end
end
```

## Gotchas

- `||=` re-evaluates if the cached value is `false` or `nil`; use a dedicated ivar flag if `false` is a valid cached value
- `method_missing` can hide typos — always define `respond_to_missing?` alongside it
- Excessive method chaining on `nil` causes `NoMethodError`; use safe navigation `&.` or `.then`
