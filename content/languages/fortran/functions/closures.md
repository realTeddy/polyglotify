---
title: "Closures & Lambdas"
language: "fortran"
feature: "closures"
category: "functions"
applicable: false
---

Fortran has no closures or lambdas. Functions cannot capture enclosing variables. Fortran 2003 introduced procedure pointers and procedure dummy arguments, which allow passing functions as arguments — but without environment capture. The equivalent of a closure is a module-level variable (shared state) combined with an internal or module procedure, or the use of a derived type with a procedure component (Fortran 2003+).

## Example

```fortran
! Passing a function as an argument (not a closure — no capture)
module numerical
    implicit none
    contains

    function integrate(f, a, b, n) result(result)
        interface
            real function f(x)
                real, intent(in) :: x
            end function
        end interface
        real, intent(in) :: a, b
        integer, intent(in) :: n
        real :: result
        real :: h, x
        integer :: i

        h = (b - a) / n
        result = 0.0
        do i = 1, n
            x = a + (i - 0.5) * h
            result = result + f(x) * h
        end do
    end function

end module numerical

program main
    use numerical
    implicit none

    ! Pass a named function — no capture of any variable
    print *, integrate(my_func, 0.0, 3.14159, 1000)

    contains

    real function my_func(x)
        real, intent(in) :: x
        my_func = sin(x)
    end function

end program main
```

## Gotchas

- Fortran procedure pointers and dummy procedure arguments do not carry environment — they point to named procedures only.
- The "internal procedure + module variable" pattern can simulate closure-like behavior but the captured state is global to the module, not per-call.
- Fortran 2003 derived types with procedure components (`procedure(f), pointer :: fp`) allow object-method-like patterns but still do not capture lexical scope.
