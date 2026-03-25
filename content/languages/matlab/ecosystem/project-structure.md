---
title: "Project Structure"
language: "matlab"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

MATLAB projects are organized as directories of `.m` files. MATLAB Projects (`.prj`, available since R2019a) provide structured project management with path setup, startup/shutdown scripts, and source control integration. Classes live in `@ClassName/` folders or single `classdef` files. Packages use `+packagename/` folders.

## Example

```
my_project/
├── my_project.prj         % MATLAB Project file (R2019a+)
├── startup_project.m      % Runs on project open
├── shutdown_project.m     % Runs on project close
│
├── src/                   % Production code
│   ├── +myapp/            % Package folder (+prefix)
│   │   ├── core.m         % myapp.core
│   │   └── utils.m        % myapp.utils
│   ├── @MyClass/          % Class folder (alternative to classdef file)
│   │   ├── MyClass.m      % Constructor
│   │   └── my_method.m    % Method
│   └── MyOtherClass.m     % Single-file classdef
│
├── test/                  % Unit tests
│   └── TestMyClass.m
│
├── data/                  % Data files
│   └── sample.mat
│
└── docs/                  % Documentation
```

```matlab
% startup_project.m — sets up paths
addpath(genpath(fullfile(pwd, 'src')))
disp('Project loaded')
```

```matlab
% Using packages (+ folders)
% src/+myapp/greet.m
function greet(name)
    fprintf('Hello, %s!\n', name)
end

% Call with namespace:
myapp.greet('Alice')
```

## Gotchas

- Package folders must start with `+`. Calling functions in packages requires the package prefix: `pkg.function()`.
- `@ClassName/` folders allow splitting a class across multiple files (one per method), but single-file `classdef` is more common.
- MATLAB's path is global — name conflicts between files in different directories are resolved by path order.
- Use MATLAB Projects (`.prj`) in teams to ensure consistent path setup and source control configuration.
