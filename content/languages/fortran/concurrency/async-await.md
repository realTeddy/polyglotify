---
title: "Async/Await"
language: "fortran"
feature: "async-await"
category: "concurrency"
applicable: false
---

Fortran has no async/await. Fortran's concurrency model is based on parallelism through **coarrays** (Fortran 2008, for distributed-memory SPMD), **OpenMP** directives (shared-memory parallelism), and **MPI** library calls (message-passing). None of these are async/await in the modern event-loop sense. Coarrays provide synchronization points but not coroutine-style cooperation between tasks.

## Example

```fortran
! Fortran's parallelism: OpenMP (not async/await)
program parallel_demo
    use omp_lib
    implicit none

    integer, parameter :: N = 1000
    real :: data(N), total
    integer :: i

    data = [(real(i), i=1,N)]
    total = 0.0

    !$omp parallel do reduction(+:total)
    do i = 1, N
        total = total + data(i)
    end do
    !$omp end parallel do

    print *, "Sum:", total   ! 500500.0

    ! Fortran coarray (distributed memory, compile with -fcoarray=lib)
    ! real :: x[*]   ! x is a coarray — one instance per image
    ! x = this_image() * 10.0
    ! sync all          ! barrier
    ! if (this_image() == 1) print *, x[2]  ! access remote image's x
end program parallel_demo
```

## Gotchas

- OpenMP is a compiler directive system, not a language feature — it requires `-fopenmp` at compile time and degrades gracefully (ignores directives) without it.
- Coarrays run multiple copies of the entire program (`images`), not coroutines within one thread — this is SPMD, not event-driven concurrency.
- MPI (via the `mpi` or `mpi_f08` module) provides fine-grained message passing but has no concept of futures or async callbacks.
