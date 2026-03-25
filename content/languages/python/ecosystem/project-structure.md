---
title: "Project Structure"
language: "python"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Python package is a directory containing an `__init__.py` file. Modern projects declare metadata in `pyproject.toml` (PEP 517/518). The `src/` layout is recommended to avoid import confusion between the installed package and the local source directory.

## Example

```
my-project/
├── pyproject.toml          # project metadata and build config
├── README.md
├── .python-version         # pinned interpreter (pyenv)
├── src/
│   └── my_project/
│       ├── __init__.py     # makes it a package
│       ├── main.py
│       ├── models/
│       │   ├── __init__.py
│       │   └── user.py
│       └── utils/
│           ├── __init__.py
│           └── helpers.py
└── tests/
    ├── __init__.py
    ├── test_main.py
    └── models/
        └── test_user.py
```

```toml
# pyproject.toml
[build-system]
requires = ["setuptools>=68", "wheel"]
build-backend = "setuptools.backends.legacy:build"

[project]
name = "my-project"
version = "0.1.0"
description = "A sample project"
requires-python = ">=3.11"
dependencies = ["requests>=2.31"]

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.mypy]
strict = true

[tool.ruff]
line-length = 88
```

## Gotchas

- Without the `src/` layout, running `python` from the project root makes the local directory importable, which can shadow the installed package and cause confusing bugs
- An `__init__.py` file is required to make a directory a regular package — its absence makes it a "namespace package" with different import semantics
- Package names use underscores (`my_project`) while distribution names use hyphens (`my-project`) — these are the same project but referenced differently by `import` vs `pip`
