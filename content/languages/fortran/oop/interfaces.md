---
title: "Interfaces & Traits"
language: "fortran"
feature: "interfaces"
category: "oop"
applicable: true
---

Fortran uses `INTERFACE` blocks for two different purposes: declaring the signature of external procedures (allowing the compiler to type-check calls), and defining generic interfaces (function overloading). Fortran 2003's abstract types (`ABSTRACT`) with deferred bindings serve as interfaces in the OOP sense — a base type with procedure signatures but no implementation, forcing subclasses to provide them.

## Example

```fortran
module interfaces_demo
    implicit none

    ! Abstract type = interface (OOP sense)
    type, abstract :: serializable_t
    contains
        procedure(serialize_proto), deferred :: serialize
        procedure(deserialize_proto), deferred :: deserialize
    end type

    ! Abstract interface (procedure signature only)
    abstract interface
        function serialize_proto(self) result(str)
            import :: serializable_t
            class(serializable_t), intent(in) :: self
            character(len=:), allocatable :: str
        end function

        subroutine deserialize_proto(self, str)
            import :: serializable_t
            class(serializable_t), intent(inout) :: self
            character(len=*), intent(in) :: str
        end subroutine
    end interface

    ! Generic interface (overloading) — different meaning of INTERFACE
    interface to_string
        module procedure int_to_string, real_to_string
    end interface

    contains

    function int_to_string(n) result(s)
        integer, intent(in) :: n
        character(len=20) :: s
        write(s, '(i0)') n
    end function

    function real_to_string(x) result(s)
        real, intent(in) :: x
        character(len=20) :: s
        write(s, '(f12.4)') x
    end function

end module interfaces_demo

program main
    use interfaces_demo
    implicit none
    print *, to_string(42)      ! "42"
    print *, to_string(3.14)    ! "      3.1400"
end program main
```

## Gotchas

- `INTERFACE` blocks for external procedures are a legacy necessity — module procedures automatically provide explicit interfaces, making the blocks unnecessary.
- Abstract types with deferred bindings are the modern Fortran equivalent of Java interfaces, but they are less commonly used than in other OO languages.
- Generic interfaces (overloading) and abstract interfaces serve completely different purposes despite using the same `INTERFACE` keyword.
