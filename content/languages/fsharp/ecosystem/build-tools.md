---
title: "Build Tools"
language: "fsharp"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

F# uses the **dotnet CLI** as its primary build tool. **FAKE** (F# Make) is an F#-based build scripting library. **MSBuild** underpins the dotnet CLI. F# scripts (`.fsx`) can be run directly without a project file.

## Example

```bash
# dotnet CLI (primary)
dotnet build                       # compile
dotnet run                         # build + run
dotnet run --project src/MyApp     # specify project
dotnet publish -c Release          # optimised build + assets
dotnet test                        # run all tests

# Run an F# script directly (no project needed)
dotnet fsi script.fsx
dotnet fsi script.fsx -- arg1 arg2

# Watch mode (rebuild on file change)
dotnet watch run
dotnet watch test

# Pack as NuGet package
dotnet pack -c Release

# Clean build outputs
dotnet clean
```

```fsharp
// build.fsx (FAKE build script)
#r "nuget: FAKE.Core.Target"
#r "nuget: FAKE.DotNet.Cli"

open Fake.Core
open Fake.DotNet

Target.initEnvironment()

Target.create "Clean" (fun _ ->
    DotNet.exec id "clean" "" |> ignore)

Target.create "Build" (fun _ ->
    DotNet.build (fun opts -> { opts with Configuration = DotNet.Release }) ".")

Target.create "Test" (fun _ ->
    DotNet.test id ".")

Target.create "Publish" (fun _ ->
    DotNet.publish (fun opts ->
        { opts with
            Configuration = DotNet.Release
            OutputPath = Some "./publish" }) ".")

open Fake.Core.TargetOperators
"Clean" ==> "Build" ==> "Test" ==> "Publish"

Target.runOrDefault "Build"
```

```bash
# Run FAKE build
dotnet fsi build.fsx
dotnet fsi build.fsx -- --target Test
```

## Gotchas

- `dotnet publish -c Release` applies AOT and trimming; test the published output, as F# reflection-heavy code may break with trimming
- FAKE scripts use `#r "nuget:..."` to reference packages directly — no `.fsproj` required for build scripts
- The `.fsproj` file order matters for compilation; MSBuild respects the `<Compile>` order you specify
