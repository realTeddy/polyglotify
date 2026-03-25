---
title: "Types & Type Systems"
language: "fortran"
feature: "types"
category: "basics"
applicable: true
---

Fortran has five intrinsic type categories: `INTEGER`, `REAL`, `COMPLEX`, `LOGICAL`, and `CHARACTER`. Each has a `KIND` parameter that selects the precision and storage size. Fortran 90 introduced derived types (user-defined record types). Fortran has no dynamic typing — all variables have a type fixed at compile time. The `iso_fortran_env` module provides portable kind constants (`INT32`, `INT64`, `REAL32`, `REAL64`).

## Example

```fortran
program types_demo
    use iso_fortran_env, only: int32, int64, real32, real64, real128
    implicit none

    ! Integer kinds
    integer(kind=int32) :: small_int   ! 32-bit, range ±2.1 billion
    integer(kind=int64) :: big_int     ! 64-bit, range ±9.2×10¹⁸

    ! Real kinds
    real(kind=real32)  :: single  = 3.14_real32   ! single precision
    real(kind=real64)  :: dbl     = 3.14_real64   ! double precision
    real(kind=real128) :: quad    = 3.14_real128  ! quad precision (if supported)

    ! Complex (pairs of reals)
    complex(kind=real64) :: z = (1.0_real64, -0.5_real64)

    ! Logical
    logical :: flag = .true.
    logical(kind=1) :: compact_flag   ! 1-byte logical

    ! Character
    character(len=10) :: short_str
    character(len=:), allocatable :: dyn_str   ! allocatable length (F2003+)

    ! Derived type (struct)
    type :: point_t
        real(real64) :: x, y
    end type

    type(point_t) :: p = point_t(1.0_real64, 2.0_real64)

    dyn_str = "dynamic"   ! allocates automatically with allocatable
    print *, p%x, p%y, z, flag
end program types_demo
```

## Gotchas

- Kind parameters without `iso_fortran_env` (e.g., `real(8)`) are compiler-specific — `real(8)` means 8 bytes of storage on gfortran but is not guaranteed by the standard.
- Literal constants must include a kind suffix for precision to be preserved: `3.14_real64` not `3.14` (which is single-precision on many compilers).
- `character(len=*)` is for dummy arguments accepting strings of any length; `character(len=:), allocatable` is the modern way to handle variable-length strings.
