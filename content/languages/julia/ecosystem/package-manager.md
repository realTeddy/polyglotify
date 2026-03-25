---
title: "Package Manager"
language: "julia"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Julia's built-in package manager is **Pkg.jl**, accessible via the `]` REPL mode or the `Pkg` module. It manages environments (isolated project-specific package sets), registries, and package versions. The **General Registry** is the main public registry. Environments are defined by `Project.toml` and `Manifest.toml` files.

## Example

```julia
# In the Julia REPL, press ] to enter Pkg mode:
# pkg> add DataFrames          # install
# pkg> add CSV@0.10            # specific version
# pkg> remove CSV              # uninstall
# pkg> update                  # update all
# pkg> status                  # list installed
# pkg> activate .              # use local project environment
# pkg> instantiate             # install deps from Manifest.toml

# Using Pkg programmatically
import Pkg
Pkg.add("DataFrames")
Pkg.add(["CSV", "Plots"])
Pkg.update("DataFrames")
Pkg.rm("CSV")

# Create and activate a new environment
Pkg.activate("my_project")
Pkg.add("HTTP")

# Use installed packages
using DataFrames
df = DataFrame(name=["Alice","Bob"], age=[30,25])
println(df)
```

## Gotchas

- Each Julia project should have its own environment (activate with `]activate .`) to avoid version conflicts.
- `Project.toml` lists direct dependencies; `Manifest.toml` pins exact versions of the full dependency tree — commit both.
- Julia 1.6+ supports precompilation caching; first-use compilation latency is reduced but not eliminated.
