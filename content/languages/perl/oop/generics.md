---
title: "Generics"
language: "perl"
feature: "generics"
category: "oop"
applicable: false
---

Perl does not have generics. Dynamic typing and duck typing make type-parameterized containers unnecessary — Perl arrays and hashes can hold any scalar value. `Moose` and `Moo` provide type constraints (`isa`) that partially replicate generic type safety at runtime.

## Example

```perl
use strict;
use warnings;

# Perl containers are inherently generic — no type parameter needed
my @integers = (1, 2, 3);
my @strings  = ("a", "b", "c");
my @mixed    = (1, "two", [3], {four => 4});  # all valid

# Duck-typed generic container
package TypedStack;
use Moo;
use Scalar::Util qw(blessed);

has type  => (is => 'ro', required => 1);
has _data => (is => 'ro', default  => sub { [] });

sub push_item {
    my ($self, $item) = @_;
    die "Wrong type" unless blessed($item) && $item->isa($self->type);
    push @{$self->_data}, $item;
}

sub pop_item { pop @{$_[0]->_data} }

# Moose type constraints
use Moose;
has items => (
    is  => 'ro',
    isa => 'ArrayRef[Int]',   # runtime type check
);

# Type::Tiny for powerful parameterized types
use Types::Standard qw(ArrayRef Int);
my $IntList = ArrayRef[Int];
$IntList->check([1, 2, 3]);     # => 1 (valid)
$IntList->check([1, "two", 3]); # => "" (invalid)
```

## Gotchas

- Runtime type checks via `Moose` or `Type::Tiny` add overhead; use them for public APIs, not internal code
- `isa` in string form (`'ArrayRef[Int]'`) is a Moose-specific feature using `MooseX::Types`
- Duck typing is idiomatic Perl — design for behavior, not types
