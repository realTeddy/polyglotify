---
title: "Result Types"
language: "python"
feature: "result-types"
category: "error-handling"
applicable: false
---

Python does not have a built-in `Result` or `Either` type like Rust's `Result<T, E>` or Haskell's `Either`. The idiomatic Python approach to error handling is exceptions. When an explicit success/failure container is needed, the third-party `returns` library or a simple custom class can be used.

## Example

```python
# Python's idiomatic approach: exceptions
def parse_int(s: str) -> int:
    """Raises ValueError on failure — caller must handle it."""
    return int(s)

try:
    value = parse_int("abc")
except ValueError as e:
    print(f"Failed: {e}")

# Alternative 1: return None (or a sentinel) to signal failure
def safe_parse_int(s: str) -> int | None:
    try:
        return int(s)
    except ValueError:
        return None

result = safe_parse_int("42")
if result is not None:
    print(f"Got: {result}")

# Alternative 2: return a (value, error) tuple — common in Go-style code
def try_parse_int(s: str) -> tuple[int | None, str | None]:
    try:
        return int(s), None
    except ValueError as e:
        return None, str(e)

value, error = try_parse_int("bad")
if error:
    print(f"Error: {error}")

# Alternative 3: third-party `returns` library
# from returns.result import Result, Success, Failure
#
# def parse(s: str) -> Result[int, str]:
#     try:
#         return Success(int(s))
#     except ValueError as e:
#         return Failure(str(e))
```

## Gotchas

- Returning `None` on error is simple but forces every caller to do a `None` check — easy to forget, leading to silent bugs
- The `(value, error)` tuple pattern is not enforced by the type system, so callers can accidentally use `value` without checking `error`
- The `returns` library provides a full monadic `Result` type but adds a non-trivial dependency and learning curve to a codebase
