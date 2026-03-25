---
title: "Classes"
language: "perl"
feature: "classes"
category: "oop"
applicable: true
---

Perl OOP is built on `package` namespaces and `bless`. A class is a package; an object is a blessed reference. Modern Perl uses `Moose` (full-featured), `Moo` (lightweight), or the built-in `class` keyword from Perl 5.38+.

## Example

```perl
use strict;
use warnings;

# Perl 5.38+ native class syntax
use feature 'class';
no warnings 'experimental::class';

class BankAccount {
    field $owner   :param;
    field $balance :param = 0;

    method deposit($amount) {
        die "Amount must be positive" if $amount <= 0;
        $balance += $amount;
        return $self;
    }

    method withdraw($amount) {
        die "Insufficient funds" if $amount > $balance;
        $balance -= $amount;
        return $self;
    }

    method balance { $balance }
    method owner   { $owner  }

    method to_string {
        "BankAccount($owner: \$$balance)"
    }
}

my $acct = BankAccount->new(owner => "Alice", balance => 100);
$acct->deposit(50);
print $acct->balance(), "\n";  # => 150
print $acct->to_string(), "\n";
```

## Gotchas

- The native `class` feature (Perl 5.38+) is still experimental; use `Moose` or `Moo` for production code on older Perls
- `$self` is automatically available inside `method` blocks in the native class syntax
- In traditional Perl OOP, `$self = shift` is the first line of every method to extract the object
