---
title: "Return Values"
language: "fortran"
feature: "return-values"
category: "functions"
applicable: true
---

Fortran functions return a single value. The return type is declared on the `FUNCTION` statement or via a separate type declaration. The `RESULT` clause allows naming the return variable differently from the function name (required for recursive functions to avoid ambiguity). Subroutines return nothing; multiple values are passed back through `INTENT(OUT)` arguments. Arrays and derived types can be returned from functions.

## Example

```fortran
module return_demo
    use iso_fortran_env, only: real64
    implicit none
    contains

    ! Simple function — return type declared inline
    real function area_circle(r)
        real, intent(in) :: r
        area_circle = 3.14159265 * r * r
    end function

    ! RESULT clause — modern style
    function linspace(start, stop, n) result(arr)
        real(real64), intent(in) :: start, stop
        integer,      intent(in) :: n
        real(real64) :: arr(n)
        integer      :: i
        do i = 1, n
            arr(i) = start + (stop - start) * real(i-1, real64) / real(n-1, real64)
        end do
    end function

    ! Return a derived type
    type :: vector2_t
        real :: x, y
    end type

    function vec_add(a, b) result(c)
        type(vector2_t), intent(in) :: a, b
        type(vector2_t)             :: c
        c%x = a%x + b%x
        c%y = a%y + b%y
    end function

end module return_demo

program main
    use return_demo
    implicit none
    real(real64) :: pts(5)
    type(vector2_t) :: v1 = vector2_t(1.0, 2.0)
    type(vector2_t) :: v2 = vector2_t(3.0, 4.0)
    type(vector2_t) :: v3

    print *, area_circle(5.0)       ! ~78.54
    pts = linspace(0.0_real64, 1.0_real64, 5)
    print *, pts                    ! 0.0 0.25 0.5 0.75 1.0
    v3 = vec_add(v1, v2)
    print *, v3%x, v3%y            ! 4.0  6.0
end program main
```

## Gotchas

- Without the `RESULT` clause, the function name itself acts as the return variable; assigning to it inside the function sets the return value — do not use it for anything else.
- Functions that return arrays must either have fixed-size array results or use `ALLOCATABLE` result variables (Fortran 2003+).
- A `SUBROUTINE` called with `CALL` cannot appear in an expression; a `FUNCTION` can. Choose the right form for the use case.
