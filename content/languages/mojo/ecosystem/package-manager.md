---
title: "Package Manager"
language: "mojo"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Mojo uses **Magic** (formerly `modular`) as its package and environment manager, built on the conda ecosystem. Packages are published to the **Modular registry** or conda-forge. Mojo can also use Python packages directly via its Python interop layer, giving access to the entire PyPI ecosystem. `magic` handles Mojo SDK versions, virtual environments, and dependencies.

## Example

```bash
# Install the Mojo SDK via Magic
curl -ssL https://magic.modular.com | bash

# Create a new project
magic init my_project --format mojoproject

# Add a dependency
magic add max          # MAX (Modular Accelerated Execution)
magic add numpy        # Python package via conda/pip

# Install dependencies
magic install

# Run a Mojo file
magic run mojo main.mojo

# Update dependencies
magic update
```

```toml
# mojoproject.toml
[project]
name    = "my_project"
version = "0.1.0"
channels = ["conda-forge", "https://conda.modular.com/max"]

[dependencies]
max    = ">=24.0.0,<25"
python = ">=3.9,<3.13"
numpy  = ">=1.26"
```

## Gotchas

- Magic is Mojo's primary tool as of 2024; earlier documentation may reference the `modular` CLI directly — they are equivalent.
- Python packages installed via `magic` are accessible through Mojo's `from python import Python` interop layer without any additional setup.
- Mojo's own package ecosystem is still small; most real projects rely heavily on Python packages for non-compute functionality.
