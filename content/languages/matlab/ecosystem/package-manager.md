---
title: "Package Manager"
language: "matlab"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

MATLAB uses **Add-On Explorer** (GUI) and `matlab.addons` (programmatic) as its package ecosystem. The community also uses **MATLAB File Exchange**. For open-source MATLAB/Octave compatibility, no standardized CLI package manager exists, though the community tool `mpm` (MATLAB Package Manager) provides basic functionality.

## Example

```matlab
% Built-in Add-On management (R2016b+)
% Via GUI: Home tab -> Add-Ons -> Get Add-Ons

% Programmatic add-on management
addons = matlab.addons.installedAddons()  % list installed add-ons

% Install from Add-On Explorer programmatically
% (requires internet access)
matlab.addons.install('path/to/addon.mltbx')

% Check if a toolbox is installed
ver('Statistics and Machine Learning Toolbox')
license('test', 'Statistics_Toolbox')  % returns 1 if licensed

% Add paths manually (common for File Exchange downloads)
addpath('/path/to/library')
addpath(genpath('/path/to/library'))  % recursive
savepath()  % persist across sessions

% Community tool: mpm (MATLAB Package Manager)
% https://github.com/mobeets/mpm
% mpm install matlab-json
% mpm install export_fig

% Project-local dependencies: put code in a packages/ folder
% and add to path in startup.m or project setup script
```

## Gotchas

- MATLAB's toolboxes (Statistics, Signal Processing, etc.) are commercial add-ons — licensed separately from base MATLAB.
- `addpath` changes the search path for the current session only; `savepath` persists it to `pathdef.m`.
- File Exchange packages are installed manually by downloading and adding to the path.
- Octave uses a separate package system: `pkg install -forge package_name` for Octave Forge packages.
