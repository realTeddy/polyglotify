---
title: "Style Conventions"
language: "python"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Python style is governed by PEP 8, the official style guide. Key conventions include `snake_case` for variables and functions, `PascalCase` for classes, `UPPER_SNAKE_CASE` for constants, and 4-space indentation. The `ruff` formatter (or `black`) enforces these automatically in modern projects.

## Example

```python
# Naming conventions
MAX_CONNECTIONS = 10          # constant

class UserAccount:            # PascalCase
    default_role = "viewer"   # class variable, snake_case

    def __init__(self, username: str) -> None:
        self.username = username
        self._token: str | None = None    # _single_leading for internal

    def get_token(self) -> str | None:    # snake_case method
        return self._token

# Line length: 88 chars (black/ruff default, PEP 8 says 79)
result = some_function(
    argument_one,
    argument_two,
    argument_three,
)

# Imports: stdlib → third-party → local, alphabetically within each group
import os
import sys

import requests
import pydantic

from my_project.models import User

# Truthiness — prefer implicit boolean tests
items = []
if not items:          # idiomatic
    print("empty")
# NOT: if len(items) == 0:

# String formatting — f-strings are idiomatic in Python 3.6+
name = "Alice"
greeting = f"Hello, {name}!"   # preferred
greeting = "Hello, " + name    # verbose, avoid
greeting = "Hello, %s" % name  # old-style, avoid

# Type hints on public APIs
def process(data: list[str], *, verbose: bool = False) -> dict[str, int]:
    ...
```

## Gotchas

- PEP 8 is a guide, not a law — consistency within a project matters more than strict adherence, but automated formatters like `ruff format` remove the debate entirely
- `is None` and `is not None` are the correct idioms for `None` checks — never `== None`, because a class can override `__eq__`
- Trailing commas on multi-line collections are idiomatic and encouraged — they make `git diff` cleaner when adding items
