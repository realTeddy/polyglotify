---
title: "Package Manager"
language: "dlang"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

D's package manager is **DUB**. It handles dependency resolution, building, and running D projects. Packages are hosted on the [code.dlang.org](https://code.dlang.org) registry. Project metadata is stored in `dub.json` or `dub.sdl`.

## Example

```json
// dub.json
{
    "name": "myapp",
    "description": "A sample D application",
    "authors": ["Alice"],
    "license": "MIT",
    "targetType": "executable",
    "dependencies": {
        "vibe-d": "~>0.9.5",
        "mir-core": "~>1.3"
    },
    "buildRequirements": ["allowWarnings"]
}
```

```bash
# Common DUB commands
dub init myapp          # scaffold a new project
dub build               # compile the project
dub run                 # build and run
dub test                # run unit tests
dub fetch vibe-d        # download a specific package
dub add mir-core        # add dependency to dub.json
dub upgrade             # update all dependencies
dub describe            # show build plan
dub lint                # check style (requires dfmt / dscanner)
```

## Gotchas

- `~>0.9.5` means "compatible with 0.9.x" (semver patch-compatible); `>=0.9.5 <1.0.0` is the explicit equivalent.
- DUB supports both `dub.json` (JSON) and `dub.sdl` (an SDL-like format); `dub.sdl` is often preferred for its readability.
- `dub run` rebuilds only if sources changed, making it fast for iterative development.
- Packages are cached globally in `~/.dub/packages/`; running `dub clean` only cleans the local build output.
