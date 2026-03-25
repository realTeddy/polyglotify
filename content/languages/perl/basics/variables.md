---
title: "Variables & Declaration"
language: "perl"
feature: "variables"
category: "basics"
applicable: true
---

Perl variables are sigil-prefixed: `$` for scalars, `@` for arrays, `%` for hashes. `my` declares a lexically scoped variable (recommended); `our` declares a package-level variable; `local` temporarily overrides a global. `use strict` enforces mandatory declaration.

## Example

```perl
use strict;
use warnings;

# Scalar
my $name  = "Alice";
my $age   = 30;
my $pi    = 3.14159;
my $flag  = 1;    # true
my $empty = "";   # false

# Array
my @fruits = ("apple", "banana", "cherry");

# Hash
my %scores = (Alice => 95, Bob => 87);

# References (for complex data structures)
my $aref = [1, 2, 3];        # array reference
my $href = {key => "value"}; # hash reference

# String interpolation
my $greeting = "Hello, $name!";
my $count    = "You have @{[scalar @fruits]} fruits";

# Constants
use constant MAX_RETRIES => 3;
use constant PI          => 3.14159;
```

## Gotchas

- Always use `use strict` and `use warnings` — without `strict`, typos in variable names create new globals silently
- The sigil changes when accessing inside a structure: `$fruits[0]` (scalar from array), not `@fruits[0]`
- `undef` is Perl's null/undefined value; it is false and generates warnings when used in numeric/string context
