---
title: "Build Tools"
language: "perl"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

Perl distributions are built with `ExtUtils::MakeMaker` (generates a `Makefile`) or `Module::Build`. **Dist::Zilla** automates the entire release workflow. The standard `make` commands (`make`, `make test`, `make install`) drive the build cycle.

## Example

```perl
# Makefile.PL (ExtUtils::MakeMaker)
use ExtUtils::MakeMaker;

WriteMakefile(
    NAME             => 'MyApp',
    AUTHOR           => 'Alice <alice@example.com>',
    VERSION_FROM     => 'lib/MyApp.pm',   # reads $VERSION from module
    ABSTRACT_FROM    => 'lib/MyApp.pm',
    LICENSE          => 'perl_5',
    MIN_PERL_VERSION => '5.020',
    PREREQ_PM        => {
        'Moose'     => '2.2201',
        'Try::Tiny' => '0.30',
    },
    TEST_REQUIRES    => {
        'Test::More'      => '1.302',
        'Test::Exception' => '0.43',
    },
    META_MERGE => {
        resources => {
            repository => 'https://github.com/user/myapp',
        },
    },
);
```

```bash
perl Makefile.PL           # generate Makefile
make                       # compile (for XS modules)
make test                  # run tests
make install               # install to Perl lib
make dist                  # create .tar.gz distribution

# Dist::Zilla
dzil build                 # build distribution
dzil test                  # run tests
dzil release               # upload to CPAN
```

## Gotchas

- Pure-Perl modules don't need compilation but still go through the same `make` workflow
- `make dist` creates a tarball for CPAN upload; `Dist::Zilla` automates version bumps, changelogs, and upload
- `perl -c lib/MyApp.pm` checks syntax without executing — useful before running full tests
