---
title: "Build Tools"
language: "tcl"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Tcl scripts are interpreted directly — there is no compilation step. "Build" tasks for Tcl projects typically involve generating `pkgIndex.tcl`, running tests, creating starkits/starpacks (single-file deployable archives), and wrapping Tcl with C extensions using **Critcl** or **SWIG**. Traditional `make`/`cmake` is used when C extensions are involved.

## Example

```bash
# No build needed for pure Tcl scripts
tclsh myapp.tcl

# Generate package index
tclsh -e "pkg_mkIndex . *.tcl"
# or via the tclsh command:
# pkg_mkIndex /path/to/lib *.tcl

# Run tests
tclsh tests/all.tcl

# Starkit — single-file archive (requires Tclkit and Metakit/Zipvfs)
# sdx qwrap myapp.tcl              # wrap into myapp.kit
# sdx wrap myapp.exe -runtime tclkit  # standalone executable

# Critcl — inline C in Tcl for compiled extensions
# myext.tcl:
# package require critcl
# critcl::cproc add {int a int b} int { return a + b; }
# critcl::build
tclsh myext.tcl

# CMake for a mixed Tcl/C project
# CMakeLists.txt:
# find_package(TCL REQUIRED)
# add_library(myext SHARED myext.c)
# target_link_libraries(myext ${TCL_LIBRARY})
```

```tcl
# Makefile-equivalent in pure Tcl (build.tcl)
proc generatePkgIndex {dir} {
    pkg_mkIndex $dir {*.tcl}
    puts "Generated pkgIndex.tcl in $dir"
}

proc runTests {} {
    exec tclsh tests/all.tcl >@ stdout 2>@ stderr
}

switch [lindex $argv 0] {
    "index" { generatePkgIndex "lib/myapp" }
    "test"  { runTests }
    default { puts "Usage: tclsh build.tcl [index|test]" }
}
```

## Gotchas

- Pure Tcl requires no compilation; the "build" is mostly packaging and index generation.
- Starkits/Starpacks require the `sdx` tool and a Tclkit runtime — the toolchain is less standardised than in other ecosystems.
- Critcl compiles C code at runtime (first run) or at build time — useful for performance-critical extensions without a full C build system.
- `pkg_mkIndex` must be re-run whenever `.tcl` files are added, removed, or renamed in a package directory.
