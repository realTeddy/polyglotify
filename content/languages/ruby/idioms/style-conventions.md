---
title: "Style Conventions"
language: "ruby"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Ruby style is governed by the **Ruby Style Guide** and enforced by **RuboCop**. Key conventions: `snake_case` for methods and variables, `CamelCase` for classes/modules, `SCREAMING_SNAKE_CASE` for constants, two-space indentation, and preferring single quotes for strings without interpolation.

## Example

```ruby
# Naming
MAX_SIZE    = 100            # constant
UserAccount = Class.new      # class/module
user_name   = "Alice"        # variable
def find_by_email(email); end  # method

# Strings: single quotes unless interpolating
greeting = 'Hello'
message  = "Hello, #{name}!"

# Conditional style
# Good: ternary for single expression
label = score >= 90 ? "A" : "B"

# Good: guard clause over nested if
def process(user)
  return if user.nil?
  return if user.inactive?
  do_work(user)
end

# Prefer map/select/reduce over manual loops
squares = (1..5).map { |n| n**2 }

# Two-space indentation, no semicolons
class MyClass
  def initialize(value)
    @value = value
  end
end

# Parentheses optional for method calls; omit when clear
puts "done"          # OK without parens
attr_reader :name    # OK without parens
```

## Gotchas

- RuboCop enforces 120-character line length by default; configure in `.rubocop.yml`
- Prefer `frozen_string_literal: true` at the top of files to avoid unintentional string mutation and reduce allocations
- Trailing whitespace and missing newline at end of file are common RuboCop offenses
