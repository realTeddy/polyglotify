---
title: "Project Structure"
language: "zig"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Zig projects are structured around `build.zig` (the build script) and `build.zig.zon` (package metadata). Source files live in `src/`. The entry point is `src/main.zig` for executables or `src/root.zig` for libraries. Tests are inline in source files or in a `test/` directory.

## Example

```
my_project/
├── build.zig           # Build script (required)
├── build.zig.zon       # Package manifest + dependencies
├── src/
│   ├── main.zig        # Executable entry point (pub fn main)
│   ├── root.zig        # Library root (for libraries)
│   └── utils.zig       # Additional modules
└── .gitignore
```

```zig
// build.zig — typical setup
const std = @import("std");

pub fn build(b: *std.Build) void {
    const target   = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    // Executable
    const exe = b.addExecutable(.{
        .name             = "my_project",
        .root_source_file = b.path("src/main.zig"),
        .target           = target,
        .optimize         = optimize,
    });
    b.installArtifact(exe);

    // Run step
    const run = b.addRunArtifact(exe);
    const run_step = b.step("run", "Run the app");
    run_step.dependOn(&run.step);

    // Test step
    const tests = b.addTest(.{
        .root_source_file = b.path("src/main.zig"),
        .target           = target,
        .optimize         = optimize,
    });
    const test_step = b.step("test", "Run tests");
    test_step.dependOn(&b.addRunArtifact(tests).step);
}
```

## Gotchas

- `build.zig` is a Zig program itself, not a config file; it has full language expressiveness.
- The `zig-out/` directory contains build artifacts; add it to `.gitignore`.
- `zig-cache/` stores intermediate compilation results; it is safe to delete but speeds up rebuilds.
