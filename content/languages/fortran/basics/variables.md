---
title: "Variables & Declaration"
language: "fortran"
feature: "variables"
category: "basics"
applicable: true
---

Fortran variables are declared at the top of a program unit with a type keyword followed by the variable name. The `IMPLICIT NONE` statement (strongly recommended) disables implicit typing — without it, variables starting with I–N are implicitly `INTEGER` and all others `REAL`. Modern Fortran (Fortran 90+) supports `::` syntax, initializers, and the `PARAMETER` attribute for constants.

## Example

```fortran
program variables_demo
    implicit none   ! Always use this — disables implicit typing

    ! Basic declarations
    integer            :: count = 0
    real               :: pi = 3.14159265
    real(kind=8)       :: precision_val = 2.71828182845904523d0  ! double
    complex            :: z = (1.0, 2.0)   ! 1 + 2i
    logical            :: is_valid = .false.
    character(len=20)  :: name = "Fortran"

    ! Named constant (immutable)
    real, parameter :: G = 9.81

    ! Multiple declarations on one line
    integer :: i, j, k

    count = 42
    name = "Hello, World"
    i = 1; j = 2; k = 3   ! semicolons allowed in free-format

    print *, count, name, pi
end program variables_demo
```

## Gotchas

- Without `IMPLICIT NONE`, a typo in a variable name silently creates a new variable instead of raising an error — a major source of bugs in legacy Fortran.
- Integer division is exact: `3/2 = 1`, not `1.5`. Mixing integer and real in an expression promotes to real, but `3/2` is evaluated as integer before promotion.
- `real(kind=8)` is a double-precision float on most compilers (64-bit), but the mapping of kind numbers to byte widths is compiler-defined; use `selected_real_kind` or `iso_fortran_env` for portability.
