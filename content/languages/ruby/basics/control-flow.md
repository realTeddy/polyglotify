---
title: "Control Flow"
language: "ruby"
feature: "control-flow"
category: "basics"
applicable: true
---

Ruby offers `if/elsif/else`, `unless`, `case/when`, and loops (`while`, `until`, `for`, `loop`). Conditions can be written as trailing modifiers for conciseness. `case/when` uses `===` for matching and supports ranges and regexes.

## Example

```ruby
# if / elsif / else
if score >= 90
  "A"
elsif score >= 80
  "B"
else
  "C"
end

# Trailing modifier
puts "positive" if number > 0
puts "retry"    until success

# unless (inverse if)
unless logged_in
  redirect_to login_path
end

# case / when
case status
when :ok        then "success"
when 400..499   then "client error"
when /timeout/  then "timed out"
else                 "unknown"
end

# Loops
3.times { |i| puts i }
[1, 2, 3].each { |n| puts n }

while count < 5
  count += 1
end
```

## Gotchas

- `for` loops share the loop variable's scope with the surrounding context; `each` creates a new scope
- `break`, `next`, and `redo` work inside blocks and loops
- Every expression returns a value in Ruby, including `if`
