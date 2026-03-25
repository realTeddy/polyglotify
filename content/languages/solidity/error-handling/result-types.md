---
title: "Result Types"
language: "solidity"
feature: "result-types"
category: "error-handling"
applicable: false
---

Solidity does not have a `Result` or `Option` type. The language uses revert-based error handling for failures. The conventional alternative is returning a boolean success flag alongside the value, or returning a sentinel zero value and relying on `require` at the call site. Some patterns use events or return structs with a `success` field.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ResultPatterns {
    mapping(uint256 => address) private _owners;

    // Pattern 1: Boolean success flag + output parameter
    function findOwner(uint256 tokenId)
        public view returns (bool found, address owner)
    {
        owner = _owners[tokenId];
        found = owner != address(0);
    }

    // Pattern 2: Revert on failure (most common in Solidity)
    function requireOwner(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "token does not exist");
        return owner;
    }

    // Pattern 3: Return struct with success field
    struct LookupResult {
        bool    success;
        address value;
        string  error;
    }

    function lookup(uint256 tokenId) public view returns (LookupResult memory) {
        address owner = _owners[tokenId];
        if (owner == address(0)) {
            return LookupResult({ success: false, value: address(0), error: "not found" });
        }
        return LookupResult({ success: true, value: owner, error: "" });
    }
}
```

## Gotchas

- The "revert on failure" pattern is idiomatic Solidity — it is simpler, uses less ABI surface, and ensures callers cannot ignore errors.
- Returning a boolean `success` flag is only practical when you expect partial failure and want to allow the caller to continue; most callers ignore return values if they don't have to check them.
- Low-level `.call()` returns `(bool success, bytes memory returndata)` — this is the one place Solidity explicitly uses a result-like pattern.
