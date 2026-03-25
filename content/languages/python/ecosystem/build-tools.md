---
title: "Build Tools"
language: "python"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Python projects are built into distributable packages (sdist and wheel) using a build backend declared in `pyproject.toml`. Common backends include `setuptools`, `hatchling`, `flit`, and `poetry-core`. The `build` tool (or `uv build`) invokes the backend and produces artifacts for uploading to PyPI via `twine` or `uv publish`.

## Example

```bash
# Install build tools
pip install build twine

# Build source distribution and wheel
python -m build
# Produces: dist/my_project-0.1.0.tar.gz
#           dist/my_project-0.1.0-py3-none-any.whl

# Upload to PyPI
twine upload dist/*

# Upload to TestPyPI first
twine upload --repository testpypi dist/*

# --- uv (modern alternative) ---
uv build
uv publish

# --- Linting and formatting (not build, but part of CI pipeline) ---
pip install ruff mypy
ruff check src/          # fast linter (replaces flake8, isort, etc.)
ruff format src/         # formatter (replaces black)
mypy src/                # static type checking
```

```toml
# pyproject.toml — hatchling backend example
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.11"

[tool.hatch.build.targets.wheel]
packages = ["src/my_project"]
```

## Gotchas

- `python setup.py install` is deprecated — always use `pip install .` or `python -m build` instead
- A universal wheel (`py3-none-any.whl`) works for pure Python packages; packages with C extensions need platform-specific wheels built with tools like `cibuildwheel`
- Version strings must follow PEP 440 (`1.0.0`, `1.0.0a1`, `1.0.0.post1`) — arbitrary version strings may be rejected by PyPI or pip
