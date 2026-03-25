---
title: "Project Structure"
language: "perl"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Perl distributions follow a standard layout created by `Module::Starter` or `Dist::Zilla`. The `lib/` directory holds the modules, `t/` holds tests, and the distribution metadata is in `Makefile.PL` or `Build.PL` (or `dist.ini` for Dist::Zilla).

## Example

```
MyApp-Distribution/
├── lib/
│   └── MyApp/
│       ├── MyApp.pm         # main module
│       ├── Config.pm
│       └── Utils.pm
├── t/                       # tests (TAP format)
│   ├── 00-load.t
│   ├── 01-config.t
│   └── utils.t
├── bin/                     # executables
│   └── myapp
├── script/                  # alternative for scripts
├── cpanfile                 # dependencies
├── Makefile.PL              # build configuration
├── MANIFEST                 # list of all distribution files
├── MANIFEST.SKIP            # files to exclude
├── Changes                  # changelog
└── README

# Makefile.PL
use ExtUtils::MakeMaker;
WriteMakefile(
    NAME         => 'MyApp',
    VERSION_FROM => 'lib/MyApp.pm',
    PREREQ_PM    => { 'Moose' => '2.0', 'Try::Tiny' => '0.30' },
    TEST_REQUIRES => { 'Test::More' => '1.0' },
);
```

## Gotchas

- Test files use `.t` extension and produce TAP (Test Anything Protocol) output
- `MANIFEST` must list every file in the distribution; run `make manifest` to auto-generate it
- Module names map to file paths: `MyApp::Utils` must be in `lib/MyApp/Utils.pm`
