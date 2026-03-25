---
title: "Testing"
language: "fortran"
feature: "testing"
category: "ecosystem"
applicable: true
---

`fpm` runs test programs automatically — any program in the `test/` directory is treated as a test. Tests pass if the program exits with code 0 and fail if it exits non-zero. Third-party frameworks include **test-drive** (a modern BDD-style framework), **FRUIT** (Fortran Unit Test Framework), and **pFUnit** (parallel unit testing for MPI/OpenMP code). The Fortran stdlib also provides test utilities.

## Example

```fortran
! test/test_math.f90 — using test-drive framework
program test_math
    use math_utils, only: add, multiply
    use testdrive, only: new_unittest, unittest_t, testsuite_t, &
                         run_testsuite, check
    implicit none

    type(testsuite_t), allocatable :: testsuites(:)
    character(len=*), parameter :: fmt = '("#", *(1x, a))'
    integer :: stat

    testsuites = [&
        new_testsuite("math utils", collect_tests)]

    do i = 1, size(testsuites)
        call run_testsuite(testsuites(i)%collect, error, &
                           testsuites(i)%name)
    end do

    contains

    subroutine collect_tests(testsuite)
        type(unittest_t), allocatable, intent(out) :: testsuite(:)
        testsuite = [&
            new_unittest("add two positives", test_add_pos),   &
            new_unittest("multiply by zero",  test_mul_zero)]
    end subroutine

    subroutine test_add_pos(error)
        type(error_t), allocatable, intent(out) :: error
        call check(error, add(2.0, 3.0) == 5.0, "2+3 should be 5")
    end subroutine

    subroutine test_mul_zero(error)
        type(error_t), allocatable, intent(out) :: error
        call check(error, multiply(7.0, 0.0) == 0.0, "7*0 should be 0")
    end subroutine

end program test_math
```

```bash
fpm test              # run all tests
fpm test --target test_math   # run specific test
```

## Gotchas

- Without a framework, the simplest test is a program that calls `STOP 1` on failure and `STOP 0` on success — `fpm` treats nonzero exit as failure.
- `pFUnit` requires a Python preprocessing step to generate test registration code; it is powerful but more complex to set up.
- Floating-point equality comparisons in tests should use a tolerance: `abs(result - expected) < 1.0e-6` rather than `result == expected`.
