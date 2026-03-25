---
title: "Package Manager"
language: "vlang"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

V uses **VPM** (V Package Manager) at `vpm.vlang.io`. Packages are installed with `v install` and imported by module path. The package index is central; packages can also be installed directly from Git repositories. Dependencies are declared in `v.mod`. V modules are simply directories with `.v` files.

## Example

```bash
# Install a package from VPM
v install vweb

# Install from GitHub
v install https://github.com/user/package

# Install from git directly
v install user.package_name

# Update installed packages
v update

# List installed packages
v list
```

```
// v.mod — package metadata
Module {
    name: 'my_app'
    description: 'My V application'
    version: '0.1.0'
    license: 'MIT'
    dependencies: ['vweb', 'sqlite']
}
```

```v
// Importing an installed module
import vweb

struct App {
    vweb.Context
}

fn (app &App) index() vweb.Result {
    return app.text('Hello from V!')
}
```

## Gotchas

- VPM is less mature than npm, Cargo, or pip; the package ecosystem is smaller.
- Module names use `username.package` format for VPM packages to avoid naming conflicts.
- V's standard library (`os`, `math`, `json`, `net`, etc.) is built-in and does not require installation.
