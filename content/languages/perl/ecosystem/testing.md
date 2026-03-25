---
title: "Testing"
language: "perl"
feature: "testing"
category: "ecosystem"
applicable: true
---

Perl testing uses the **TAP** (Test Anything Protocol) output format. The standard test library is `Test::More`. Tests live in `t/` with `.t` extension and are run with `prove`. `Test::Exception`, `Test::Deep`, and `Moo`-aware test helpers extend the basic suite.

## Example

```perl
#!/usr/bin/env perl
# t/calculator.t
use strict;
use warnings;
use Test::More;
use Test::Exception;

use_ok('MyApp::Calculator');

my $calc = MyApp::Calculator->new;

# Basic assertions
is($calc->add(2, 3), 5,   'add: 2 + 3 = 5');
is($calc->add(-1, 1), 0,  'add: handles negatives');
isnt($calc->add(1, 1), 3, 'add: 1 + 1 != 3');
ok($calc->add(0, 0) == 0, 'add: zero sum');

# Exception testing (Test::Exception)
throws_ok { $calc->divide(1, 0) }
    qr/division by zero/i,
    'divide: throws on zero divisor';

lives_ok { $calc->divide(10, 2) } 'divide: succeeds normally';

# Subtest grouping
subtest 'multiply' => sub {
    is($calc->multiply(3, 4), 12, '3 * 4 = 12');
    is($calc->multiply(0, 5), 0,  '0 * 5 = 0');
};

done_testing();
```

```bash
prove t/             # run all tests
prove -v t/calculator.t  # verbose output
make test            # via Makefile.PL
```

## Gotchas

- `done_testing()` at the end replaces the `plan(tests => N)` preamble — use one or the other, not both
- `prove -l` adds `lib/` to `@INC` automatically — useful during development
- Tests output TAP; `Test::Harness` aggregates results and reports pass/fail counts
