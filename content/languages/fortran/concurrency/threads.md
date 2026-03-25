---
title: "Threads"
language: "fortran"
feature: "threads"
category: "concurrency"
applicable: true
---

Fortran supports shared-memory parallelism through **OpenMP** directives, which the compiler transforms into thread creation and synchronization. There is no native threading API in the language standard, but OpenMP is universally supported by gfortran, Intel Fortran, and NVIDIA HPC Fortran. Fortran 2018 also adds `DO CONCURRENT` as a standardized way to express loop-level parallelism without requiring OpenMP.

## Example

```fortran
program threads_demo
    use omp_lib
    implicit none

    integer, parameter :: N = 8
    real :: result(N)
    integer :: i
    real :: total

    ! Parallel loop with OpenMP
    !$omp parallel do private(i) shared(result)
    do i = 1, N
        result(i) = expensive_calc(i)
    end do
    !$omp end parallel do

    ! Parallel sections — different work on different threads
    !$omp parallel sections
    !$omp section
        call task_a()
    !$omp section
        call task_b()
    !$omp end parallel sections

    ! DO CONCURRENT (Fortran 2018 — no OpenMP needed)
    do concurrent (i = 1:N)
        result(i) = expensive_calc(i)
    end do

    total = sum(result)
    print *, "Total:", total

    contains

    real function expensive_calc(n)
        integer, intent(in) :: n
        expensive_calc = real(n) ** 2
    end function

    subroutine task_a()
        print *, "Task A on thread", omp_get_thread_num()
    end subroutine

    subroutine task_b()
        print *, "Task B on thread", omp_get_thread_num()
    end subroutine

end program threads_demo
```

## Gotchas

- `PRIVATE(i)` in OpenMP ensures each thread has its own copy of the loop variable — forgetting this causes a data race and incorrect results.
- `DO CONCURRENT` expresses that iterations are independent but does not guarantee parallel execution — the compiler may or may not parallelize it.
- OpenMP's `REDUCTION` clause correctly accumulates results across threads; manual accumulation into a shared variable without a reduction or critical section causes a race condition.
