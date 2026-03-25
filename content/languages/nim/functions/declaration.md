---
title: "Function Declaration"
language: "nim"
feature: "declaration"
category: "functions"
applicable: true
---

Nim uses `proc` for procedures (functions with side effects), `func` for pure functions (no side effects enforced), and `method` for OOP dispatch. Functions support overloading, default arguments, named arguments, and generics. The last expression in a function body is the implicit return value. Nim also has `iterator` for lazy sequences and `template`/`macro` for metaprogramming.

## Example

```nim
# proc — basic function
proc greet(name: string): string =
  "Hello, " & name & "!"

# func — pure (no side effects, enforced by compiler)
func add(a, b: int): int =
  a + b

# Overloading
proc describe(x: int): string =
  "integer: " & $x

proc describe(x: float): string =
  "float: " & $x

# Generic proc
proc identity[T](x: T): T =
  x

# Procedure with no return value
proc log(msg: string) =
  echo "[LOG] ", msg

# Recursive
proc factorial(n: int): int =
  if n <= 1: 1
  else: n * factorial(n - 1)

echo greet("Alice")
echo add(3, 4)
echo describe(42)
echo describe(3.14)
echo identity("hello")
log("test message")
echo factorial(5)
```

## Gotchas

- `func` enforces the no-side-effects constraint at compile time; calling `echo` inside a `func` is an error.
- Nim procs can be overloaded; the compiler chooses the best match based on argument types.
- The `result` implicit variable holds the return value; you can assign to it instead of using `return`.
