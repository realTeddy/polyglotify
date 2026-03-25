---
title: "Parameters & Arguments"
language: "ruby"
feature: "parameters"
category: "functions"
applicable: true
---

Ruby supports positional, default, splat (`*`), double-splat (`**` for keyword arguments), and block (`&`) parameters. Keyword arguments require callers to use named keys, making APIs self-documenting and order-independent.

## Example

```ruby
# Default parameter
def connect(host, port = 80)
  "#{host}:#{port}"
end

# Splat — collects extra positional args into an array
def sum(*numbers)
  numbers.sum
end
sum(1, 2, 3)  # => 6

# Keyword arguments
def create_user(name:, role: "guest")
  { name: name, role: role }
end
create_user(name: "Alice")

# Double-splat — collects extra keyword args
def log(message, **options)
  puts "#{message} #{options}"
end

# Block parameter
def run(&block)
  block.call
end
run { puts "executed" }

# Combined
def complex(a, b = 2, *c, d:, **e, &f)
  # a: required positional, b: default, c: splat,
  # d: required keyword, e: keyword splat, f: block
end
```

## Gotchas

- After a `*splat` parameter, remaining positional parameters must be passed by keyword
- Hashes as last argument can be passed without braces (implicit hash), which can be confused with keyword arguments before Ruby 3.0
