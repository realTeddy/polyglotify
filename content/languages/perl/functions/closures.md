---
title: "Closures & Lambdas"
language: "perl"
feature: "closures"
category: "functions"
applicable: true
---

Perl closures are anonymous subroutines (`sub { ... }`) that capture lexical variables from the enclosing scope. They are stored in scalar variables and called with `->()`. Closures enable factory functions, callbacks, and partial application.

## Example

```perl
use strict;
use warnings;

# Anonymous subroutine (lambda)
my $double = sub { $_[0] * 2 };
$double->(5);   # => 10

# Closure — captures outer lexical variable
sub make_multiplier {
    my ($factor) = @_;
    return sub { $_[0] * $factor };  # captures $factor
}

my $triple = make_multiplier(3);
my $quad   = make_multiplier(4);
$triple->(5);   # => 15
$quad->(5);     # => 20

# Closure maintaining state
sub make_counter {
    my $count = 0;
    return {
        inc => sub { $count++ },
        get => sub { $count },
        reset => sub { $count = 0 },
    };
}

my $counter = make_counter();
$counter->{inc}->();
$counter->{inc}->();
print $counter->{get}->(), "\n";  # => 2

# Passing closures as callbacks
sub apply_to_each {
    my ($callback, @items) = @_;
    return map { $callback->($_) } @items;
}
my @results = apply_to_each(sub { $_[0] ** 2 }, 1..5);
```

## Gotchas

- Each call to `make_multiplier` creates a new closure with its own `$factor` — closures are not shared
- Circular references involving closures can cause memory leaks in older Perls; use `Scalar::Util::weaken`
- Closures capture variables by reference — mutations to the captured variable affect all closures sharing it
