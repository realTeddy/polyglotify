---
title: "Package Manager"
language: "ada"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Ada uses **Alire** (ALR) as its official package manager and build system. Alire manages dependencies, builds projects, and hosts packages on its index (`alire.ada.dev`). The project file format is TOML-based (`alire.toml`). GNAT Pro (commercial) has its own toolchain management.

## Example

```toml
# alire.toml — project manifest
name = "my_project"
description = "An Ada application"
version = "0.1.0"
authors = ["Alice Developer"]
maintainers = ["alice@example.com"]
licenses = "MIT"
tags = ["application", "cli"]

[origin]
kind = "path"
path = "."

[[depends-on]]
aunit = "^21.0"       # unit testing framework

[[depends-on]]
gnatcoll = "^22.0"    # GNAT Component Collection
```

```sh
# Alire commands
alr init --bin my_project   # create a new binary project
alr init --lib my_library   # create a new library project
alr build                   # build the project
alr run                     # build and run
alr test                    # run tests

alr with aunit              # add dependency
alr with --del aunit        # remove dependency

alr search gnatcoll         # search the index
alr index --update-all      # update package index
alr publish                 # publish to the Alire index

alr toolchain --select      # manage GNAT compiler versions
```

## Gotchas

- Alire requires the `alr` executable — install from `alire.ada.dev`.
- Each project also needs a GNAT Project (`.gpr`) file for the actual build configuration — Alire generates a default one.
- The Alire index is community-maintained and smaller than npm/cargo — availability of third-party libraries is limited.
- GNAT Pro (AdaCore's commercial offering) uses a different toolchain management system (`gnatstudio`, `gprbuild`).
