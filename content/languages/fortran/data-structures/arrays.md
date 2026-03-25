---
title: "Arrays & Lists"
language: "fortran"
feature: "arrays"
category: "data-structures"
applicable: true
---

Arrays are Fortran's most powerful data structure and a core strength of the language. Fortran arrays are **column-major** (leftmost index varies fastest), support up to 15 dimensions, and have array-wide arithmetic operations built into the syntax. Arrays can be static (fixed size), `ALLOCATABLE` (heap-allocated), or `POINTER` (aliased). Array sections (`a(2:5)`), array constructors (`[1,2,3]`), and intrinsic functions (`sum`, `product`, `matmul`, `reshape`, `transpose`) make array code concise and readable.

## Example

```fortran
program arrays_demo
    implicit none

    ! Static arrays
    real :: v(5) = [1.0, 2.0, 3.0, 4.0, 5.0]
    real :: mat(3,3) = reshape([1,2,3,4,5,6,7,8,9], [3,3])

    ! Allocatable array
    real, allocatable :: dyn(:)
    integer :: n = 10

    ! Array-wide operations (no explicit loop needed)
    print *, v * 2            ! [2.0, 4.0, 6.0, 8.0, 10.0]
    print *, sum(v)           ! 15.0
    print *, maxval(v)        ! 5.0
    print *, v(2:4)           ! section: [2.0, 3.0, 4.0]
    print *, v([1,3,5])       ! vector subscript: [1.0, 3.0, 5.0]

    ! WHERE for conditional array operations
    where (v > 3.0)
        v = v * 10
    elsewhere
        v = 0.0
    end where

    ! Allocatable
    allocate(dyn(n))
    dyn = [(real(i), i=1,n)]  ! implied DO list constructor
    print *, sum(dyn)         ! 55.0
    deallocate(dyn)

    ! Matrix operations
    print *, matmul(mat, mat)     ! matrix multiply
    print *, transpose(mat)

end program arrays_demo
```

## Gotchas

- Fortran arrays are **1-based** by default. Custom lower bounds are supported: `real :: a(0:9)` is a 10-element array with indices 0–9.
- Column-major storage means that `a(i,j)` iterates columns in the inner loop for cache efficiency — the opposite of C's row-major order.
- Passing an array section to a procedure may create a temporary copy (called a "copy-in/copy-out"); this can impact performance and change observable behavior with side effects.
