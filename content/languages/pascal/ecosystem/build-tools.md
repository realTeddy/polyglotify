---
title: "Build Tools"
language: "pascal"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Free Pascal projects are built with the **FPC compiler** directly or through **Lazarus** (IDE with integrated build). For scripting builds, **lazbuild** (Lazarus CLI builder) and **fpmake** (FPC's built-in make tool) are available. Traditional `make` with a `Makefile` is also common for non-Lazarus projects.

## Example

```bash
# Compile a single-file program
fpc myapp.pas

# Compile with options
fpc -O2 -g -Fu./src -FE./bin myapp.pas
# -O2: optimise  -g: debug symbols  -Fu: unit path  -FE: output dir

# Lazarus CLI build
lazbuild myapp.lpi                     # build default configuration
lazbuild myapp.lpi --build-all         # force rebuild all
lazbuild myapp.lpi --build-mode=Release

# fpmake (for library/package projects)
# fpmake.pp example:
{
  var p: TPackage;
  p := Installer.AddPackage('mylib');
  p.Version := '1.0.0';
  p.Author  := 'Alice';
  p.SourcePath.Add('src');
  p.Targets.AddUnit('mylib.pas');
}
fpc fpmake.pp && ./fpmake compile && ./fpmake install

# Cross-compilation (FPC strength)
fpc -Tcrossplatform -Parm myapp.pas    # ARM Linux
fpc -Twin64 -Px86_64 myapp.pas        # 64-bit Windows from Linux
```

```makefile
# Simple Makefile for FPC
PROGRAM = myapp
SRCDIR  = src
OUTDIR  = bin
FPCFLAGS = -O2 -Fu$(SRCDIR) -FE$(OUTDIR)

all:
	fpc $(FPCFLAGS) $(PROGRAM).pas

clean:
	rm -f $(OUTDIR)/$(PROGRAM) $(SRCDIR)/*.o $(SRCDIR)/*.ppu
```

## Gotchas

- FPC's `-O2` optimisation is safe for most code; `-O3` enables potentially unsafe optimisations (e.g., omitting range checks that technically cannot fail).
- Cross-compilation with FPC is well-supported; you need the cross-compilation units for the target platform installed.
- `lazbuild` requires the Lazarus directory to be in `PATH` or specified with `--lazarusdir`.
- `.ppu` (compiled unit) files are tightly coupled to the FPC version; mixing units compiled with different FPC versions causes linker errors.
