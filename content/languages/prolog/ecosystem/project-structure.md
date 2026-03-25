---
title: "Project Structure"
language: "prolog"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Prolog projects are collections of `.pl` files (or `.pro`). SWI-Prolog uses `module/2` declarations for encapsulation. A main file loads others with `use_module` or `consult`. There is no standardized project layout, but common patterns emerge for SWI-Prolog applications.

## Example

```
my_prolog_app/
├── main.pl              % Entry point
├── pack.pl              % Pack metadata (if distributing as a pack)
├── prolog/
│   ├── database.pl      % Core knowledge base
│   ├── rules.pl         % Inference rules
│   ├── utils.pl         % Utility predicates
│   └── http_handler.pl  % Web layer (if applicable)
└── tests/
    ├── test_database.pl
    └── test_rules.pl
```

```prolog
% main.pl
:- module(main, [run/0]).

:- use_module(prolog/database).
:- use_module(prolog/rules).
:- use_module(prolog/utils).
:- use_module(library(lists)).

:- initialization(run, main).

run :-
    write('Application started'), nl,
    database:load_data,
    rules:process_all.
```

```prolog
% prolog/utils.pl
:- module(utils, [log/1, format_result/2]).

log(Msg) :-
    format("[LOG] ~w~n", [Msg]).

format_result(ok(V), Str) :-
    format(atom(Str), "OK: ~w", [V]).
format_result(error(E), Str) :-
    format(atom(Str), "ERR: ~w", [E]).
```

```sh
# Run the application
swipl main.pl
swipl -g run main.pl    # run and exit
swipl -l main.pl        # load and enter REPL
```

## Gotchas

- Module names must match the file name by convention (though not required).
- `use_module(library(X))` loads from SWI-Prolog's library; `use_module(path/file)` loads local files.
- Without modules, all predicates are in a global namespace — modules are essential for larger projects.
- `consult(file)` reloads a file (useful during development); `use_module` is for production loading.
