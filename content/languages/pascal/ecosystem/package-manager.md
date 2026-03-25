---
title: "Package Manager"
language: "pascal"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Free Pascal does not ship with a package manager in the same sense as npm or cargo. The primary package distribution mechanism is the **Online Package Manager (OPM)** built into Lazarus IDE, and the **fpcupdeluxe** tool for managing FPC/Lazarus versions. For CLI-based dependency management, **LazarusPackageManager (lpm)** and **fpkpkg** are community tools. Most library distribution is done by copying source files directly.

## Example

```bash
# OPM via Lazarus IDE (GUI)
# Tools > Online Package Manager > search and install

# fpcupdeluxe — install/manage FPC and Lazarus versions
# https://github.com/LongDirtyAnimAlf/fpcupdeluxe
./fpcupdeluxe --fpcVersion=3.2.2 --lazVersion=2.2.6

# Using the command-line OPM tool (if installed)
# lpm install LGenerics
# lpm install fpjson

# Manual: clone a library and add its .lpk to Lazarus
git clone https://github.com/michalgdanski/LGenerics
# Then in Lazarus: Package > Open Package File > select LGenerics.lpk > Compile

# Building a Lazarus package from CLI
lazbuild MyPackage.lpk --build-all
lazbuild MyProject.lpi

# Using fpmake (FPC's built-in build/package tool)
# Create fpmake.pp in project root:
fpc fpmake.pp && ./fpmake install
```

## Gotchas

- There is no central, standardised package registry like crates.io or PyPI for Free Pascal — most packages are installed manually or through the Lazarus OPM.
- Lazarus Package Files (`.lpk`) are the package format; they bundle source paths, dependencies, and compiler settings.
- `fpmake` is FPC's built-in make-like tool with package awareness, but it is rarely used compared to Lazarus's OPM.
- Library version conflicts must be resolved manually — there is no lockfile or dependency resolver.
