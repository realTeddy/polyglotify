---
title: "Parameters & Arguments"
language: "perl"
feature: "parameters"
category: "functions"
applicable: true
---

Perl passes all arguments as a flat list in `@_`. Named parameters are simulated by passing a hash or list of key-value pairs. Default values are handled manually with `//=`. Perl 5.36+ provides native function signatures with defaults.

## Example

```perl
use strict;
use warnings;

# Traditional parameter unpacking
sub create_user {
    my ($name, $role, $active) = @_;
    $role   //= "guest";    # default
    $active //= 1;
    return { name => $name, role => $role, active => $active };
}
my $u = create_user("Alice");
my $v = create_user("Bob", "admin", 0);

# Named parameters via hash
sub configure {
    my (%opts) = @_;
    my $host  = delete $opts{host}  // "localhost";
    my $port  = delete $opts{port}  // 80;
    "$host:$port"
}
configure(host => "example.com", port => 443);

# Variadic — all remaining args
sub sum {
    my $total = 0;
    $total += $_ for @_;
    $total
}
sum(1, 2, 3, 4, 5);  # => 15

# Perl 5.36+ signatures
use feature 'signatures';
sub greet($name, $greeting = "Hello") {
    "$greeting, $name!"
}
```

## Gotchas

- `@_` contains aliases to the caller's variables — modifying `$_[0]` directly modifies the caller's variable
- Passing a hash as named parameters flattens it: `configure(%config)` is the same as `configure(key => val, ...)`
- Subroutine prototypes (e.g., `sub f($$)`) look like signatures but are not — they affect parsing, not runtime
