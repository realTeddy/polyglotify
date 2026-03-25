---
title: "Operators"
language: "perl"
feature: "operators"
category: "basics"
applicable: true
---

Perl has separate operators for numeric and string operations to avoid ambiguous context. String concatenation is `.`, repetition is `x`. The `//` defined-or operator provides a default when a value is `undef`. Regex binding operators `=~` and `!~` are core to Perl's string processing strength.

## Example

```perl
use strict;
use warnings;

# Numeric operators
my $x = 10;
$x ** 2;          # => 100 (exponentiation)
$x % 3;           # => 1
int(7.9);         # => 7 (truncate to integer)

# String operators
"Hello" . " World";      # => "Hello World" (concatenation)
"ha" x 3;                # => "hahaha" (repetition)

# Comparison — numeric vs string
5 == 5.0    # true  (numeric)
"5" eq "5.0" # false (string)
5 <=> 3     # => 1  (spaceship: -1, 0, 1)
"b" cmp "a" # => 1  (string spaceship)

# Defined-or (avoids undef)
my $val = undef // "default";   # => "default"
my $port = $config{port} // 80;

# Regex operators
my $str = "Hello World";
$str =~ /World/    and print "match\n";
$str =~ s/World/Perl/;   # substitution in-place
$str =~ tr/a-z/A-Z/;     # transliterate

# Logical (short-circuit)
$a || $b    # first true value
$a && $b    # second value if both true
$a // $b    # $a if defined, else $b
```

## Gotchas

- `||` returns the first truthy value, not necessarily a boolean; `//` is safer when `0` or `""` are valid values
- `==` on strings silently coerces to numbers: `"abc" == 0` is true
- The `//=` operator assigns a default only when the left side is `undef`: `$x //= "default"`
