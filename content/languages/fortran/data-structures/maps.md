---
title: "Maps & Dictionaries"
language: "fortran"
feature: "maps"
category: "data-structures"
applicable: false
---

Fortran has no built-in map or dictionary. Fortran is a scientific computing language whose standard library provides mathematical and array operations, not general-purpose data structures. Keyed lookup is typically done with sorted arrays and binary search (`minloc`/`maxloc`), or by calling C interop routines. The `iso_c_binding` module enables calling C hash-map libraries. Community libraries such as stdlib-fortran (fpm package) provide associative arrays.

## Example

```fortran
! Approach: sorted key-value arrays with binary search
program map_demo
    implicit none

    ! Parallel arrays simulate a map (key → value)
    character(len=10) :: keys(4)   = ["alpha     ", "beta      ", &
                                       "gamma     ", "delta     "]
    integer           :: values(4) = [1, 2, 3, 4]

    ! Lookup by linear search
    integer :: i, found_val
    character(len=10) :: target = "gamma     "

    found_val = -1
    do i = 1, size(keys)
        if (trim(keys(i)) == trim(target)) then
            found_val = values(i)
            exit
        end if
    end do

    if (found_val /= -1) then
        print *, "Found:", found_val    ! 3
    else
        print *, "Not found"
    end if

    ! C interop approach for a real hash map:
    ! use iso_c_binding
    ! interface
    !   type(c_ptr) function c_hashmap_new() bind(c, name='hashmap_new')
    !   end function
    ! end interface

end program map_demo
```

## Gotchas

- The stdlib-fortran project (`https://stdlib.fortran-lang.org`) is adding a `stdlib_hashmaps` module, but it is not part of the ISO standard.
- For scientific workloads, maps are rarely needed — numerical data is typically indexed by position, not by string keys.
- C interop via `iso_c_binding` is well-supported in modern Fortran and is the practical solution when hash maps are genuinely required.
