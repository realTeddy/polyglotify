---
title: "Testing"
language: "csharp"
feature: "testing"
category: "ecosystem"
applicable: true
---

C# has three main test frameworks: **xUnit** (preferred for .NET Core/5+), **NUnit**, and **MSTest**. xUnit uses `[Fact]` for single tests and `[Theory]` with `[InlineData]` for parameterized tests. **FluentAssertions** provides readable assertion syntax. **Moq** or **NSubstitute** handle mocking. Tests run via `dotnet test` and integrate with CI pipelines automatically.

## Example

```csharp
// Tests/UserServiceTests.cs
using Xunit;
using FluentAssertions;
using NSubstitute;

public class UserServiceTests {
    private readonly IUserRepository _repo = Substitute.For<IUserRepository>();
    private readonly UserService _sut;

    public UserServiceTests() {
        _sut = new UserService(_repo);
    }

    [Fact]
    public async Task GetUser_ReturnsUser_WhenExists() {
        // Arrange
        var expected = new User(1, "Alice", "alice@example.com");
        _repo.FindByIdAsync(1).Returns(expected);

        // Act
        var result = await _sut.GetUserAsync(1);

        // Assert
        result.Should().NotBeNull();
        result!.Name.Should().Be("Alice");
    }

    [Fact]
    public async Task GetUser_ReturnsNull_WhenNotFound() {
        _repo.FindByIdAsync(99).Returns((User?)null);
        var result = await _sut.GetUserAsync(99);
        result.Should().BeNull();
    }

    [Theory]
    [InlineData("", false)]
    [InlineData("   ", false)]
    [InlineData("valid@email.com", true)]
    public void IsValidEmail_ReturnsExpected(string email, bool expected) {
        UserService.IsValidEmail(email).Should().Be(expected);
    }
}
```

## Gotchas

- xUnit creates a new instance per test class by default; use `IClassFixture<T>` to share expensive setup (like database connections) across tests in a class.
- `FluentAssertions` `Should().BeEquivalentTo()` uses structural (deep) comparison, while `Should().Be()` uses `Equals()`. Know which you need to avoid false passes.
