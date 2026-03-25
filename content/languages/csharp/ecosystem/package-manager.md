---
title: "Package Manager"
language: "csharp"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

C# and .NET use **NuGet** as the package manager, integrated into the `dotnet` CLI and Visual Studio. Packages are declared in the `.csproj` file under `<PackageReference>`. The `dotnet add package` command resolves and adds packages from nuget.org. `global.json` pins the .NET SDK version. Central Package Management (CPM) via `Directory.Packages.props` is the modern approach for multi-project solutions to pin versions centrally.

## Example

```bash
# Add a package
dotnet add package Newtonsoft.Json
dotnet add package Microsoft.Extensions.Logging --version 8.0.0

# Remove a package
dotnet remove package Newtonsoft.Json

# Restore (download) all packages
dotnet restore

# List outdated packages
dotnet list package --outdated

# Search nuget.org
dotnet package search Serilog
```

```xml
<!-- my-app.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Serilog" Version="4.0.0" />
    <PackageReference Include="Serilog.Sinks.Console" Version="6.0.0" />
    <PackageReference Include="xunit" Version="2.8.0" />
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.10.0" />
  </ItemGroup>
</Project>
```

## Gotchas

- NuGet resolves the lowest compatible version by default (unlike npm's semver ranges). Use floating versions (`*`) sparingly; pin specific versions in production to get reproducible builds.
- The `packages.lock.json` file (opt-in via `<RestorePackagesWithLockFile>true</RestorePackagesWithLockFile>`) locks all transitive dependency versions — commit it for fully reproducible builds.
