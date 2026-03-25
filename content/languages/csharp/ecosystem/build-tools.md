---
title: "Build Tools"
language: "csharp"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

The **`dotnet` CLI** is the primary build tool for C# and .NET projects. It compiles, tests, publishes, and manages packages. Under the hood it uses **MSBuild** for the build engine. For CI/CD, `dotnet publish` produces self-contained or framework-dependent deployments. **Nuke**, **Cake**, and **FAKE** are code-first build orchestration tools for complex pipelines. Docker multi-stage builds are the standard for containerizing .NET apps.

## Example

```bash
# Build
dotnet build                    # debug build
dotnet build -c Release         # release build

# Run
dotnet run                      # build + run
dotnet run --project src/MyApp  # specify project

# Test
dotnet test                     # run all tests
dotnet test --no-build          # skip build
dotnet test --filter "Category=Unit"  # filter tests

# Publish
dotnet publish -c Release -o ./publish
dotnet publish -c Release -r linux-x64 --self-contained  # self-contained

# Format
dotnet format                   # auto-format with Roslyn

# Code analysis
dotnet build /warnaserror        # treat all warnings as errors
```

```dockerfile
# Dockerfile — multi-stage build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

## Gotchas

- `dotnet run` rebuilds on every invocation; in production always `dotnet publish` and run the output directly with `dotnet MyApp.dll` for faster startup.
- MSBuild properties and targets in `.csproj` are very powerful but can become complex. Keep `.csproj` files minimal and use `Directory.Build.props` for shared configuration across a solution.
