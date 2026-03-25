---
title: "Exceptions & Try/Catch"
language: "fortran"
feature: "exceptions"
category: "error-handling"
applicable: false
---

Fortran has no exceptions or try/catch. Error handling is done through optional `STAT` and `ERRMSG` arguments on memory operations (`ALLOCATE`, `DEALLOCATE`), the `IOSTAT` specifier on I/O statements, and `STAT=` on `MOVE_ALLOC`. Runtime errors (out-of-bounds access, floating-point exceptions) are handled by the IEEE floating-point exception module (`ieee_exceptions`) or by the operating system (signal handlers). Application-level errors are propagated via integer status arguments.

## Example

```fortran
program error_handling_demo
    use iso_fortran_env, only: error_unit
    use ieee_exceptions
    implicit none

    real, allocatable :: arr(:)
    integer :: stat
    character(len=200) :: errmsg
    real :: x, result

    ! ALLOCATE with error checking
    allocate(arr(1000000000), stat=stat, errmsg=errmsg)
    if (stat /= 0) then
        write(error_unit, *) "Allocation failed:", trim(errmsg)
        stop 1
    end if

    ! I/O with IOSTAT
    open(unit=10, file="data.txt", status="old", &
         action="read", iostat=stat)
    if (stat /= 0) then
        write(error_unit, '(a,i0)') "Cannot open file, IOSTAT=", stat
        stop 2
    end if
    close(10)

    ! IEEE floating-point exceptions
    call ieee_set_halting_mode(ieee_divide_by_zero, .false.)  ! don't halt on /0
    x = 0.0
    result = 1.0 / x          ! returns +Infinity, no halt
    print *, ieee_is_nan(result), result

    deallocate(arr, stat=stat)
end program error_handling_demo
```

## Gotchas

- Without `IOSTAT=`, any I/O error terminates the program immediately — you must use `IOSTAT` on every I/O statement that might fail in production code.
- `STOP integer` sets the process exit code; `STOP "message"` prints a message (behavior is processor-dependent in older standards).
- The `ieee_exceptions` module is part of Fortran 2003 but is not supported by all compilers; check with `-ffpe-trap` flags (gfortran) for floating-point trap control.
