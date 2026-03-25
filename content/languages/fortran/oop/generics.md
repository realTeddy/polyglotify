---
title: "Generics"
language: "fortran"
feature: "generics"
category: "oop"
applicable: false
---

Standard Fortran (up to Fortran 2018) has no generics in the modern sense. The traditional workaround is to use preprocessor macros (cpp) to generate type-specific versions, or to use generic interfaces that dispatch to type-specific implementations. **Fortran 2023** (the newest standard) introduces **templates** as a true generics mechanism, but compiler support as of 2025 is early-stage. Generic interfaces provide overloading but not parameterization.

## Example

```fortran
! Fortran's traditional generics workaround: generic interface + type-specific implementations

module generic_max
    implicit none

    interface my_max
        module procedure max_int, max_real, max_double
    end interface

    contains

    pure integer function max_int(a, b)
        integer, intent(in) :: a, b
        max_int = merge(a, b, a > b)
    end function

    pure real function max_real(a, b)
        real, intent(in) :: a, b
        max_real = merge(a, b, a > b)
    end function

    pure double precision function max_double(a, b)
        double precision, intent(in) :: a, b
        max_double = merge(a, b, a > b)
    end function

end module generic_max

program main
    use generic_max
    implicit none

    print *, my_max(3, 5)          ! 5        (dispatches to max_int)
    print *, my_max(3.0, 5.0)     ! 5.0      (dispatches to max_real)
    print *, my_max(3.0d0, 5.0d0) ! 5.0      (dispatches to max_double)
end program main
```

## Gotchas

- The generic interface approach requires writing N separate implementations for N types — it is overloading, not true parametric polymorphism.
- Fortran 2023 templates (`TEMPLATE ... END TEMPLATE`) provide true generics, but gfortran and Intel Fortran support is incomplete as of early 2026.
- The preprocessor (cpp) with `#define KIND 8` and `#include` of a template file is the practical workaround used in many scientific Fortran codebases today.
