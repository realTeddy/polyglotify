---
title: "Types & Type Systems"
language: "perl"
feature: "types"
category: "basics"
applicable: true
---

Perl is dynamically typed with a context-sensitive type system. The three data types are scalars, arrays, and hashes. Scalars hold a single value and automatically coerce between strings, numbers, and booleans based on context. There are no explicit type annotations.

## Example

```perl
use strict;
use warnings;

# Scalars — context-sensitive
my $num = 42;
my $str = "hello";

# Numeric context
my $result = $str + 0;   # => 0 (string coerced to number)
my $sum    = "42abc" + 8; # => 50 (leading numeric portion used)

# String context
my $text = $num . " bottles";  # => "42 bottles"

# Boolean context (false: 0, "", "0", undef, empty list)
if ($num)   { print "truthy\n" }  # true
if ($str)   { print "truthy\n" }  # true
if (0)      { ... }               # false
if ("")     { ... }               # false
if ("0")    { ... }               # false (!)
if (undef)  { ... }               # false

# Checking types (runtime)
use Scalar::Util qw(looks_like_number blessed reftype);
looks_like_number("3.14")  # => true
reftype([1,2,3])           # => "ARRAY"
reftype({a => 1})          # => "HASH"
blessed(My::Obj->new())    # => "My::Obj"
```

## Gotchas

- `"0"` is false in boolean context — the only string that is false
- String and numeric equality operators are different: `==` / `!=` for numbers, `eq` / `ne` for strings
- Context (scalar vs list) changes how many values expressions return; `scalar @array` gives the count
