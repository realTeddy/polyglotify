---
title: "Package Manager"
language: "r"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

R's package manager is the built-in `install.packages()` backed by **CRAN** (Comprehensive R Archive Network). **renv** provides project-level dependency isolation and lockfiles (analogous to npm's `package.json`). **pak** is a modern, faster alternative to `install.packages`.

## Example

```r
# Base R installation
install.packages("ggplot2")
install.packages(c("dplyr", "tidyr", "purrr"))

# From GitHub
remotes::install_github("tidyverse/ggplot2")

# Load a package
library(ggplot2)       # attaches to search path
require(ggplot2)       # returns FALSE if not found (vs error)
ggplot2::ggplot(...)   # use without attaching

# renv — project-local dependencies
renv::init()           # create renv.lock
renv::install("ggplot2")
renv::snapshot()       # update lockfile
renv::restore()        # install from lockfile (reproducible)
renv::status()         # check consistency

# pak — modern fast installer
pak::pkg_install("ggplot2")
pak::pkg_install("tidyverse/ggplot2")  # from GitHub
```

## Gotchas

- `library()` raises an error if the package is missing; `require()` returns `FALSE` — use `library()` in scripts
- Without `renv`, packages are installed globally per R version — different projects share the same library
- CRAN submissions require passing `R CMD check --as-cran`; Bioconductor has its own review process
