---
title: "Common Patterns"
language: "perl"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Perl's expressive idioms include regex-driven text processing, the hash-as-set pattern, Schwartzian transform for efficient sorting, dispatch tables (hash of code refs), and map/grep pipelines. TIMTOWTDI (There Is More Than One Way To Do It) is Perl's guiding philosophy.

## Example

```perl
use strict;
use warnings;

# Schwartzian transform — efficient sort by computed key
my @files = ("file10.txt", "file2.txt", "file1.txt");
my @sorted = map  { $_->[0] }
             sort { $a->[1] <=> $b->[1] }
             map  { [$_, /(\d+)/] }
             @files;

# Dispatch table — hash of code refs
my %dispatch = (
    add  => sub { $_[0] + $_[1] },
    sub  => sub { $_[0] - $_[1] },
    mul  => sub { $_[0] * $_[1] },
);
my $result = $dispatch{add}->(3, 4);  # => 7

# grep / map pipeline
my @words = qw(hello world foo bar baz);
my @long_upper = map  { uc }
                 grep { length > 3 }
                 @words;
# => ("HELLO", "WORLD")

# Chained regex operations
my $text = "  Hello, World!  ";
(my $clean = $text) =~ s/^\s+|\s+$//g;  # trim
$clean =~ s/[^a-zA-Z\s]//g;             # remove punctuation
my @words2 = split /\s+/, $clean;

# Dereferencing in loops
my @records = ({name => "Alice"}, {name => "Bob"});
my @names = map { $_->{name} } @records;
```

## Gotchas

- The Schwartzian transform avoids re-computing the sort key on each comparison — O(n log n) total key computations instead of O(n log n) per comparison
- `(my $copy = $original) =~ s/.../.../` modifies `$copy`, not `$original` — a common Perl idiom for non-destructive regex
- `$_` is the default topic variable; many functions operate on it implicitly when no argument is given
