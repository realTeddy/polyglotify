---
title: "Structs & Classes"
language: "perl"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Perl implements structs and classes by blessing a hash reference into a package namespace. The `bless` function associates a reference with a class. Modern Perl uses `Moose`, `Moo`, or `Class::Accessor` to reduce boilerplate and provide proper OOP features.

## Example

```perl
use strict;
use warnings;

# Traditional blessed hash (manual struct/class)
package Point;
sub new {
    my ($class, $x, $y) = @_;
    return bless { x => $x, y => $y }, $class;
}
sub x { $_[0]->{x} }
sub y { $_[0]->{y} }
sub to_string { "Point($_[0]->{x}, $_[0]->{y})" }

package main;
my $p = Point->new(3, 4);
print $p->to_string(), "\n";

# Moo (modern, lightweight)
package Person;
use Moo;

has name  => (is => 'ro', required => 1);
has age   => (is => 'rw', default  => 0);
has email => (is => 'ro');

sub greet { "Hello, I'm " . $_[0]->name }

package main;
my $alice = Person->new(name => "Alice", age => 30);
print $alice->greet(), "\n";
$alice->age(31);        # setter
print $alice->age(), "\n";  # getter
```

## Gotchas

- `bless` does not enforce structure — any hash can be blessed into any class
- Without `Moose`/`Moo`, accessors must be written manually; each `sub` is a getter/setter
- `is => 'ro'` (read-only) vs `is => 'rw'` (read-write) vs `is => 'rwp'` (write from within class) in Moo
