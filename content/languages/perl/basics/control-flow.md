---
title: "Control Flow"
language: "perl"
feature: "control-flow"
category: "basics"
applicable: true
---

Perl supports `if/elsif/else`, `unless`, `while`, `until`, `for`, `foreach`, and `given/when` (experimental). Statement modifiers allow trailing conditionals and loops for concise one-liners. `last`, `next`, and `redo` control loop execution.

## Example

```perl
use strict;
use warnings;

# if / elsif / else
if ($score >= 90) {
    print "A\n";
} elsif ($score >= 80) {
    print "B\n";
} else {
    print "C\n";
}

# unless (inverse if)
print "not found\n" unless $user;

# Postfix/modifier style
print "$_\n" for @fruits;
print "positive\n" if $n > 0;
print "retry\n"    while !$success;

# for / foreach
for my $i (1..5) { print "$i\n" }
foreach my $fruit (@fruits) { print "$fruit\n" }

# while / until
my $n = 0;
while ($n < 5) { print "$n\n"; $n++ }

# Loop control
for my $i (1..10) {
    next if $i % 2 == 0;   # skip even
    last if $i > 7;         # stop at 7
    print "$i\n";
}

# Ternary
my $label = $score >= 60 ? "pass" : "fail";
```

## Gotchas

- `for` and `foreach` are synonymous in Perl; both iterate over a list
- Without `my $var` in the `for` declaration, the loop variable is aliased to `$_` (the topic variable)
- Modifying `$_` inside a `foreach` modifies the original list elements — this is by design but surprising
