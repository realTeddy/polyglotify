---
title: "Build Tools"
language: "r"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

R package development uses **devtools** for interactive workflows and `R CMD build`/`R CMD check` for formal builds. **targets** is a Make-like pipeline tool for data analysis projects. **Makefile** or **just** are also used for scripting repetitive tasks.

## Example

```r
# devtools workflow (interactive development)
devtools::load_all()       # source all R/ files
devtools::document()       # run roxygen2, generate man/ and NAMESPACE
devtools::test()           # run tests
devtools::check()          # full R CMD check
devtools::build()          # build .tar.gz package

# targets pipeline (analysis projects)
library(targets)
# _targets.R
list(
  tar_target(raw_data,    read_csv("data/raw/survey.csv")),
  tar_target(clean_data,  clean(raw_data)),
  tar_target(model,       fit_model(clean_data)),
  tar_target(report,      render_report(model),
             format = "file")
)
```

```bash
# Run the targets pipeline
Rscript -e "targets::tar_make()"

# Standard R CMD tools
R CMD build mypackage
R CMD check mypackage_1.0.0.tar.gz
R CMD INSTALL mypackage_1.0.0.tar.gz
```

## Gotchas

- `devtools::check()` runs `R CMD check --as-cran` locally; always pass this before submitting to CRAN
- `targets` tracks file and R object dependencies, re-running only what has changed — similar to Make
- `roxygen2` comments (`#'`) generate `.Rd` documentation files automatically; never edit `man/` directly
