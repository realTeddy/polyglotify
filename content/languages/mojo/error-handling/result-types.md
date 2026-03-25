---
title: "Result Types"
language: "mojo"
feature: "result-types"
category: "error-handling"
applicable: true
---

Mojo provides `Optional[T]` for values that may be absent and uses the `raises` + `Error` mechanism for fallible `fn` functions. There is no separate `Result[T, E]` type in the standard library yet, but the pattern of using `Optional[T]` for optional values and `raises` for errors covers most use cases. Custom result types can be built with structs.

## Example

```mojo
from collections import Optional

# Optional[T] — value or None
fn find_index(lst: List[Int], target: Int) -> Optional[Int]:
    for i in range(len(lst)):
        if lst[i] == target:
            return i
    return None

# Using Optional
fn main():
    var nums = List[Int]()
    nums.append(10); nums.append(20); nums.append(30)

    var idx = find_index(nums, 20)
    if idx:
        print("found at index", idx.value())  # found at index 1
    else:
        print("not found")

    # or_else pattern
    var default_idx = find_index(nums, 99).or_else(-1)
    print(default_idx)  # -1

# Raises-based error handling (fn context)
fn parse_positive(s: String) raises -> Int:
    var n = atoi(s)
    if n <= 0:
        raise Error("expected positive number, got: " + s)
    return n

fn call_parse():
    try:
        var n = parse_positive("42")
        print(n)  # 42
        var m = parse_positive("-1")  # raises
    except e:
        print("Error:", str(e))
```

## Gotchas

- `Optional.value()` panics if the value is absent; always check with `if optional:` before calling `.value()`.
- `.or_else(default)` is the safe unwrap idiom: returns the value if present, otherwise the default.
- For library code, prefer `raises` over `Optional` when the failure reason matters; use `Optional` for simple "present or absent" semantics.
