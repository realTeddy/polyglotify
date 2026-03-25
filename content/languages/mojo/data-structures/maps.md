---
title: "Maps & Dictionaries"
language: "mojo"
feature: "maps"
category: "data-structures"
applicable: true
---

Mojo provides `Dict[K, V]` as its built-in hash map. It mirrors Python's `dict` API and is interoperable with Python dict objects. Keys must be `Hashable` and `Equatable`. Python's `dict` is also accessible via `PythonObject` for dynamic use cases.

## Example

```mojo
fn map_examples():
    # Dict[K, V]
    var scores = Dict[String, Int]()
    scores["alice"] = 95
    scores["bob"]   = 87
    scores["carol"] = 92

    # Access
    print(scores["alice"])  # 95

    # Safe access with get
    var dave_score = scores.get("dave", -1)
    print(dave_score)  # -1

    # Check existence
    if "alice" in scores:
        print("alice found")

    # Remove
    _ = scores.pop("bob")

    # Iteration
    for entry in scores.items():
        print(entry[].key, "->", entry[].value)

    # Keys / values
    for k in scores.keys():
        print(k[])

    print(len(scores))  # 2

fn python_dict_interop():
    from python import Python
    var py = Python.import_module("builtins")
    var d = Python.evaluate("{'x': 1, 'y': 2}")
    print(d["x"])  # 1
```

## Gotchas

- `Dict` in Mojo requires explicit type parameters `Dict[K, V]`; type inference may work in some contexts.
- Accessing a missing key with `[]` raises an error; use `.get(key, default)` for safe access.
- Python interop dicts (`PythonObject`) are dynamically typed and bypass Mojo's type system.
