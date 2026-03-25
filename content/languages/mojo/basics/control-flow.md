---
title: "Control Flow"
language: "mojo"
feature: "control-flow"
category: "basics"
applicable: true
---

Mojo's control flow is Python-compatible: `if`/`elif`/`else`, `for`/`in`, `while`, `break`, `continue`, `return`. Mojo adds compile-time control flow with `@parameter if` for conditional compilation. The `for` loop works over any type implementing `__iter__`. `@unroll` forces loop unrolling at compile time for performance-critical code.

## Example

```mojo
fn control_flow_examples():
    # if / elif / else
    var score = 85
    if score >= 90:
        print("A")
    elif score >= 80:
        print("B")
    elif score >= 70:
        print("C")
    else:
        print("F")

    # for loop over range
    for i in range(5):
        print(i)

    # for loop with break/continue
    for i in range(10):
        if i % 2 == 0:
            continue
        if i > 7:
            break
        print(i)  # 1, 3, 5, 7

    # while loop
    var n = 1
    while n < 100:
        n *= 2
    print(n)  # 128

    # Compile-time conditional
    alias target = "x86"
    @parameter
    if target == "x86":
        print("x86 path")
    else:
        print("other path")

    # Unrolled loop (for SIMD/performance)
    @parameter
    for i in range(4):
        print("unrolled iteration", i)
```

## Gotchas

- `@parameter if` evaluates the condition at compile time and generates code only for the true branch — the false branch is eliminated.
- `@unroll` on a `for` loop requires the range to be a compile-time constant.
- Mojo's `for` loop requires the iterable to implement `__iter__` returning an iterator with `__next__` and `__has_next__`.
