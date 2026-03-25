---
title: "Operators"
language: "fortran"
feature: "operators"
category: "basics"
applicable: true
---

Fortran uses standard mathematical symbols for arithmetic (`+`, `-`, `*`, `/`, `**` for exponentiation) and named operators for logical operations (`.AND.`, `.OR.`, `.NOT.`, `.EQV.`, `.NEQV.`). Comparison operators use either the traditional Fortran spelling (`.EQ.`, `.NE.`, `.LT.`, `.LE.`, `.GT.`, `.GE.`) or the modern C-style symbols (`==`, `/=`, `<`, `<=`, `>`, `>=`). String concatenation uses `//`.

## Example

```fortran
program operators_demo
    implicit none

    integer :: a = 10, b = 3, result
    real    :: x = 2.0, y
    logical :: p = .true., q = .false., flag
    character(len=20) :: s

    ! Arithmetic
    result = a + b    ! 13
    result = a - b    ! 7
    result = a * b    ! 30
    result = a / b    ! 3  (integer division — truncates)
    result = mod(a, b)! 1  (modulo is a function, not an operator)
    y      = x ** 3   ! 8.0 (exponentiation)

    ! Comparison (both styles are valid)
    flag = (a > b)           ! .true.
    flag = (a == b)          ! .false.
    flag = (a /= b)          ! .true.  (/= is not-equal)
    flag = (a .ge. 10)       ! .true.  (legacy spelling)

    ! Logical operators
    flag = p .and. q         ! .false.
    flag = p .or.  q         ! .true.
    flag = .not. p           ! .false.
    flag = p .eqv. q         ! .false.  (logical equivalence)
    flag = p .neqv. q        ! .true.   (exclusive or)

    ! String concatenation
    s = "Hello" // ", " // "Fortran"   ! "Hello, Fortran"

    print *, result, flag, s
end program operators_demo
```

## Gotchas

- Integer division truncates toward zero: `-7/2 = -3`, not `-4`.
- The `**` operator (exponentiation) has higher precedence than unary minus: `-2**2 = -(2**2) = -4`, not `4`.
- There is no short-circuit evaluation guaranteed for `.AND.` and `.OR.` in standard Fortran — both sides may be evaluated even if the first determines the result.
