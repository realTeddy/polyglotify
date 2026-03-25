---
title: "Common Patterns"
language: "fortran"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Fortran idioms center on array programming. Key patterns include: whole-array expressions instead of explicit loops, `WHERE`/`FORALL`/`DO CONCURRENT` for conditional and parallel array operations, the module pattern for encapsulation, `ALLOCATABLE` arrays for dynamic data, and `ASSOCIATE` for renaming deeply nested expressions. The `RESHAPE` + array constructor pattern initializes multi-dimensional arrays concisely.

## Example

```fortran
program fortran_idioms
    use iso_fortran_env, only: real64
    implicit none

    real(real64) :: a(1000), b(1000), c(1000)
    integer      :: i

    ! Whole-array operations (preferred over explicit loops)
    a = [(real(i, real64), i=1,1000)]   ! initialize
    b = a * 2.0_real64                  ! scale
    c = a + b                           ! element-wise add
    print *, sum(c), maxval(c), minloc(c)

    ! WHERE for masked operations
    where (a > 500)
        c = sqrt(a)
    elsewhere
        c = 0.0_real64
    end where

    ! ASSOCIATE for readable deep access
    block
        real(real64), target :: matrix(3,3)
        real(real64), pointer :: row1(:)

        matrix = reshape([1,2,3,4,5,6,7,8,9]*1.0d0, [3,3])

        associate(m => matrix, s => sum(matrix))
            print *, "Total:", s
            print *, "Diagonal:", m(1,1), m(2,2), m(3,3)
        end associate
    end block

    ! Array constructor with implied DO
    block
        integer :: squares(10)
        squares = [(i**2, i=1,10)]
        print *, squares   ! 1 4 9 16 25 36 49 64 81 100
    end block

end program fortran_idioms
```

## Gotchas

- Avoid explicit loops when whole-array operations exist — the compiler can auto-vectorize and the code is more readable.
- `FORALL` is deprecated in Fortran 2018 in favor of `DO CONCURRENT`, which has clearer semantics and better optimization support.
- `ASSOCIATE` introduces a block scope; variables declared inside `BLOCK`/`END BLOCK` are local to that block — useful for managing temporary allocations.
