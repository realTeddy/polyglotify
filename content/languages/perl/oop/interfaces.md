---
title: "Interfaces & Traits"
language: "perl"
feature: "interfaces"
category: "oop"
applicable: false
---

Perl has no formal interface or trait keyword. Duck typing is the norm — if an object has a method, it works. Roles are the Perl equivalent of traits and are provided by `Moose::Role` or `Role::Tiny`. A role defines required methods and can be composed into multiple classes.

## Example

```perl
use strict;
use warnings;

# Role::Tiny — lightweight roles/traits
package Serializable;
use Role::Tiny;

requires 'to_hash';   # classes must implement this

sub serialize {
    my $self = shift;
    require JSON;
    JSON::encode_json($self->to_hash);
}

package Printable;
use Role::Tiny;
sub print_info { print $_[0]->to_string(), "\n" }

# Compose roles into a class
package User;
use Moo;
use Role::Tiny::With;
with 'Serializable', 'Printable';

has name  => (is => 'ro', required => 1);
has email => (is => 'ro', required => 1);

sub to_hash   { { name => $_[0]->name, email => $_[0]->email } }
sub to_string { "User: " . $_[0]->name . " <" . $_[0]->email . ">" }

package main;
my $u = User->new(name => "Alice", email => "alice@example.com");
$u->print_info();
print $u->serialize(), "\n";
```

## Gotchas

- `requires 'method'` in a `Role::Tiny` role causes a compile-time error if the consuming class does not provide the method
- Roles are composed (flattened into the class), not inherited — there is no runtime dispatch through a role chain
- `Moose::Role` provides additional features like attribute modifiers and method conflict resolution
