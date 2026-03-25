---
title: "Return Values"
language: "perl"
feature: "return-values"
category: "functions"
applicable: true
---

Perl functions implicitly return the last evaluated expression. `return` enables early exit. Functions are context-sensitive — they can return different things based on whether they are called in scalar or list context. Returning multiple values as a list is natural.

## Example

```perl
use strict;
use warnings;

# Implicit return
sub double { $_[0] * 2 }

# Explicit return for early exit
sub safe_divide {
    my ($a, $b) = @_;
    return undef if $b == 0;
    $a / $b;
}

# Multiple return values (as list)
sub min_max {
    my @nums = @_;
    my $min = $nums[0];
    my $max = $nums[0];
    for (@nums) {
        $min = $_ if $_ < $min;
        $max = $_ if $_ > $max;
    }
    return ($min, $max);   # return a list
}

my ($lo, $hi) = min_max(3, 1, 4, 1, 5);

# Context-sensitive return
sub items {
    my @list = (1, 2, 3);
    return wantarray ? @list : scalar @list;
}

my @all   = items();       # list context: (1, 2, 3)
my $count = items();       # scalar context: 3

# Return a hash
sub get_config {
    return (host => "localhost", port => 80);
}
my %cfg = get_config();
```

## Gotchas

- `wantarray()` returns true in list context, false in scalar context — use it for context-sensitive functions
- Returning `undef` vs returning an empty list is significant: `() = func()` vs `$x = func()`
- `return;` (bare) returns `undef` in scalar context and an empty list in list context
