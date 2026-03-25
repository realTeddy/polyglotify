---
title: "Project Structure"
language: "csharp"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

A C# project is defined by a `.csproj` file. A solution (`.sln`) groups multiple projects. `Program.cs` is the entry point; with top-level statements it needs no class or `Main` method. Source files use PascalCase and match the type they contain. The `Properties/` folder holds `launchSettings.json` for dev configuration. ASP.NET Core adds `appsettings.json` and `Controllers/`, `Services/`, `Models/` by convention.

## Example

```
MyApp/
├── MyApp.sln
├── src/
│   ├── MyApp/
│   │   ├── MyApp.csproj
│   │   ├── Program.cs
│   │   ├── Models/
│   │   │   └── User.cs
│   │   ├── Services/
│   │   │   └── UserService.cs
│   │   └── appsettings.json
│   └── MyApp.Contracts/
│       └── MyApp.Contracts.csproj
└── tests/
    └── MyApp.Tests/
        ├── MyApp.Tests.csproj
        └── Services/
            └── UserServiceTests.cs
```

```csharp
// Program.cs — top-level statements (C# 9+)
using MyApp.Services;

var service = new UserService();
var user = await service.GetUserAsync(1);
Console.WriteLine(user);
```

```xml
<!-- MyApp.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <RootNamespace>MyApp</RootNamespace>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>
</Project>
```

## Gotchas

- The namespace doesn't have to match the folder structure, but by convention (and Roslyn's auto-namespace feature in VS) it should. Mismatches cause confusing import errors.
- `ImplicitUsings` automatically adds common `using` directives (`System`, `System.Collections.Generic`, etc.) — check the generated `.cs.globalusings` file to see what's included.
