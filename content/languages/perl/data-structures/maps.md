---
title: "Maps & Dictionaries"
language: "perl"
feature: "maps"
category: "data-structures"
applicable: true
---

Perl hashes (`%hash`) are unordered key-value stores. Keys are strings; values are scalars. Hash references (`\%hash` or `{...}`) enable nested data structures. The fat comma `=>` is syntactic sugar for a quoted string followed by a comma.

## Example

```perl
use strict;
use warnings;

# Hash creation
my %scores = (Alice => 95, Bob => 87, Carol => 92);

# Access — use $ sigil for single value
$scores{Alice}       # => 95
$scores{Unknown}     # => undef (no error)

# Mutation
$scores{Dave}  = 88;
delete $scores{Bob};

# Existence check
exists $scores{Alice}   # => 1 (true)
defined $scores{Alice}  # => 1 (value is defined)

# Keys / values / each
my @keys   = keys   %scores;
my @vals   = values %scores;
while (my ($name, $score) = each %scores) {
    print "$name: $score\n";
}

# Hash slice
my @selected = @scores{qw(Alice Carol)};   # => (95, 92)

# Hash reference
my $config = { host => "localhost", port => 80 };
$config->{host}      # => "localhost"
$config->{port} = 443;

# Nested structure
my %data = ( users => [{ name => "Alice" }, { name => "Bob" }] );
$data{users}[0]{name}  # => "Alice"
```

## Gotchas

- Hash keys are always strings in Perl — numeric keys are silently stringified
- Accessing a non-existent key returns `undef` and creates the key via autovivification in certain contexts
- `keys %hash` returns keys in arbitrary order; use `sort keys %hash` for consistent output
