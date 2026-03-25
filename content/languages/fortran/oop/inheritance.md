---
title: "Inheritance"
language: "fortran"
feature: "inheritance"
category: "oop"
applicable: true
---

Fortran 2003 supports single inheritance via the `EXTENDS` keyword on derived types. A child type inherits all components and type-bound procedures of the parent. Procedures can be overridden by declaring a procedure with the same binding name in the child type. The parent component is accessible via the parent type name as a component (`child%parent_type_name%field`). `CLASS(parent_t)` enables polymorphic variables that can hold any descendant.

## Example

```fortran
module shapes_mod
    implicit none

    ! Base type
    type :: shape_t
        real :: x = 0.0, y = 0.0   ! position
    contains
        procedure :: area     => base_area
        procedure :: describe => base_describe
    end type

    ! Derived type
    type, extends(shape_t) :: circle_t
        real :: radius = 1.0
    contains
        procedure :: area => circle_area    ! override
    end type

    type, extends(shape_t) :: rectangle_t
        real :: width = 1.0, height = 1.0
    contains
        procedure :: area => rect_area      ! override
    end type

    contains

    real function base_area(self)
        class(shape_t), intent(in) :: self
        base_area = 0.0
    end function

    subroutine base_describe(self)
        class(shape_t), intent(in) :: self
        print '(a, f6.2)', "Area = ", self%area()
    end subroutine

    real function circle_area(self)
        class(circle_t), intent(in) :: self
        circle_area = 3.14159265 * self%radius**2
    end function

    real function rect_area(self)
        class(rectangle_t), intent(in) :: self
        rect_area = self%width * self%height
    end function

end module shapes_mod

program main
    use shapes_mod
    implicit none

    class(shape_t), allocatable :: shapes(:)
    integer :: i

    allocate(circle_t :: shapes(1))
    allocate(rectangle_t :: shapes(2))

    select type(s => shapes(1))
        type is (circle_t); s%radius = 3.0
    end select

    do i = 1, 2
        call shapes(i)%describe()   ! polymorphic dispatch
    end do
end program main
```

## Gotchas

- `CLASS(shape_t), allocatable :: shapes(:)` creates a polymorphic array — each element can hold any descendant type. Accessing child-specific components requires `SELECT TYPE`.
- Fortran only supports **single** inheritance — no mixins or multiple base types.
- The parent's components are accessed via `child%shape_t%x` (explicit parent-type access) or just `child%x` (inherited component shortcut).
