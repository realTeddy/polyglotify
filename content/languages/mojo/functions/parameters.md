---
title: "Parameters & Arguments"
language: "mojo"
feature: "parameters"
category: "functions"
applicable: true
---

Mojo distinguishes between **compile-time parameters** (in `[...]`, resolved at compile time, used for generics) and **runtime arguments** (in `(...)`, passed at runtime). Runtime argument conventions: `borrowed` (default, read-only reference), `inout` (mutable reference, like C++ `&`), `owned` (transfers ownership). Default values and keyword arguments are supported.

## Example

```mojo
# Compile-time parameters [T] vs runtime arguments (x: T)
fn repeat[count: Int](message: String):
    for _ in range(count):
        print(message)

# Call: repeat[3]("hello")  — count resolved at compile time

# Ownership conventions
fn read_only(x: Int):           # borrowed (default) — no copy, read-only
    print(x)

fn mutate(inout x: Int):        # inout — caller's variable is modified
    x += 1

fn consume(owned s: String):    # owned — takes ownership, caller cannot use s after
    print(s)

# Default arguments
fn connect(host: String, port: Int = 80, tls: Bool = False) -> String:
    var scheme = "https" if tls else "http"
    return scheme + "://" + host + ":" + str(port)

# Keyword arguments
fn configure(*, width: Int, height: Int) -> String:
    return str(width) + "x" + str(height)

fn main():
    repeat[3]("hi")

    var n = 10
    mutate(n)
    print(n)  # 11

    print(connect("example.com"))                    # http://example.com:80
    print(connect("example.com", tls=True, port=443))  # https://example.com:443
```

## Gotchas

- `inout` arguments must be `var` (mutable) at the call site; passing an immutable value is a compile error.
- Compile-time parameters `[N: Int]` are monomorphized — a new function is generated for each unique value.
- `owned` moves the value into the function; the caller's binding is invalidated after the call.
