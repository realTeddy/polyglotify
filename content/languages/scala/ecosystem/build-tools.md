---
title: "Build Tools"
language: "scala"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

**sbt** (Scala Build Tool) is the standard build tool for Scala projects. It provides incremental compilation, REPL (`sbt console`), task automation, and plugin ecosystem. **Mill** is a modern alternative with simpler syntax. **Gradle** supports Scala via a plugin for teams already using it.

## Example

```scala
// build.sbt — common settings
import sbtassembly.AssemblyPlugin.autoImport.*

lazy val root = project
  .in(file("."))
  .enablePlugins(AssemblyPlugin)
  .settings(
    name         := "my-app",
    scalaVersion := "3.3.1",
    version      := "1.0.0",

    // Fat JAR settings
    assembly / mainClass          := Some("com.example.Main"),
    assembly / assemblyJarName    := "app.jar",
    assembly / assemblyMergeStrategy := {
      case PathList("META-INF", _*) => MergeStrategy.discard
      case _                        => MergeStrategy.first
    },

    // Compiler options
    scalacOptions ++= Seq(
      "-deprecation",
      "-feature",
      "-Xfatal-warnings"
    )
  )
```

```bash
sbt compile          # incremental compile
sbt test             # run tests
sbt run              # run default main
sbt assembly         # build fat JAR
sbt ~compile         # watch mode
sbt "project core" compile
```

## Gotchas

- sbt's incremental compiler is fast for single-module projects but can be slow in large multi-module builds
- `sbt ~taskName` watches source files and re-runs the task on every change
- The `project/plugins.sbt` file declares sbt plugins, which are themselves sbt projects resolved via Ivy
