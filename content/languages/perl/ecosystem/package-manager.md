---
title: "Package Manager"
language: "perl"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Perl's package repository is **CPAN** (Comprehensive Perl Archive Network). The primary client is **cpanm** (cpanminus — minimal and fast). **Carton** provides project-level dependency isolation analogous to Bundler. `cpanfile` declares dependencies.

## Example

```perl
# cpanfile — project dependencies
requires 'Moose',     '== 2.2201';
requires 'Try::Tiny', '>= 0.30';
requires 'JSON',      '>= 4.0';

on test => sub {
    requires 'Test::More',      '>= 1.302';
    requires 'Test::Exception', '>= 0.43';
};

on develop => sub {
    requires 'Perl::Critic';
    requires 'Perl::Tidy';
};
```

```bash
# cpanm — install a module
cpanm Moose
cpanm Try::Tiny JSON

# Install from cpanfile
cpanm --installdeps .

# Carton — project-local isolation
carton install          # install from cpanfile, create cpanfile.snapshot
carton exec perl app.pl # run in isolated environment
carton update           # update dependencies

# Check installed version
perl -MModuleName -e 'print $ModuleName::VERSION'
```

## Gotchas

- `cpanm` installs to the system Perl by default; use `local::lib` or `Carton` for project isolation
- `cpanfile.snapshot` (Carton's lockfile) should be committed for reproducible installs
- `ExtUtils::MakeMaker` and `Module::Build` are older build/install systems still used by some CPAN modules
