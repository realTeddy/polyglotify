---
title: "Variables & Declaration"
language: "solidity"
feature: "variables"
category: "basics"
applicable: true
---

Solidity variables are statically typed and have three storage locations: **storage** (on-chain, persistent), **memory** (temporary, function-scoped), and **calldata** (read-only, external function inputs). State variables live in storage by default. Local variables default to memory. `public` state variables automatically get a getter function.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Variables {
    // State variables — stored on-chain (storage)
    uint256 public count = 0;
    string  public name  = "Alice";
    bool    public flag  = true;
    address public owner;

    // Constant — replaced at compile time, no storage slot
    uint256 public constant MAX_SUPPLY = 10_000;

    // Immutable — set once in constructor, then read-only
    uint256 public immutable deployedAt;

    constructor() {
        owner      = msg.sender;
        deployedAt = block.timestamp;
    }

    function demo() public pure returns (uint256) {
        // Local variable — lives in memory (stack for value types)
        uint256 x = 42;
        uint256 y = x + 8;
        return y;
    }
}
```

## Gotchas

- State variables cost gas to read (SLOAD) and write (SSTORE); minimize storage reads/writes by caching in local variables.
- `constant` variables are inlined at compile time and cost zero gas to access; `immutable` variables are stored in the bytecode, not storage.
- Uninitialized state variables have their zero value: `0`, `false`, `address(0)`, `""`.
