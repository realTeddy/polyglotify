---
title: "Package Manager"
language: "python"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Python's standard package manager is `pip`, which installs packages from PyPI. Modern projects use `pip` together with virtual environments (`venv`) or all-in-one tools like `uv` (fast, Rust-based), `poetry`, or `pipenv` that handle dependency resolution, locking, and virtual environments in one workflow.

## Example

```bash
# Create and activate a virtual environment (standard library)
python -m venv .venv
source .venv/bin/activate        # Linux/macOS
.venv\Scripts\activate           # Windows

# Install packages
pip install requests
pip install "fastapi>=0.100,<1.0"

# Freeze and restore dependencies
pip freeze > requirements.txt
pip install -r requirements.txt

# --- uv (modern, fast alternative) ---
# Install uv
pip install uv

# Create venv and install
uv venv
uv pip install requests

# --- poetry ---
poetry new my-project
poetry add requests
poetry add --group dev pytest
poetry install          # installs from poetry.lock
poetry run python main.py

# --- pipenv ---
pipenv install requests
pipenv run python main.py
```

```toml
# pyproject.toml (PEP 517/518 — the modern standard)
[project]
name = "my-app"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = ["requests>=2.31", "pydantic>=2.0"]

[project.optional-dependencies]
dev = ["pytest", "mypy", "ruff"]
```

## Gotchas

- Always work inside a virtual environment — installing packages globally pollutes the system Python and causes version conflicts across projects
- `pip freeze` captures all transitive dependencies, making `requirements.txt` brittle for sharing; use `pip-tools` or `poetry`/`uv` for proper lock files
- PyPI package names are case-insensitive and normalise `-` and `_`, but import names are not — `pip install Pillow` but `import PIL`
