---
title: "Inheritance"
language: "perl"
feature: "inheritance"
category: "oop"
applicable: true
---

Perl inheritance is implemented via the `@ISA` array or the `parent`/`base` pragmas. Method resolution follows the `@ISA` chain (depth-first by default; C3 MRO with `use mro 'c3'`). `SUPER::` calls a parent method.

## Example

```perl
use strict;
use warnings;

# Parent class
package Animal;
sub new {
    my ($class, %args) = @_;
    return bless { name => $args{name} }, $class;
}
sub name  { $_[0]->{name} }
sub speak { "..." }
sub describe {
    my $self = shift;
    printf "%s(%s) says: %s\n", ref($self), $self->name, $self->speak;
}

# Child class using parent pragma
package Dog;
use parent -norequire, 'Animal';

sub speak { "Woof" }
sub fetch {
    my ($self, $item) = @_;
    $self->name . " fetches the $item";
}

# Further subclass
package GuideDog;
use parent -norequire, 'Dog';

sub new {
    my ($class, %args) = @_;
    my $self = $class->SUPER::new(%args);
    $self->{owner} = $args{owner};
    $self
}
sub speak { $_[0]->SUPER::speak() . " (gently)" }

package main;
my $g = GuideDog->new(name => "Rex", owner => "Bob");
$g->describe();        # => GuideDog(Rex) says: Woof (gently)
print ref($g), "\n";   # => GuideDog
$g->isa("Animal");     # => 1 (true)
```

## Gotchas

- Default MRO in Perl 5 is DFS (depth-first search); use `use mro 'c3'` for diamond inheritance correctness
- `SUPER::method()` must be called as `$self->SUPER::method()` — calling as `SUPER::method($self)` bypasses dispatch
- Forgetting `use parent` and setting `@ISA` directly is valid but less readable
