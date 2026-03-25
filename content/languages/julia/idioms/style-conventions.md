---
title: "Style Conventions"
language: "julia"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Julia style follows the official Julia Style Guide: `snake_case` for variables and functions, `CamelCase` for types and modules, `ALL_CAPS` for constants, `!` suffix for mutating functions. Lines should be under 92 characters. `JuliaFormatter.jl` is the standard auto-formatter. Type annotations in function signatures are encouraged but not required.

## Example

```julia
# Naming conventions
module MyModule

const MAX_ITERATIONS = 1000      # constant: ALL_CAPS

abstract type AbstractSolver end  # type: CamelCase

mutable struct LinearSolver <: AbstractSolver  # type: CamelCase
    tolerance::Float64
    max_iter::Int                  # field: snake_case
end

# Function: snake_case
function solve(s::LinearSolver, A::Matrix, b::Vector)
    # ...
    return nothing
end

# Mutating function: trailing !
function reset!(s::LinearSolver)
    s.tolerance = 1e-6
    s.max_iter = MAX_ITERATIONS
end

# Short functions: compact form
is_converged(residual, tol) = residual < tol

end  # module
```

```toml
# .JuliaFormatter.toml
style = "blue"    # "blue" style is a popular opinionated preset
```

## Gotchas

- Type parameters use short uppercase letters by convention: `T`, `K`, `V`, `N`.
- Avoid unnecessary type annotations in function bodies; let Julia infer where possible.
- `JuliaFormatter.jl` with `style = "blue"` is widely used in the community; configure CI to enforce it.
