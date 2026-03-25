---
title: "Control Flow"
language: "fortran"
feature: "control-flow"
category: "basics"
applicable: true
---

Fortran control flow includes `IF/ELSE IF/ELSE/END IF`, `SELECT CASE`, `DO` loops (counted, `DO WHILE`, and infinite with `EXIT`/`CYCLE`), and `GO TO` (strongly discouraged in modern code). Fortran's `DO` loop is a definitive counted loop with start, stop, and stride. Loops and conditionals can have optional labels for targeted `EXIT` and `CYCLE` in nested structures.

## Example

```fortran
program control_flow_demo
    implicit none
    integer :: i, n = 10, total = 0, x = 7

    ! IF / ELSE IF / ELSE
    if (x > 10) then
        print *, "greater"
    else if (x > 5) then
        print *, "middle"    ! prints this
    else
        print *, "small"
    end if

    ! Inline IF (single statement, no THEN/END IF needed)
    if (x < 0) print *, "negative"

    ! SELECT CASE
    select case (x)
        case (1)
            print *, "one"
        case (2:5)
            print *, "two to five"
        case (6:)
            print *, "six or more"   ! prints this
        case default
            print *, "other"
    end select

    ! DO loop (counted, like for)
    do i = 1, n
        total = total + i
    end do
    print *, "Sum:", total  ! 55

    ! DO loop with stride
    do i = 10, 1, -2
        print *, i          ! 10, 8, 6, 4, 2
    end do

    ! DO WHILE
    i = 1
    do while (i <= 5)
        i = i + 1
    end do

    ! Infinite loop with EXIT and CYCLE
    outer: do i = 1, 100
        if (mod(i, 2) == 0) cycle outer  ! skip even numbers
        if (i > 9) exit outer            ! stop at 9
        print *, i                        ! 1 3 5 7 9
    end do outer
end program control_flow_demo
```

## Gotchas

- The `DO` loop variable must not be modified inside the loop body — doing so is undefined behavior in standard Fortran.
- `SELECT CASE` works on integers, characters, and logicals but not on reals.
- Labeled `EXIT` and `CYCLE` target the named loop, not the innermost one — useful for breaking out of nested loops cleanly.
