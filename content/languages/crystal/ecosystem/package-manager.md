---
title: "Package Manager"
language: "crystal"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Crystal uses **Shards** as its package manager. Dependencies are declared in `shard.yml` and locked in `shard.lock`. Packages (called "shards") are fetched from Git repositories (commonly GitHub). There is no central registry; shards are referenced by their Git URL. The `shards` CLI installs, updates, and checks dependencies.

## Example

```yaml
# shard.yml
name: my_app
version: 0.1.0

authors:
  - Alice <alice@example.com>

dependencies:
  kemal:
    github: kemalcr/kemal
    version: ~> 1.4

  jennifer:
    github: imdrasil/jennifer.cr
    version: ~> 0.12

development_dependencies:
  webmock:
    github: manastech/webmock.cr

crystal: ">= 1.0.0"
```

```bash
# Install all dependencies
shards install

# Update dependencies (within version constraints)
shards update

# Add a new dependency (edit shard.yml then install)
shards install

# Check if installed shards match shard.yml
shards check

# Build the project
shards build
```

## Gotchas

- There is no central registry; all shards must be reachable via Git URL, which means availability depends on the hosting service.
- Version constraints use `~>` (pessimistic): `~> 1.4` means `>= 1.4.0, < 2.0.0`.
- `shard.lock` should be committed for applications; libraries conventionally omit it.
