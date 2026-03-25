---
title: "Parameters & Arguments"
language: "python"
feature: "parameters"
category: "functions"
applicable: true
---

Python supports positional, keyword, default, variadic (`*args`), and keyword-variadic (`**kwargs`) parameters. The `/` and `*` separators in a signature enforce positional-only and keyword-only arguments respectively, giving fine-grained control over how a function is called.

## Example

```python
# Default parameters
def connect(host, port=5432, timeout=30):
    print(f"Connecting to {host}:{port} (timeout={timeout}s)")

connect("localhost")            # uses defaults
connect("localhost", 3306)      # positional
connect("localhost", timeout=5) # keyword

# *args — collects extra positional args into a tuple
def total(*numbers):
    return sum(numbers)

total(1, 2, 3, 4)  # 10

# **kwargs — collects extra keyword args into a dict
def log(message, **context):
    print(message, context)

log("error", user="alice", code=500)

# Positional-only (/) and keyword-only (*) separators
def strict(pos_only, /, normal, *, kw_only):
    return pos_only + normal + kw_only

strict(1, 2, kw_only=3)  # ok
# strict(pos_only=1, ...)  # TypeError

# Unpacking at call site
args = (1, 2)
kwargs = {"kw_only": 3}
strict(0, *args, **kwargs)
```

## Gotchas

- Never use a mutable object (list, dict) as a default parameter value — use `None` and create the object inside the function body instead
- `*args` and `**kwargs` capture extras; parameters before `*args` are still positional; parameters after `*args` become keyword-only
- Argument order at a call site must be: positional, then `*unpacked`, then keyword, then `**unpacked`
