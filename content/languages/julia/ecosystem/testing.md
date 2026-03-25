---
title: "Testing"
language: "julia"
feature: "testing"
category: "ecosystem"
applicable: true
---

Julia's standard test library is `Test`, providing `@test`, `@test_throws`, `@testset`, and `@test_approx_eq`. Tests are run with `Pkg.test()` or `julia test/runtests.jl`. `ReTest.jl` and `Jtest.jl` are community alternatives. For test-driven development, `Revise.jl` enables live code reloading.

## Example

```julia
# test/runtests.jl
using Test
using MyPackage   # or include the source

# Basic assertions
@test 1 + 1 == 2
@test sqrt(4.0) ≈ 2.0        # approximate equality
@test "hello"[1] == 'h'

# Test exceptions
@test_throws DomainError sqrt(-1.0)
@test_throws ArgumentError parse(Int, "abc")

# Organize with @testset
@testset "Arithmetic" begin
    @test 2^10 == 1024
    @test -7 ÷ 2 == -3
    @testset "Floating point" begin
        @test 0.1 + 0.2 ≈ 0.3 atol=1e-10
    end
end

@testset "String operations" begin
    s = "Hello, World!"
    @test length(s) == 13
    @test occursin("World", s)
    @test uppercase(s) == "HELLO, WORLD!"
end
```

```bash
# Run from the project root
julia --project test/runtests.jl

# Or via Pkg
julia -e 'import Pkg; Pkg.test()'
```

## Gotchas

- `≈` (`\approx`) uses a relative tolerance by default; specify `atol` for absolute tolerance.
- Failed tests in a `@testset` are reported but don't stop execution of the set — all tests run.
- Use `--project` flag to activate the project environment when running tests directly.
