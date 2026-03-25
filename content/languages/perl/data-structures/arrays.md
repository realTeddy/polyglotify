---
title: "Arrays & Lists"
language: "perl"
feature: "arrays"
category: "data-structures"
applicable: true
---

Perl arrays (`@arr`) are dynamic, ordered, and zero-indexed. They resize automatically. `push`/`pop` for stack operations, `shift`/`unshift` for queue operations. Array references (`\@arr` or `[...]`) are needed for nested data structures.

## Example

```perl
use strict;
use warnings;

# Array creation
my @nums  = (1, 2, 3, 4, 5);
my @words = qw(apple banana cherry);   # qw = quote words

# Access (0-indexed)
$nums[0]      # => 1 (scalar sigil $)
$nums[-1]     # => 5 (last element)
@nums[1..3]   # => (2, 3, 4) (slice)

# Mutation
push @nums, 6;        # append
my $last = pop @nums; # remove last
unshift @nums, 0;     # prepend
my $first = shift @nums;  # remove first
splice(@nums, 1, 2);  # remove 2 elements at index 1

# Common operations
my $len = scalar @nums;   # length
my @sorted = sort { $a <=> $b } @nums;
my @reversed = reverse @nums;
my @unique = do { my %seen; grep { !$seen{$_}++ } @nums };
my @doubled = map { $_ * 2 } @nums;
my @even    = grep { $_ % 2 == 0 } @nums;

# Join / split
my $str  = join(", ", @words);   # => "apple, banana, cherry"
my @parts = split(/,\s*/, $str); # split string into array
```

## Gotchas

- When accessing an array element, use `$` sigil (scalar), not `@`: `$arr[0]`, not `@arr[0]`
- `@arr` in scalar context gives the count: `if (@arr)` checks if non-empty
- Array slices `@arr[1,3]` use `@` sigil and return a list
