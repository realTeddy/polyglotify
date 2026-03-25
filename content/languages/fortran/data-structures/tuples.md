---
title: "Tuples"
language: "fortran"
feature: "tuples"
category: "data-structures"
applicable: false
---

Fortran has no tuple type. The closest equivalent is a derived type with anonymous or named components, or simply returning multiple values via `INTENT(OUT)` subroutine arguments. Fortran 2003 allows derived types to be constructed inline with structure constructors, which resembles tuple construction syntax.

## Example

```fortran
module tuple_like
    implicit none

    ! Derived type as a named tuple
    type :: pair_t
        real :: first
        real :: second
    end type

    type :: stats_t
        real :: mean
        real :: std_dev
        real :: min_val
        real :: max_val
    end type

    contains

    ! Return a "tuple" as a derived type
    function minmax(arr) result(bounds)
        real, intent(in)  :: arr(:)
        type(pair_t)       :: bounds
        bounds%first  = minval(arr)
        bounds%second = maxval(arr)
    end function

    ! Multiple return values via INTENT(OUT) (subroutine style)
    subroutine compute_stats(data, m, sd)
        real, intent(in)  :: data(:)
        real, intent(out) :: m, sd
        m  = sum(data) / size(data)
        sd = sqrt(sum((data - m)**2) / size(data))
    end subroutine

end module tuple_like

program main
    use tuple_like
    implicit none

    real :: data(5) = [1.0, 2.0, 3.0, 4.0, 5.0]
    type(pair_t) :: bounds
    real :: m, sd

    ! Structure constructor (like a tuple literal)
    bounds = pair_t(0.0, 100.0)
    print *, bounds%first, bounds%second  ! 0.0  100.0

    bounds = minmax(data)
    print *, bounds%first, bounds%second  ! 1.0  5.0

    call compute_stats(data, m, sd)
    print *, m, sd
end program main
```

## Gotchas

- Derived type construction (`pair_t(a, b)`) is positional — components are initialized in the order they are declared; keyword syntax is also supported in Fortran 2003.
- There is no destructuring syntax — accessing fields always requires the `%` component-selection operator.
- Fortran's array-of-derived-types is the idiom for what other languages might call a list of tuples.
