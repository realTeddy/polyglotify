---
title: "Style Conventions"
language: "perl"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Perl style follows **PBP** (Perl Best Practices by Damian Conway) and is enforced by **Perl::Critic** (linter) and **Perl::Tidy** (formatter). Key conventions: always `use strict` and `use warnings`, `snake_case` for variables/functions, `CamelCase` for modules, four-space indentation.

## Example

```perl
#!/usr/bin/env perl
use strict;
use warnings;
use 5.020;   # minimum Perl version

# snake_case for variables and functions
my $user_name = "Alice";
my @file_paths;
my %config_map;

sub calculate_total { ... }
sub find_by_email   { ... }

# CamelCase for package/module names
package MyApp::UserService;

# Constants: UPPER_SNAKE_CASE
use constant {
    MAX_RETRIES  => 3,
    DEFAULT_PORT => 8080,
};

# Meaningful variable names (avoid $x, $tmp)
# Use curlies for complex derefs
my @users = @{$config->{users}};

# Prefer postfix derefs (Perl 5.20+)
use feature 'postderef';
my @items = $arrayref->@*;
my %opts  = $hashref->%*;

# Heredoc for multi-line strings
my $sql = <<~'END_SQL';
    SELECT *
    FROM users
    WHERE active = 1
    END_SQL
```

## Gotchas

- `use strict` and `use warnings` at the top of every file — non-negotiable for maintainable code
- `Perl::Critic` can be configured with a `.perlcriticrc`; `perlcritic --brutal` enables strictest checks
- `Perl::Tidy` uses a `.perltidyrc` for style configuration; defaults to 4-space indentation and 78-char lines
