---
title: "Function Declaration"
language: "perl"
feature: "declaration"
category: "functions"
applicable: true
---

Perl functions are declared with `sub`. They receive all arguments via the `@_` array. Functions return the last evaluated expression or an explicit `return`. Perl 5.20+ supports function signatures with `use feature 'signatures'`.

## Example

```perl
use strict;
use warnings;

# Basic subroutine
sub greet {
    my ($name) = @_;   # unpack arguments from @_
    return "Hello, $name!";
}
print greet("Alice"), "\n";

# Multiple parameters
sub add {
    my ($a, $b) = @_;
    $a + $b;   # implicit return of last expression
}

# Named function with default (traditional)
sub connect {
    my (%args) = @_;
    my $host = $args{host} // "localhost";
    my $port = $args{port} // 80;
    "$host:$port"
}
connect(host => "example.com", port => 443);

# Signatures (Perl 5.36+, stable)
use feature 'signatures';
no warnings 'experimental::signatures';

sub multiply($a, $b) { $a * $b }

# Anonymous subroutine
my $square = sub { $_[0] ** 2 };
$square->(5);   # => 25
```

## Gotchas

- Always unpack `@_` with `my ($a, $b) = @_` — relying on `$_[0]` directly is fragile and less readable
- Subroutines can be called before they are defined (predeclared), but it is clearer to define them first
- Perl does not enforce parameter count; extra arguments are silently ignored without signatures
