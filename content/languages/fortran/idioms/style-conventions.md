---
title: "Style Conventions"
language: "fortran"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Modern Fortran style uses free-format source (`.f90` extension), `IMPLICIT NONE` in every program unit, lowercase keywords, `_kind` suffixes on literal constants, and modules for all shared code. Variable names use `snake_case`; type names use `snake_case_t` suffix by convention. The `END SUBROUTINE name` / `END FUNCTION name` (named end) style is preferred for readability. Comments use `!`.

## Example

```fortran
! modern_style.f90 — demonstrates Fortran style conventions
module thermodynamics
    use iso_fortran_env, only: real64
    implicit none   ! mandatory in every program unit
    private         ! default to private; export explicitly

    real(real64), parameter, public :: R_GAS = 8.314_real64  ! J/(mol·K)

    type, public :: ideal_gas_t
        real(real64) :: pressure    = 0.0_real64  ! Pa
        real(real64) :: volume      = 0.0_real64  ! m³
        real(real64) :: temperature = 273.15_real64  ! K
        real(real64) :: moles       = 1.0_real64
    contains
        procedure :: pv_work => calc_pv_work
    end type ideal_gas_t

    contains

    ! Named end — always include the procedure name
    pure real(real64) function calc_pv_work(self, delta_v) result(work)
        class(ideal_gas_t), intent(in) :: self
        real(real64),       intent(in) :: delta_v
        work = self%pressure * delta_v
    end function calc_pv_work

end module thermodynamics

program main
    use thermodynamics, only: ideal_gas_t, R_GAS
    implicit none

    type(ideal_gas_t) :: gas
    real(real64)      :: work

    gas = ideal_gas_t(pressure=101325.0_real64, &
                      volume=0.02_real64,        &
                      temperature=300.0_real64,  &
                      moles=1.0_real64)

    work = gas%pv_work(0.001_real64)
    print '(a, es12.4)', "PV work: ", work

end program main
```

## Gotchas

- Legacy fixed-format Fortran (`.f` extension, columns 7–72) is still encountered in HPC codebases; free-format (`.f90`) is the modern standard but both are fully supported by current compilers.
- Kind suffixes on literals (`3.14_real64`) are essential for correctness — `3.14` alone is a single-precision constant on most compilers, silently losing precision.
- Continuation lines in free-format use `&` at the end of the line being continued; the `&` at the start of the next line (optional) aligns the continued expression visually.
