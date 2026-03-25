---
title: "Channels & Message Passing"
language: "fortran"
feature: "channels"
category: "concurrency"
applicable: true
---

Fortran does not have language-level channels, but **coarrays** (Fortran 2008/2018) provide a built-in distributed-memory communication mechanism. Each coarray image (process) has its own copy of coarray variables and can read or write another image's data using `[image]` indexing. `SYNC ALL`, `SYNC IMAGES`, and `NOTIFY`/`QUERY` (Fortran 2018) provide synchronization. MPI is the alternative for larger-scale distributed communication.

## Example

```fortran
! Coarray message passing (compile: gfortran -fcoarray=lib -lcaf_mpi ...)
program coarray_channel
    implicit none

    ! One integer per image, shared across all images
    integer :: val[*]
    integer :: next_image

    ! Each image sets its own value
    val = this_image() * 10

    sync all   ! barrier — all images have set their val

    ! Image 1 reads from image 2 (like receiving on a channel)
    if (this_image() == 1) then
        print *, "Image 1 received:", val[2]   ! 20
    end if

    sync all

    ! Ring communication: send to next image
    next_image = mod(this_image(), num_images()) + 1
    val[next_image] = this_image() * 100  ! send to next

    sync all

    print *, "Image", this_image(), "received:", val

end program coarray_channel
```

## Gotchas

- Coarray programs run as multiple OS processes (images), not threads — each image has its own private memory plus the shared coarray variables.
- `SYNC ALL` is a global barrier — every image must reach it or the program deadlocks.
- The `OpenCoarrays` library (`libcaf_mpi`) is required for multi-image coarray execution with gfortran; the `-fcoarray=single` flag runs with one image only (useful for testing).
