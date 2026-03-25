---
title: "Project Structure"
language: "scala"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Scala projects follow Maven directory conventions (driven by sbt). Source files live in `src/main/scala`, tests in `src/test/scala`. Multi-module projects declare sub-projects in `build.sbt`. The `project/` directory contains sbt build settings and plugins.

## Example

```
my-project/
├── build.sbt                  # build definition
├── project/
│   ├── build.properties       # sbt version: sbt.version=1.9.7
│   └── plugins.sbt            # sbt plugins
├── src/
│   ├── main/
│   │   ├── scala/
│   │   │   └── com/example/
│   │   │       ├── Main.scala
│   │   │       ├── models/
│   │   │       └── services/
│   │   └── resources/
│   │       └── application.conf
│   └── test/
│       ├── scala/
│       │   └── com/example/
│       │       └── MainSpec.scala
│       └── resources/
└── target/                    # compiled output (gitignored)

# Multi-module build.sbt
lazy val core = project.in(file("core"))
lazy val api  = project.in(file("api")).dependsOn(core)
lazy val root = project.in(file(".")).aggregate(core, api)
```

## Gotchas

- `project/` is itself an sbt project — `project/project/` is the meta-meta build level
- Package names should match directory structure: `com.example.models` → `src/main/scala/com/example/models/`
- `target/` grows large; always add it to `.gitignore`
