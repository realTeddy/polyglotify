---
title: "Build Tools"
language: "julia"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Julia's primary build mechanism is **Pkg.jl** combined with optional `deps/build.jl` scripts for packages with compiled dependencies. **BinaryBuilder.jl** cross-compiles C/Fortran binaries for Julia packages. **PackageCompiler.jl** creates precompiled system images and standalone executables. CI is typically run with **GitHub Actions** using the `julia-actions/julia-runtest` workflow.

## Example

```bash
# Generate a new package
julia -e 'import Pkg; Pkg.generate("MyApp")'

# Instantiate (install all deps from Manifest.toml)
julia --project -e 'import Pkg; Pkg.instantiate()'

# Run tests
julia --project test/runtests.jl

# Build documentation (requires Documenter.jl)
julia --project docs/make.jl

# PackageCompiler: create a fast system image
# julia -e 'using PackageCompiler; create_sysimage([:DataFrames, :CSV], sysimage_path="sys.so")'
# julia -J sys.so my_script.jl

# Create a standalone app
# julia -e 'using PackageCompiler; create_app("MyApp", "build/MyApp")'
```

```julia
# deps/build.jl — runs when package is first installed
# (for packages that need to compile native extensions)
run(`make -C $(joinpath(@__DIR__, "lib"))`)
```

## Gotchas

- `deps/build.jl` runs during `Pkg.add` / `Pkg.build`; use `BinaryBuilder.jl` for cross-platform native code.
- First-time precompilation can be slow; `PackageCompiler.jl` solves this for deployment.
- `--project` is important when running scripts; without it Julia uses the global environment.
