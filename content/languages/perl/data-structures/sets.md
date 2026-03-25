---
title: "Sets"
language: "perl"
feature: "sets"
category: "data-structures"
applicable: false
---

Perl does not have a built-in set type. Sets are idiomatically implemented using hash keys (since all hash keys are unique strings). The `Set::Object` and `Set::Scalar` CPAN modules provide proper set objects with standard operations.

## Example

```perl
use strict;
use warnings;

# Hash-as-set pattern (most common)
my %set_a = map { $_ => 1 } (1, 2, 3, 4);
my %set_b = map { $_ => 1 } (3, 4, 5, 6);

# Membership
exists $set_a{3}   # => 1 (true)

# Union
my %union = (%set_a, %set_b);

# Intersection
my %intersect = map { $_ => 1 }
                grep { exists $set_b{$_} } keys %set_a;

# Difference
my %diff = map { $_ => 1 }
           grep { !exists $set_b{$_} } keys %set_a;

# Deduplication of an array
my @dupes  = (1, 2, 2, 3, 3, 3);
my %seen;
my @unique = grep { !$seen{$_}++ } @dupes;
# => (1, 2, 3)

# Set::Object (CPAN)
use Set::Object;
my $a = Set::Object->new(1, 2, 3, 4);
my $b = Set::Object->new(3, 4, 5, 6);
my $u = $a->union($b);
my $i = $a->intersection($b);
```

## Gotchas

- Hash-as-set works only with string keys; objects must be stringified (or use `Set::Object`)
- Hash operations are O(1) for membership, making this pattern efficient for large sets
- `%union = (%a, %b)` simply overwrites duplicate keys — this is fine for sets where all values are `1`
