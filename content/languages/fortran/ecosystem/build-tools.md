---
title: "Build Tools"
language: "fortran"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

The primary Fortran compilers are **gfortran** (GNU, free), **Intel Fortran Compiler** (ifx/ifort, free for non-commercial use), and **NVIDIA HPC Fortran** (nvfortran, for GPU offloading). Build systems include **fpm** (the modern choice), **CMake** with `FortranCInterface` (most common for HPC projects), and **Make** (legacy). Large HPC projects often use CMake or autotools for portability across cluster environments.

## Example

```bash
# gfortran — direct compilation
gfortran -O2 -o myprogram src/main.f90 src/utils.f90

# With OpenMP
gfortran -fopenmp -O3 -o parallel_prog src/main.f90

# With coarrays
gfortran -fcoarray=lib -o coarray_prog src/main.f90 -lcaf_mpi

# Debug build
gfortran -g -fcheck=all -Wall -Wextra -o debug_prog src/main.f90

# Intel Fortran
ifx -O2 -qopenmp -o myprogram src/main.f90

# fpm (recommended for new projects)
fpm build --profile release    # optimized
fpm build --profile debug      # debug info + checks
fpm run
```

```cmake
# CMakeLists.txt for a Fortran project
cmake_minimum_required(VERSION 3.20)
project(my_fortran_project Fortran)

set(CMAKE_Fortran_FLAGS_RELEASE "-O3 -march=native")
set(CMAKE_Fortran_FLAGS_DEBUG   "-g -fcheck=all")

add_library(utils src/math_utils.f90 src/io_helpers.f90)
add_executable(myprogram app/main.f90)
target_link_libraries(myprogram utils)
```

## Gotchas

- Fortran module files (`.mod`) are generated during compilation and must be available when compiling files that `USE` those modules — build systems must compute the correct compile order.
- `-fcheck=all` (gfortran) enables array bounds checking, pointer checking, and shape checking at runtime; essential for debugging but too slow for production.
- Mixing compiler vendors in a single build (e.g., linking gfortran objects with Intel Fortran objects) usually fails due to incompatible runtime libraries and ABI differences.
