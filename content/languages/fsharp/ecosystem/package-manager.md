---
title: "Package Manager"
language: "fsharp"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

F# uses **NuGet** as its package manager (shared with C# and the .NET ecosystem). **dotnet CLI** is the standard tool for managing packages, building, and running projects. Packages are declared in `.fsproj` files.

## Example

```bash
# Create a new F# project
dotnet new console -lang F# -n MyProject
dotnet new library -lang F# -n MyLibrary
dotnet new xunit   -lang F# -n MyProject.Tests

# Add a package
dotnet add package Newtonsoft.Json
dotnet add package FSharp.Data
dotnet add package Expecto --version 10.2.1

# Remove a package
dotnet remove package Newtonsoft.Json

# List packages in project
dotnet list package

# Restore packages (e.g., after clone)
dotnet restore

# Search NuGet
dotnet package search FSharp

# Update packages
dotnet add package FSharp.Core   # add latest version
```

```xml
<!-- MyProject.fsproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
  </PropertyGroup>

  <ItemGroup>
    <!-- F# files must be listed in compilation order -->
    <Compile Include="Domain.fs" />
    <Compile Include="Program.fs" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="FSharp.Data"    Version="6.4.0" />
    <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
  </ItemGroup>
</Project>
```

## Gotchas

- F# source files must be listed **in order** in `.fsproj`; a file can only use names defined in earlier files (no forward references across files)
- NuGet packages are cached globally in `~/.nuget/packages`; `dotnet restore` fetches missing ones
- Use `paket` (an alternative to NuGet) for finer-grained dependency management and lock files across large solutions
