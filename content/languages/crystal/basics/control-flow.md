---
title: "Control Flow"
language: "crystal"
feature: "control-flow"
category: "basics"
applicable: true
---

Crystal's control flow closely mirrors Ruby. `if`/`elsif`/`else`, `unless`, `case`/`when`, `while`, `until`, and `loop` are all available. Postfix `if`/`unless` work as statement modifiers. `next`, `break`, and `return` control loop/method flow. `loop` is an infinite loop. All control structures are expressions returning the value of their last expression.

## Example

```crystal
# if / elsif / else
grade = 85
label = if grade >= 90 then "A"
        elsif grade >= 80 then "B"
        elsif grade >= 70 then "C"
        else "F"
        end

# Postfix modifier
puts "pass" if grade >= 60

# unless
unless grade < 60
  puts "you passed"
end

# case / when
case grade
when 90..100 then puts "A"
when 80...90 then puts "B"
when String  then puts "string grade"
end

# while / until
i = 0
while i < 5
  i += 1
end

# loop with break
result = loop do
  x = rand(10)
  break x if x > 7
end

# times / each
5.times { |i| print "#{i} " }
(1..5).each { |n| print "#{n} " }
```

## Gotchas

- `case`/`when` uses `===` for comparison, so ranges and types work naturally.
- Crystal's `if` is an expression; assigning to a variable inside both branches widens the variable's type.
- `loop` without `break` is an infinite loop; Crystal treats `loop do ... end` as never returning by type (`NoReturn`).
