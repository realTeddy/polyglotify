---
title: "Sets"
language: "fortran"
feature: "sets"
category: "data-structures"
applicable: false
---

Fortran has no set data type. Set-like operations on arrays are performed using array intrinsics and masking. The `PACK` intrinsic extracts elements satisfying a logical mask. The `ANY` and `ALL` intrinsics test whether any or all elements satisfy a condition. For explicit set operations (union, intersection, difference), loops or the `MERGE` intrinsic are used. The stdlib-fortran community project is working toward richer collection types.

## Example

```fortran
program set_demo
    implicit none

    integer :: a(6) = [1, 2, 3, 4, 5, 6]
    integer :: b(4) = [3, 4, 5, 7]
    logical :: mask(6)
    integer, allocatable :: result(:)
    integer :: i, j
    logical :: found

    ! Test membership: is 4 in array a?
    print *, any(a == 4)   ! .true.

    ! Intersection (elements in both a and b)
    ! using a logical mask
    mask = .false.
    do i = 1, size(a)
        found = .false.
        do j = 1, size(b)
            if (a(i) == b(j)) found = .true.
        end do
        mask(i) = found
    end do
    result = pack(a, mask)
    print *, result   ! 3 4 5

    ! Difference: elements in a not in b
    mask = .true.
    do i = 1, size(a)
        if (any(b == a(i))) mask(i) = .false.
    end do
    result = pack(a, mask)
    print *, result   ! 1 2 6

    ! Remove duplicates from an array
    ! (Fortran has no built-in unique — requires manual logic)

end program set_demo
```

## Gotchas

- These array-based set operations are O(n*m) — fine for small scientific datasets, but not suitable for large-scale data processing.
- There is no hash-based set in the standard library; the stdlib-fortran `stdlib_sets` module is in development.
- For sorted arrays, Fortran's `merge_sort` (user-written) plus a unique-filter pass is the idiomatic approach for deduplication.
