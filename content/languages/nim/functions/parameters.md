---
title: "Parameters & Arguments"
language: "nim"
feature: "parameters"
category: "functions"
applicable: true
---

Nim supports positional parameters, named arguments (called by name at the call site), default values, `var` parameters (pass by reference for mutation), `openArray` for arrays of any size, and variadic parameters with `varargs`. Parameters are passed by value by default; use `var` to pass by reference.

## Example

```nim
# Default values
proc connect(host: string, port: int = 80, timeout: int = 30) =
  echo "Connecting to ", host, ":", port, " (timeout:", timeout, ")"

# Named arguments
connect("example.com")
connect("example.com", port = 443)
connect(timeout = 60, host = "api.example.com", port = 8080)

# var parameter — mutate the caller's variable
proc increment(n: var int) =
  n += 1

var x = 10
increment(x)
echo x  # 11

# openArray — accepts any seq/array of the element type
proc sumAll(nums: openArray[int]): int =
  var total = 0
  for n in nums:
    total += n
  total

echo sumAll([1, 2, 3])
echo sumAll(@[10, 20, 30])

# varargs
proc logAll(args: varargs[string]) =
  for s in args:
    echo s

logAll("a", "b", "c")

# Conversion varargs
proc printNums(nums: varargs[int, `$`]) =
  for n in nums:
    echo n
```

## Gotchas

- Parameters without `var` are immutable copies; modifying them inside the function does not affect the caller.
- `var` parameters are not pointers syntactically but are passed by reference — no `&` needed at call site.
- `openArray` can only be used as a parameter type, not as a standalone variable type.
