---
title: "Sets"
language: "mojo"
feature: "sets"
category: "data-structures"
applicable: true
---

Mojo provides a `Set[T]` type in its standard library. It supports standard set operations and mirrors Python's `set` API. For Python interop, Python's built-in `set` is accessible as a `PythonObject`.

## Example

```mojo
fn set_examples():
    # Set[T]
    var s1 = Set[Int]()
    s1.add(1)
    s1.add(2)
    s1.add(3)
    s1.add(2)  # duplicate ignored
    print(len(s1))  # 3

    # Check membership
    print(1 in s1)  # True
    print(9 in s1)  # False

    # Remove
    s1.remove(2)

    # Discard (no error if absent)
    s1.discard(99)

    var s2 = Set[Int]()
    s2.add(3); s2.add(4); s2.add(5)

    # Set operations
    var union        = s1 | s2
    var intersection = s1 & s2
    var difference   = s1 - s2

    # Iteration
    for item in s1:
        print(item[])

fn python_set_interop():
    from python import Python
    var py_set = Python.evaluate("{1, 2, 3, 4, 5}")
    print(py_set)
```

## Gotchas

- Set iteration order is not guaranteed (hash-based).
- Mojo's `Set` requires elements to implement `Hashable` and `Equatable` traits.
- Python set interop via `PythonObject` provides dynamic typing at the cost of type safety and performance.
