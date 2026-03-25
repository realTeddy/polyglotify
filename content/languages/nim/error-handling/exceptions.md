---
title: "Exceptions & Try/Catch"
language: "nim"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Nim has a full exception system with `try/except/finally`. Exceptions are `ref` objects inheriting from `Exception`. Raise with `raise newException(Type, message)`. The `except` clause can match by type. Nim also has a `CatchableError` and `Defect` distinction: `Defect` represents unrecoverable errors (like panics), `CatchableError` for expected errors.

## Example

```nim
# Custom exception
type
  ValidationError = object of CatchableError
  DatabaseError   = object of CatchableError

# Raise and catch
proc validateAge(age: int) =
  if age < 0:
    raise newException(ValidationError, "Age cannot be negative: " & $age)
  if age > 150:
    raise newException(ValidationError, "Age out of range: " & $age)

proc riskyOp(x: int): int =
  if x == 0:
    raise newException(DatabaseError, "Cannot process zero")
  100 div x

# try/except
try:
  validateAge(-5)
except ValidationError as e:
  echo "Validation failed: ", e.msg
except CatchableError as e:
  echo "Some other error: ", e.msg

# Multiple except clauses + finally
proc process(x: int) =
  try:
    let result = riskyOp(x)
    echo "Result: ", result
  except DatabaseError:
    echo "DB error"
  except:
    echo "Unexpected error: ", getCurrentExceptionMsg()
  finally:
    echo "Cleanup"   # always runs

process(5)
process(0)
```

## Gotchas

- `Defect` (like `NilAccessDefect`, `IndexDefect`) should *not* be caught in production; they indicate bugs.
- `CatchableError` is the base for errors you're expected to handle; catch `CatchableError` for a safe catch-all.
- `getCurrentExceptionMsg()` returns the current exception message inside a bare `except` block.
