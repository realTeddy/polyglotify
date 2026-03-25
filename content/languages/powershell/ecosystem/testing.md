---
title: "Testing"
language: "powershell"
feature: "testing"
category: "ecosystem"
applicable: true
---

**Pester** is the de facto testing framework for PowerShell, installed by default on Windows 10+ and available on PowerShell Gallery. Tests use `Describe`, `Context`, `It`, `BeforeAll`, `BeforeEach`, and `Should` assertion blocks. Pester 5 supports parameterised tests, mock injection with `Mock`, and code coverage reporting. **PSScriptAnalyzer** provides static analysis.

## Example

```powershell
# Get-User.Tests.ps1
BeforeAll {
    # Import the module under test
    Import-Module "$PSScriptRoot/../MyModule.psd1" -Force
}

Describe "Get-User" {
    Context "When user exists" {
        BeforeEach {
            Mock Invoke-ApiRequest {
                [PSCustomObject]@{ Id = 1; Name = "Alice"; Role = "admin" }
            }
        }

        It "Returns a user object" {
            $user = Get-User -Id 1
            $user | Should -Not -BeNullOrEmpty
            $user.Name | Should -Be "Alice"
        }

        It "Returns correct role" {
            $user = Get-User -Id 1
            $user.Role | Should -Be "admin"
        }
    }

    Context "When user not found" {
        BeforeEach {
            Mock Invoke-ApiRequest { return $null }
        }

        It "Returns null" {
            Get-User -Id 999 | Should -BeNullOrEmpty
        }
    }

    Context "Parameter validation" {
        It "Throws on invalid Id" {
            { Get-User -Id -1 } | Should -Throw
        }
    }
}
```

```powershell
# Run tests
Invoke-Pester -Path ./tests/ -Output Detailed
Invoke-Pester -Path ./tests/ -CodeCoverage ./Public/*.ps1
```

## Gotchas

- `Mock` replaces a command for the duration of the test; it only works for commands (cmdlets, functions) discoverable by PowerShell — it cannot mock .NET static methods directly.
- Pester 5's `Should` syntax requires the `-` prefix (`-Be`, `-Not`, `-Throw`); the old Pester 4 syntax (`Should Be`, `Should Not`) still works but is deprecated.
- Always import the module with `-Force` in `BeforeAll` to ensure a fresh load; without it, a cached version from a previous test run may be used.
