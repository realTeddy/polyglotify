---
title: "Parameters & Arguments"
language: "julia"
feature: "parameters"
category: "functions"
applicable: true
---

Julia supports positional arguments, optional arguments with defaults, keyword arguments (separated by `;`), and variadic arguments with `...`. Type annotations on parameters are optional but enable multiple dispatch. Keyword arguments are always passed by name and can be in any order.

## Example

```julia
# Optional positional arguments with defaults
function connect(host::String, port::Int=80, timeout::Int=30)
    println("Connecting to $host:$port (timeout: $timeout s)")
end

# Keyword arguments (after the ;)
function plot(x, y; color="blue", linewidth=1, label="")
    println("Plotting with color=$color, lw=$linewidth, label=$label")
end

# Variadic (splat) arguments
function total(first, rest...)
    first + sum(rest)
end

# Keyword variadic
function log(msg; kwargs...)
    println(msg, " ", kwargs)
end

# Splat operator to expand collections
args = (2, 3, 4)
println(total(1, args...))   # 10

connect("example.com")
connect("example.com", 443)
plot(1:10, rand(10), color="red", label="series 1")
println(total(1, 2, 3, 4, 5))
```

## Gotchas

- Keyword arguments must come after `;` in the function signature; positional args come before.
- When calling a function, keyword arguments can be in any order but positional args cannot.
- `...` in a call site splats a collection; `rest...` in a definition collects extra positional args.
