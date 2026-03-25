---
title: "Project Structure"
language: "ada"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Ada projects use **GNAT Project Files** (`.gpr`) to define source directories, build settings, and dependencies. Alire adds `alire.toml` on top of this. The conventional layout places spec files (`.ads`) and body files (`.adb`) together in `src/`. Package hierarchies use `.`-separated names reflected in file names.

## Example

```
my_app/
├── alire.toml              % Alire manifest
├── my_app.gpr              % GNAT Project file
├── src/
│   ├── my_app.adb          % Main procedure
│   ├── my_app-core.ads     % Package spec: My_App.Core
│   ├── my_app-core.adb     % Package body: My_App.Core
│   ├── my_app-utils.ads    % Package spec: My_App.Utils
│   └── my_app-utils.adb    % Package body: My_App.Utils
├── tests/
│   └── test_core.adb
└── obj/                    % Build artifacts (generated)
```

```ada
-- my_app.gpr
project My_App is
   for Source_Dirs use ("src/**");
   for Object_Dir  use "obj";
   for Exec_Dir    use "bin";
   for Main        use ("my_app.adb");

   package Compiler is
      for Switches ("Ada") use ("-g", "-O2", "-gnatwa");
   end Compiler;
end My_App;
```

```ada
-- my_app-core.ads (package spec)
package My_App.Core is
   procedure Run;
   function Version return String;
end My_App.Core;

-- my_app-core.adb (package body)
package body My_App.Core is
   procedure Run is begin null; end;
   function Version return String is ("1.0.0");
end My_App.Core;
```

## Gotchas

- Ada package names use `.` hierarchy (`My_App.Core`) reflected in file names (`my_app-core.ads`/`.adb`).
- GNAT expects file names to be lowercase versions of the package names with `-` replacing `.`.
- Every package needs both a spec (`.ads`) and a body (`.adb`) — except packages with only declarations.
- The `obj/` directory is generated — add it to `.gitignore`.
