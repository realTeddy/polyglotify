---
title: "Classes"
language: "fortran"
feature: "classes"
category: "oop"
applicable: true
---

Fortran 2003 extended derived types to support object-oriented programming. A derived type with type-bound procedures (`CONTAINS` block inside the type definition) acts as a class. Access control uses `PRIVATE`/`PUBLIC`. `CLASS(type)` allows polymorphic variables. There is no `class` keyword — derived types with bound procedures serve the role. The pattern is widely used in modern HPC Fortran code.

## Example

```fortran
module shapes_mod
    implicit none

    type :: shape_t
        character(len=20) :: color = "white"
    contains
        procedure :: area    => shape_area
        procedure :: describe => shape_describe
    end type

    contains

    ! "Method" — first arg is the receiver
    real function shape_area(self)
        class(shape_t), intent(in) :: self
        shape_area = 0.0
    end function

    subroutine shape_describe(self)
        class(shape_t), intent(in) :: self
        print *, "Color: ", trim(self%color), " Area:", self%area()
    end subroutine

end module shapes_mod

program main
    use shapes_mod
    implicit none

    type(shape_t) :: s
    s%color = "blue"
    call s%describe()     ! Color: blue  Area:  0.
    print *, s%area()     ! 0.0
end program main
```

## Gotchas

- Fortran OOP requires `CLASS(type_t)` for the receiver of type-bound procedures, not `TYPE(type_t)`, to enable dynamic dispatch.
- There is no constructor syntax — derived type constructors are structure constructor expressions or user-written factory functions.
- Private components (declared with `PRIVATE`) require accessor methods — there is no `property` keyword.
