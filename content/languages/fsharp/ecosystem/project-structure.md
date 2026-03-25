---
title: "Project Structure"
language: "fsharp"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

F# projects use the standard .NET project format (`.fsproj`). A critical distinction from C# is that **F# files are compiled in the order they appear in the project file** — later files can use earlier ones, but not vice versa. Typical projects use a solution (`.sln`) to group multiple projects.

## Example

```
MyApp/
├── MyApp.sln                   -- solution grouping all projects
├── src/
│   ├── MyApp.Domain/
│   │   ├── MyApp.Domain.fsproj
│   │   ├── Types.fs            -- must come first (no forward refs)
│   │   ├── Validation.fs       -- can use Types
│   │   └── Services.fs         -- can use Types + Validation
│   └── MyApp.Web/
│       ├── MyApp.Web.fsproj
│       └── Program.fs
└── tests/
    └── MyApp.Tests/
        ├── MyApp.Tests.fsproj
        └── DomainTests.fs
```

```fsharp
// src/MyApp.Domain/Types.fs
module MyApp.Domain.Types

type UserId = UserId of int
type User = { Id: UserId; Name: string; Email: string }
```

```fsharp
// src/MyApp.Domain/Services.fs
module MyApp.Domain.Services

open MyApp.Domain.Types   // can use Types.fs because it's listed first

let createUser id name email =
    { Id = UserId id; Name = name; Email = email }
```

```xml
<!-- src/MyApp.Domain/MyApp.Domain.fsproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
  </PropertyGroup>
  <ItemGroup>
    <Compile Include="Types.fs" />       <!-- first -->
    <Compile Include="Validation.fs" />  <!-- second -->
    <Compile Include="Services.fs" />    <!-- third -->
  </ItemGroup>
</Project>
```

## Gotchas

- **File ordering is critical**: if `Services.fs` is listed before `Types.fs`, the build fails
- Use `dotnet sln add` to add projects to the solution file
- The convention is to put general/foundational types early and higher-level code later in the file list
