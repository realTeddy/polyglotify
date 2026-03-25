---
title: "Project Structure"
language: "pascal"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A Free Pascal / Lazarus project centres on a project file (`.lpi` for Lazarus GUI projects, or a simple `.pp`/`.pas` program file for console apps). Source units live in one or more directories listed in the compiler's search path. There is no enforced directory convention, but common practice separates source units, resources, and build output.

## Example

```
myapp/
├── myapp.lpi           # Lazarus project file (XML)
├── myapp.lpr           # Lazarus project program file (entry point)
├── myapp.res           # compiled resources (icons, etc.)
├── src/
│   ├── umain.pas       # main form unit
│   ├── uconfig.pas     # configuration unit
│   └── uutils.pas      # utility functions
├── tests/
│   └── testutils.pas   # unit tests (fpcunit or DUnit)
├── lib/
│   └── SomeLibrary/    # vendored external library
└── bin/                # compiled output (gitignored)
```

```pascal
// myapp.lpr — program entry point
program myapp;

{$mode objfpc}{$H+}

uses
  {$ifdef Unix}cthreads,{$endif}
  Forms,
  umain in 'src/umain.pas';

{$R myapp.res}

begin
  Application.Title := 'My App';
  Application.Initialize;
  Application.CreateForm(TMainForm, MainForm);
  Application.Run;
end.
```

## Gotchas

- Unit file names must match the `unit` name declared at the top of the file (case-insensitive on Windows, case-sensitive on Linux).
- The Lazarus project file (`.lpi`) stores compiler flags, search paths, and form files — check it into version control.
- `{$mode objfpc}` or `{$mode Delphi}` at the top of each file is needed to enable FPC extensions; without it, the compiler uses classic Pascal mode.
- Build output (`.o`, `.ppu`, binary) should be directed to a separate directory to keep sources clean; set this in the Lazarus project options or with `-FU` compiler flag.
