---
title: "Tuples"
language: "perl"
feature: "tuples"
category: "data-structures"
applicable: false
---

Perl does not have tuples. Lists serve as the equivalent — they are flat sequences that can be assigned to multiple variables. Array references can hold fixed-size heterogeneous sequences. Perl's list assignment and `wantarray` make multiple-value returns feel natural.

## Example

```perl
use strict;
use warnings;

# List as tuple — multiple assignment
my ($x, $y) = (10, 20);

# Swap without temp variable
($x, $y) = ($y, $x);

# Returning multiple values from a function
sub divide_with_remainder {
    my ($a, $b) = @_;
    return (int($a / $b), $a % $b);
}

my ($quotient, $remainder) = divide_with_remainder(17, 5);
# $quotient => 3, $remainder => 2

# Array ref as fixed tuple
my $point = [10, 20];       # [x, y]
$point->[0]  # => 10

# Named tuple via hash ref
my $person = { name => "Alice", age => 30 };
$person->{name}  # => "Alice"

# Array of tuples
my @coords = ([0, 0], [1, 2], [3, 4]);
for my $pt (@coords) {
    printf "(%d, %d)\n", $pt->[0], $pt->[1];
}
```

## Gotchas

- Perl lists are flat — `(1, (2, 3))` is the same as `(1, 2, 3)` (list flattening)
- To preserve structure, use array references: `[1, [2, 3]]` keeps the inner list separate
- `wantarray()` inside a function tells you if the caller wants a list or scalar — useful for tuple-like returns
