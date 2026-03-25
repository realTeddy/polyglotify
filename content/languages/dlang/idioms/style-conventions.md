---
title: "Style Conventions"
language: "dlang"
feature: "style-conventions"
category: "idioms"
applicable: true
---

D's official style is documented in the [D Style Guide](https://dlang.org/dstyle.html). Key conventions: `camelCase` for functions and variables, `PascalCase` for types and modules (though module file names use `lowercase_snake`), four-space indentation, Allman brace style (braces on their own lines), and `@property` for getters/setters. The `dfmt` tool auto-formats code; `dscanner` performs static analysis.

## Example

```d
// Good D style
module myapp.string_utils;

import std.string : strip;

/// Reverses a string, ignoring leading/trailing whitespace.
string reverseStripped(string input)
{
    import std.algorithm : reverse;
    import std.array : array;

    auto stripped = input.strip;
    return stripped.dup.reverse.idup;
}

struct UserProfile
{
    private string _name;
    private int    _age;

    this(string name, int age)
    {
        _name = name;
        _age  = age;
    }

    @property string name()    const { return _name; }
    @property int    age()     const { return _age; }
    @property void   age(int a)      { _age = a; }
}

unittest
{
    assert(reverseStripped("  hello  ") == "olleh");
    auto u = UserProfile("Alice", 30);
    assert(u.name == "Alice");
    u.age = 31;
    assert(u.age == 31);
}
```

## Gotchas

- The D Style Guide recommends Allman bracing (opening brace on its own line), which differs from K&R style common in C/C++.
- `@property` getters/setters are called without parentheses (`u.age` not `u.age()`), so naming must be consistent.
- Module names should be all-lowercase and match the file path exactly; mixed case module names cause issues on case-insensitive filesystems.
- `dfmt` and `dscanner` are separate tools not bundled with DMD/LDC; install them separately via DUB: `dub fetch dfmt && dub run dfmt`.
