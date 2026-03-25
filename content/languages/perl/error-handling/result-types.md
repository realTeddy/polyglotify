---
title: "Result Types"
language: "perl"
feature: "result-types"
category: "error-handling"
applicable: false
---

Perl does not have built-in Result types. The idiomatic approach returns `undef` or `(undef, $error)` for failures. List context returns `(value, undef)` on success and `(undef, $error_message)` on failure — a common pattern for older Perl APIs.

## Example

```perl
use strict;
use warnings;

# Idiomatic Perl: return (undef, error) on failure
sub safe_divide {
    my ($a, $b) = @_;
    return (undef, "Division by zero") if $b == 0;
    return ($a / $b, undef);
}

my ($result, $err) = safe_divide(10, 0);
if (defined $err) {
    print "Error: $err\n";
} else {
    print "Result: $result\n";
}

# Simpler: return undef on failure, check definedness
sub find_user {
    my ($id) = @_;
    return undef unless exists $users{$id};
    return $users{$id};
}

my $user = find_user(42) // "guest";

# Result::Simple (CPAN) for functional-style Result
use Result::Simple qw(Ok Err result_ok result_err result_get);

sub parse_int {
    my ($str) = @_;
    return Err("Not a number: $str") unless $str =~ /^\d+$/;
    Ok(int($str));
}

my $r = parse_int("42");
result_ok($r) ? print "Got: ", result_get($r), "\n"
              : print "Err: ", result_get($r), "\n";
```

## Gotchas

- The `(value, error)` pattern requires callers to always check the second element — easy to ignore
- `undef` return loses error context; prefer the two-element pattern or exception objects for important errors
- CPAN modules like `Result::Simple` and `Type::Result` bring functional Result types to Perl
