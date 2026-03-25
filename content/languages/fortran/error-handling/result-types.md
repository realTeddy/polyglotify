---
title: "Result Types"
language: "fortran"
feature: "result-types"
category: "error-handling"
applicable: false
---

Fortran has no result type (Option/Result monad). The idiomatic equivalent is to return an integer status code via an `INTENT(OUT)` parameter (mimicking the POSIX/IOSTAT convention) or to return the status as the function's return value with the actual result as an output argument. Some modern Fortran libraries define derived types that carry both a value and a status code, but this is not standardized.

## Example

```fortran
module result_pattern
    implicit none

    ! Simulate Result<real, integer> with a derived type
    type :: result_real_t
        real    :: value = 0.0
        integer :: status = 0         ! 0 = ok, nonzero = error
        character(len=80) :: message = ""
    end type

    contains

    function safe_sqrt(x) result(res)
        real, intent(in) :: x
        type(result_real_t) :: res

        if (x < 0.0) then
            res%status  = -1
            res%message = "Cannot take sqrt of negative number"
        else
            res%value   = sqrt(x)
            res%status  = 0
        end if
    end function

    ! Idiomatic Fortran: IOSTAT-style output argument
    subroutine safe_divide(a, b, result, stat)
        real,    intent(in)  :: a, b
        real,    intent(out) :: result
        integer, intent(out) :: stat

        if (b == 0.0) then
            stat   = 1
            result = 0.0
        else
            stat   = 0
            result = a / b
        end if
    end subroutine

end module result_pattern

program main
    use result_pattern
    implicit none

    type(result_real_t) :: r
    real :: q
    integer :: s

    r = safe_sqrt(-4.0)
    if (r%status /= 0) then
        print *, "Error:", trim(r%message)
    else
        print *, "sqrt =", r%value
    end if

    call safe_divide(10.0, 0.0, q, s)
    if (s /= 0) print *, "Division error"
end program main
```

## Gotchas

- Returning a status code as an output argument is convention — the compiler does not enforce that callers check it.
- The derived-type Result pattern requires the caller to check `%status` explicitly; there is no `?` operator or monadic chaining.
- Fortran's `STOP` with a non-zero argument is the equivalent of panicking — it terminates the program with an exit code.
