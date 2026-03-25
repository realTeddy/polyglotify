---
title: "Exceptions & Try/Catch"
language: "perl"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Perl uses `eval { }` as the try block and `$@` for the caught error. `die` raises an exception (string or object). Modern Perl uses `Try::Tiny` or `Feature::Compat::Try` for cleaner syntax. Errors can be plain strings or exception objects.

## Example

```perl
use strict;
use warnings;

# Traditional eval / $@
eval {
    die "something went wrong\n";
};
if ($@) {
    print "Caught: $@";
}

# Try::Tiny (CPAN — cleaner syntax)
use Try::Tiny;

try {
    die MyException->new("file not found");
} catch {
    if (ref $_ && $_->isa('MyException')) {
        warn "My error: " . $_->message;
    } else {
        die $_;   # rethrow unknown exceptions
    }
} finally {
    print "Cleanup\n";
};

# Custom exception class (Moo-based)
package MyException;
use Moo;
has message => (is => 'ro', required => 1);
sub throw { my $class = shift; die $class->new(@_) }

package main;
use Try::Tiny;

try {
    MyException->throw(message => "oops");
} catch {
    print "Caught: ", $_->message, "\n" if ref $_;
};
```

## Gotchas

- `$@` is reset by many internal Perl operations — always check it immediately after `eval` and save it: `my $err = $@`
- `die "message\n"` (with newline) suppresses "at file line N" from being appended to the error
- `Try::Tiny` passes the exception in `$_`, not `$@`, inside `catch` blocks
