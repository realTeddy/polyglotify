---
title: "Structs & Classes"
language: "fortran"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Fortran 90 introduced **derived types** (`TYPE` ... `END TYPE`), which are the equivalent of structs. Fortran 2003 extended derived types with bound procedures (methods), access modifiers (`PUBLIC`/`PRIVATE`), inheritance (`EXTENDS`), and polymorphism — making them the basis for object-oriented Fortran. Components are accessed with the `%` operator.

## Example

```fortran
module geometry
    use iso_fortran_env, only: real64
    implicit none
    private   ! everything private by default

    type, public :: vector3_t
        real(real64) :: x = 0.0_real64
        real(real64) :: y = 0.0_real64
        real(real64) :: z = 0.0_real64
    contains
        procedure :: length  => vec_length
        procedure :: dot     => vec_dot
        procedure :: print   => vec_print
    end type

    contains

    pure function vec_length(self) result(l)
        class(vector3_t), intent(in) :: self
        real(real64) :: l
        l = sqrt(self%x**2 + self%y**2 + self%z**2)
    end function

    pure function vec_dot(self, other) result(d)
        class(vector3_t), intent(in) :: self, other
        real(real64) :: d
        d = self%x*other%x + self%y*other%y + self%z*other%z
    end function

    subroutine vec_print(self)
        class(vector3_t), intent(in) :: self
        print '(3(f8.4,2x))', self%x, self%y, self%z
    end subroutine

end module geometry

program main
    use geometry
    implicit none

    type(vector3_t) :: a = vector3_t(1.0d0, 2.0d0, 3.0d0)
    type(vector3_t) :: b = vector3_t(4.0d0, 5.0d0, 6.0d0)

    call a%print()             ! 1.0000  2.0000  3.0000
    print *, a%length()        ! 3.742
    print *, a%dot(b)          ! 32.0
end program main
```

## Gotchas

- Derived type bound procedures require `CLASS(type_t)` (not `TYPE(type_t)`) as the first dummy argument to support polymorphism.
- Default initialization (`x = 0.0`) in the type definition means variables declared `type(vector3_t) :: v` have zero-initialized components — unlike plain Fortran variables which are uninitialized.
- Allocatable and pointer components in derived types require care with assignment: the default assignment for allocatable components performs a deep copy, which may be expensive.
