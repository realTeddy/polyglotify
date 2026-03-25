---
title: "Parameters & Arguments"
language: "fortran"
feature: "parameters"
category: "functions"
applicable: true
---

Fortran passes arguments by reference by default — the callee receives the memory address of each argument. Intent attributes (`INTENT(IN)`, `INTENT(OUT)`, `INTENT(INOUT)`) declare the intended use and allow the compiler to enforce correctness. Fortran 90+ supports optional arguments (`OPTIONAL`) and keyword (named) arguments, which are only available for procedures with explicit interfaces (module procedures or internal procedures).

## Example

```fortran
module param_demo
    implicit none
    contains

    subroutine greet(name, greeting, times)
        character(len=*), intent(in)           :: name
        character(len=*), intent(in), optional :: greeting
        integer,          intent(in), optional :: times

        character(len=20) :: msg
        integer           :: n, i

        msg = merge(greeting, "Hello", present(greeting))
        n   = merge(times, 1, present(times))

        do i = 1, n
            print *, trim(msg) // ", " // trim(name) // "!"
        end do
    end subroutine greet

    subroutine stats(data, mean, std_dev)
        real, intent(in)  :: data(:)     ! assumed-shape array
        real, intent(out) :: mean
        real, intent(out), optional :: std_dev

        mean = sum(data) / size(data)
        if (present(std_dev)) then
            std_dev = sqrt(sum((data - mean)**2) / size(data))
        end if
    end subroutine stats

end module param_demo

program main
    use param_demo
    implicit none
    real :: data(5) = [1.0, 2.0, 3.0, 4.0, 5.0]
    real :: m, sd

    call greet("Fortran")                       ! Hello, Fortran!
    call greet("World", greeting="Hi", times=2) ! keyword args
    call stats(data, m, sd)
    print *, "Mean:", m, "StdDev:", sd
end program main
```

## Gotchas

- `INTENT(IN)` arguments passed by reference — the caller's variable is not copied. The compiler prevents the callee from writing to them, but the memory is shared.
- Optional arguments must be checked with `PRESENT()` before being read; accessing an absent optional argument is undefined behavior.
- Assumed-shape arrays (`data(:)`) require an explicit interface in the caller — they cannot be used with external procedures without an `INTERFACE` block.
