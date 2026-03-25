---
title: "Build Tools"
language: "ada"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Ada's primary build tool is **GPRbuild** (`gprbuild`), which uses GNAT Project Files (`.gpr`). **Alire** (`alr`) wraps GPRbuild and adds dependency management. For IDE integration, **GNAT Studio** and **VS Code with GNAT plugins** are common. The compiler is **GNAT** (FSF or AdaCore's GNAT Pro).

## Example

```ada
-- my_project.gpr
project My_Project is

   for Source_Dirs use ("src/**");
   for Object_Dir  use "obj/" & External ("BUILD", "debug");
   for Exec_Dir    use "bin";
   for Main        use ("main.adb");

   type Build_Type is ("debug", "release");
   Build : Build_Type := External ("BUILD", "debug");

   package Compiler is
      case Build is
         when "debug" =>
            for Switches ("Ada") use
               ("-g",           -- debug info
                "-gnatwa",      -- all warnings
                "-gnata",       -- assertions
                "-O0");
         when "release" =>
            for Switches ("Ada") use
               ("-O2",          -- optimize
                "-gnatp",       -- disable assertions
                "-gnatVa");
      end case;
   end Compiler;

   package Linker is
      for Switches ("Ada") use ("-Wl,-s");  -- strip symbols in release
   end Linker;

end My_Project;
```

```sh
# Build commands
gprbuild my_project.gpr          # build with GPRbuild
gprbuild -Pmy_project.gpr        # same
gprbuild -XBUILD=release ...     # release build

alr build                         # Alire wrapper (preferred)
alr build --release               # release build

# Clean
gprclean my_project.gpr

# Run
alr run
./bin/main                        # direct execution

# Static analysis
gnatcheck -Pmy_project.gpr       # coding standard checks (GNAT Pro)
gnatprove -Pmy_project.gpr       # formal verification (SPARK)
```

## Gotchas

- GPRbuild only recompiles changed files (incremental build) — much faster than a full rebuild.
- External variables in `.gpr` files (`External("VAR", "default")`) allow conditional configuration.
- The `.gpr` syntax is Ada-like — case statements, string types, and hierarchical packages are all supported.
- SPARK formal verification (`gnatprove`) requires additional annotations (`Pre`, `Post`, `Ghost`) but proves the absence of runtime errors.
