---
title: "Build Tools"
language: "matlab"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

MATLAB's primary "build tool" is MATLAB itself — scripts are interpreted at runtime, so there is no compilation step for `.m` files. For deployment, MATLAB Compiler packages code into standalone executables or shared libraries. `mex` compiles C/C++/Fortran extensions. MATLAB Build Tool (R2022b+) provides Makefile-like task dependency management.

## Example

```matlab
% MATLAB Build Tool (R2022b+)
% buildfile.m in project root

function plan = buildfile
    import matlab.buildtool.tasks.*

    plan = buildplan(localfunctions);
    plan.DefaultTasks = "test";
    plan("test").Dependencies = "check";
end

function checkTask(~)
    % Type-check / lint
    issues = codeIssues("src");
    assert(isempty(issues(issues.Severity == "error")), ...
           'Code has errors')
end

function testTask(~)
    results = runtests("tests", OutputDetail="terse");
    assertSuccess(results)
end

function buildTask(~)
    % Package code for deployment
    compiler.build.standaloneApplication("src/main.m", ...
        "OutputDir", "build/")
end
```

```sh
# Run from the OS shell
matlab -batch "buildtool test"
matlab -batch "buildtool build"

# MEX compilation (C extension)
mex src/fast_algo.c

# MATLAB Compiler (requires MATLAB Compiler toolbox)
mcc -m src/main.m -o myapp
```

## Gotchas

- MATLAB Build Tool requires R2022b or later; older code uses `runtests` and shell scripts directly.
- `mex` requires a supported C/C++ compiler to be configured (`mex -setup`).
- MATLAB Compiler (for standalone executables) is a separate, licensed product.
- For CI/CD, `matlab -batch "script"` runs MATLAB non-interactively; exit code indicates success/failure.
