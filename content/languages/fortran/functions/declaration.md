---
title: "Function Declaration"
language: "fortran"
feature: "declaration"
category: "functions"
applicable: true
---

Fortran has two kinds of callable units: `FUNCTION` (returns a value) and `SUBROUTINE` (no return value, communicates via arguments). Both can be internal (contained in a `CONTAINS` block), external (separate compilation unit), or module procedures (inside a `MODULE`). Module procedures are the modern, preferred approach as they provide explicit interfaces and avoid many legacy pitfalls.

## Example

```fortran
module math_utils
    implicit none
    contains

    ! Function: returns a value
    pure function square(x) result(res)
        real, intent(in) :: x
        real             :: res
        res = x * x
    end function square

    ! Subroutine: no return value
    subroutine swap(a, b)
        real, intent(inout) :: a, b
        real :: tmp
        tmp = a; a = b; b = tmp
    end subroutine swap

    ! Recursive function requires RECURSIVE keyword
    recursive function factorial(n) result(res)
        integer, intent(in) :: n
        integer             :: res
        if (n <= 1) then
            res = 1
        else
            res = n * factorial(n - 1)
        end if
    end function factorial

end module math_utils

program main
    use math_utils, only: square, swap, factorial
    implicit none

    real    :: a = 3.0, b = 5.0
    integer :: n

    print *, square(4.0)     ! 16.0
    call swap(a, b)
    print *, a, b            ! 5.0  3.0
    print *, factorial(6)    ! 720
end program main
```

## Gotchas

- External functions (not in a module or `CONTAINS`) require an explicit `INTERFACE` block in the caller to allow the compiler to check argument types — a common source of hard-to-find bugs.
- The `RECURSIVE` keyword is required for recursive functions; forgetting it allows the compiler to assume non-recursion and apply optimizations that break recursive calls.
- `pure` functions (no side effects) and `elemental` functions (operate element-wise on arrays) provide important optimization hints and constraints.
