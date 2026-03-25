---
title: "Project Structure"
language: "fortran"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A modern Fortran project managed by `fpm` follows a conventional layout. Source files go in `src/`, tests in `test/`, and executables (programs with `PROGRAM` statements) in `app/`. `fpm` automatically discovers modules and resolves build order by scanning `USE` statements. Legacy Fortran projects use Makefile or CMake with manual dependency ordering since Fortran's module files (`.mod`) must be compiled before their users.

## Example

```
my_project/
├── fpm.toml               ; project manifest
├── src/
│   ├── my_project.f90     ; main library module
│   ├── math_utils.f90     ; utility module
│   └── io_helpers.f90     ; I/O helper module
├── app/
│   └── main.f90           ; PROGRAM main — the executable
├── test/
│   ├── test_math.f90      ; test program
│   └── test_io.f90        ; test program
└── example/
    └── demo.f90           ; example program
```

```fortran
! src/math_utils.f90 — module file
module math_utils
    implicit none
    private
    public :: add, multiply

    contains

    pure real function add(a, b)
        real, intent(in) :: a, b
        add = a + b
    end function

    pure real function multiply(a, b)
        real, intent(in) :: a, b
        multiply = a * b
    end function

end module math_utils

! app/main.f90
program main
    use math_utils, only: add
    implicit none
    print *, add(3.0, 4.0)   ! 7.0
end program main
```

## Gotchas

- Fortran module files (`.mod`) are compiler-specific binary files — you cannot mix modules compiled by different compilers (e.g., gfortran and Intel Fortran).
- Build order matters: a module must be compiled before any program unit that `USE`s it. `fpm` handles this automatically; Makefile projects must specify dependencies manually.
- One module per file is a convention, not a rule; but fpm's auto-discovery works best when filenames match module names (e.g., `math_utils.f90` contains `module math_utils`).
