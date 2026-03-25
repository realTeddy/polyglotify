---
title: "Package Manager"
language: "scala"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Scala's de facto build tool and dependency manager is **sbt** (Scala Build Tool). Dependencies are declared in `build.sbt` using Maven coordinates. Libraries are fetched from Maven Central and Sonatype. **Mill** and **Gradle** are alternatives.

## Example

```scala
// build.sbt
ThisBuild / scalaVersion := "3.3.1"
ThisBuild / organization := "com.example"

lazy val root = project
  .in(file("."))
  .settings(
    name := "my-app",
    version := "0.1.0",

    libraryDependencies ++= Seq(
      "org.typelevel"  %% "cats-core"    % "2.10.0",
      "com.typesafe"   %% "akka-actor"   % "2.8.0",
      "org.scalatest"  %% "scalatest"    % "3.2.17" % Test,
    ),

    // Compiler options
    scalacOptions ++= Seq("-deprecation", "-feature")
  )
```

```bash
sbt update          # fetch dependencies
sbt compile
sbt test
sbt run             # run main class
sbt "runMain com.example.Main"
sbt package         # build JAR
sbt publishLocal    # publish to local Maven repo
```

## Gotchas

- `%%` automatically appends the Scala binary version (`_3`, `_2.13`) to the artifact ID
- Use `%` for Java libraries (not Scala cross-published): `"com.google.guava" % "guava" % "32.0"`
- sbt uses an incremental compiler; a clean build (`sbt clean compile`) is sometimes needed after major refactors
