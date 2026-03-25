---
title: "Build Tools"
language: "prolog"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Prolog has no standard build system. SWI-Prolog scripts are typically loaded directly by the interpreter. For creating standalone executables, SWI-Prolog provides `qsave_program/2`. For compiled (faster-loading) `.qlf` files, use `qcompile/1`. Makefiles or shell scripts handle multi-step builds.

## Example

```sh
# Run a Prolog file directly
swipl main.pl
swipl -g "initialization_goal" -g halt main.pl

# Load and run in batch mode (exits after goal)
swipl -l main.pl -g run -g halt

# Compile to .qlf (quick load format — faster load, not binary)
swipl -g "qcompile('main.pl')" -g halt

# Create a standalone executable (requires SWI-Prolog)
swipl -g "qsave_program('myapp', [goal(main:run), stand_alone(true)])" \
      -g halt main.pl
./myapp   # runs without needing SWI-Prolog installed
```

```prolog
% In a build script (build.pl)
:- initialization(build, main).

build :-
    % Compile all modules
    qcompile('prolog/database'),
    qcompile('prolog/rules'),
    % Create standalone binary
    qsave_program('dist/myapp', [
        goal(main:run),
        stand_alone(true),
        optimise(true)
    ]).
```

```makefile
# Makefile for a Prolog project
all: myapp
test:
	swipl -g run_tests -g halt tests/all_tests.pl
myapp: main.pl prolog/*.pl
	swipl -g "qsave_program('myapp',[goal(run),stand_alone(true)])" -g halt main.pl
```

## Gotchas

- `qsave_program` bundles all loaded code into one file — ensure all modules are loaded before calling it.
- Standalone executables include the SWI-Prolog runtime — they can be large (~20MB).
- `qcompile` produces platform-specific `.qlf` files — not portable between platforms or SWI-Prolog versions.
- GNU Prolog (`gplc`) and SICStus have native compilers that produce smaller, faster binaries.
