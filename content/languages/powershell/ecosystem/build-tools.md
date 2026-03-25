---
title: "Build Tools"
language: "powershell"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

**PSake** and **Invoke-Build** are the two primary PowerShell-native build automation frameworks, inspired by Rake and Make respectively. **Invoke-Build** is the more modern and widely used choice. Both define tasks with dependencies in a script file (`.build.ps1`). For CI/CD, PowerShell scripts integrate natively with GitHub Actions, Azure Pipelines, GitLab CI, and Jenkins.

## Example

```powershell
# .build.ps1 (Invoke-Build)
# Install: Install-Module InvokeBuild -Scope CurrentUser

param(
    [string]$Version = "1.0.0"
)

task Clean {
    Remove-Item ./output -Recurse -Force -ErrorAction Ignore
    New-Item ./output -ItemType Directory | Out-Null
}

task Lint {
    $results = Invoke-ScriptAnalyzer -Path ./Public -Recurse -Severity Warning,Error
    if ($results) {
        $results | Format-Table
        throw "Script analysis failed"
    }
    Write-Host "Lint passed"
}

task Test {
    $config = New-PesterConfiguration
    $config.Run.Path = "./tests"
    $config.Output.Verbosity = "Detailed"
    $config.CodeCoverage.Enabled = $true
    $result = Invoke-Pester -Configuration $config
    if ($result.FailedCount -gt 0) { throw "Tests failed" }
}

task Build Clean, Lint, Test, {
    Copy-Item ./MyModule* ./output/ -Recurse
    Write-Host "Build complete: v$Version"
}

task . Build   # default task
```

```powershell
# Run tasks
Invoke-Build            # default task
Invoke-Build Test       # single task
Invoke-Build Build -Version "2.0.0"
```

## Gotchas

- Invoke-Build tasks run in the script's scope, not isolated scopes; variables set in one task are visible in subsequent tasks unless explicitly scoped.
- `throw` inside a task marks it as failed and stops the build; use `-Safe` flag on `Invoke-Build` to continue after failures and inspect results.
- In CI environments, ensure `$ErrorActionPreference = 'Stop'` is set at the top of build scripts so that uncaught non-terminating errors fail the build.
