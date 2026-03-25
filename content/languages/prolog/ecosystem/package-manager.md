---
title: "Package Manager"
language: "prolog"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

SWI-Prolog has a built-in package manager: **SWI-Prolog Pack system**. Packs are installed via `pack_install/1` and listed on the official SWI-Prolog Pack registry. Packs are collections of Prolog files and optional C extensions. Other Prolog implementations (GNU Prolog, SICStus) have separate, less developed package ecosystems.

## Example

```prolog
% Install a pack (run in SWI-Prolog REPL or script)
:- pack_install(julian).        % date/time library
:- pack_install(http).          % HTTP client/server
:- pack_install(pcre).          % PCRE regex
:- pack_install(list_util).     % extra list utilities

% Use installed pack
:- use_module(library(list_util)).

% List installed packs
:- pack_list_installed.

% Check for updates
:- pack_upgrade(julian).
```

```sh
# From the command line
swipl -g "pack_install(julian)" -g halt

# Interactive installation
swipl
?- pack_install(http).
% Installs to ~/.local/share/swi-prolog/pack/ (Linux/Mac)
% or %APPDATA%/SWI-Prolog/pack/ (Windows)
```

```
# Pack directory structure
my_pack/
├── pack.pl         % Pack metadata
├── prolog/         % Prolog source files
│   └── my_module.pl
└── c/              % Optional C extensions
    └── my_ext.c
```

## Gotchas

- The SWI-Prolog Pack registry is at `https://www.swi-prolog.org/pack/list` — not all packs are actively maintained.
- Packs are installed per-user, not per-project — there is no lockfile or version pinning mechanism.
- `pack_install` downloads and installs from the internet; use `pack_install(Name, [url(URL)])` for local installs.
- GNU Prolog, SICStus, and other implementations have no standard package manager.
