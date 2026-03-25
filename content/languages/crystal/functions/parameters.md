---
title: "Parameters & Arguments"
language: "crystal"
feature: "parameters"
category: "functions"
applicable: true
---

Crystal supports positional parameters, default values, keyword arguments (using `name:` syntax), splat (`*args`) for variadic positional arguments, and double splat (`**kwargs`) for variadic keyword arguments. A bare `*` in the parameter list forces all subsequent arguments to be passed as keywords.

## Example

```crystal
# Default parameter
def greet(name, greeting = "Hello")
  "#{greeting}, #{name}!"
end
greet("Alice")           # => "Hello, Alice!"
greet("Bob", "Hi")       # => "Hi, Bob!"

# Keyword argument (caller must name it)
def connect(host, *, port : Int32 = 80, tls : Bool = false)
  "#{tls ? "https" : "http"}://#{host}:#{port}"
end
connect("example.com", port: 443, tls: true)

# Splat (variadic positional)
def sum(*nums : Int32)
  nums.sum
end
sum(1, 2, 3, 4)  # => 10

# Double splat (variadic keyword)
def log(**options)
  options.each { |k, v| puts "#{k}: #{v}" }
end
log(level: "info", message: "started")

# Block parameter
def repeat(n, &block : -> Void)
  n.times { block.call }
end
repeat(3) { print "hello " }
```

## Gotchas

- After a bare `*` in the parameter list, all parameters must be passed as keyword arguments at the call site.
- `*args` collects into a `Tuple`, not an `Array`; use `.to_a` to convert if needed.
- Blocks can be captured as a `Proc` with `&block`; calling `yield` is more efficient if you don't need to store it.
