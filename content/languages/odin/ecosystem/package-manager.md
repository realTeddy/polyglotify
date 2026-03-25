---
title: "Package Manager"
language: "odin"
feature: "package-manager"
category: "ecosystem"
applicable: false
---

Odin has no official package manager. The ecosystem is small and dependencies are typically managed by vendoring (copying source into your project) or by using Git submodules. The community has proposed package managers (like `odin-http`'s approach), but there is no standard tool as of 2025.

## Example

```sh
# Common dependency management approaches:

# 1. Git submodule
git submodule add https://github.com/example/odin-json vendor/odin-json

# 2. Manual clone into vendor/
mkdir -p vendor
git clone https://github.com/example/odin-json vendor/odin-json

# 3. Reference in build command
odin build . -collection:json=vendor/odin-json

# In code:
# import "json"  // maps to vendor/odin-json
```

```odin
// Collections let you namespace vendored packages
// odin build . -collection:libs=./vendor

import "libs:some-library"
import "libs:another-lib"
```

```
# Project with vendored deps layout
my_project/
├── src/
│   └── main.odin
├── vendor/
│   ├── odin-json/
│   └── odin-http/
└── build.sh
```

## Gotchas

- The absence of a package manager is a deliberate stance — Odin encourages small, dependency-light programs.
- The `core:` and `vendor:` collections are built into the compiler; additional collections require a `-collection:` flag.
- Vendoring avoids version conflicts and makes builds reproducible without a lockfile.
- Watch the official Odin Discord and GitHub for any package manager developments.
