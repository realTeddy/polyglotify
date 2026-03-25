---
title: "Package Manager"
language: "zig"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Zig has a built-in package manager introduced in Zig 0.11. Dependencies are declared in `build.zig.zon` (Zig Object Notation). Packages are fetched by URL with a cryptographic hash for reproducibility. There is no central registry; packages are referenced by URL (GitHub, GitLab, etc.). `zig fetch` downloads and hashes a dependency.

## Example

```zig
// build.zig.zon
// .{
//     .name = "my_project",
//     .version = "0.1.0",
//     .dependencies = .{
//         .zap = .{
//             .url = "https://github.com/zigzap/zap/archive/refs/tags/v0.9.0.tar.gz",
//             .hash = "1220...",
//         },
//     },
//     .paths = .{""},
// }
```

```zig
// build.zig — using a dependency
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target   = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name    = "my_app",
        .root_source_file = b.path("src/main.zig"),
        .target   = target,
        .optimize = optimize,
    });

    // Add a dependency
    const zap = b.dependency("zap", .{ .target = target, .optimize = optimize });
    exe.root_module.addImport("zap", zap.module("zap"));

    b.installArtifact(exe);
}
```

```bash
# Fetch a dependency and get its hash
zig fetch --save https://github.com/example/lib/archive/v1.0.tar.gz

# Build
zig build

# Run
zig build run
```

## Gotchas

- There is no central registry; discover packages via `ziglings`, `awesome-zig`, or direct GitHub search.
- The hash in `build.zig.zon` must exactly match the downloaded archive; `zig fetch --save` computes and inserts it.
- The package manager is still evolving; the API may change between Zig versions.
