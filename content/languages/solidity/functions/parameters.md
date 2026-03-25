---
title: "Parameters & Arguments"
language: "solidity"
feature: "parameters"
category: "functions"
applicable: true
---

Solidity functions accept typed parameters. Reference types (`string`, `bytes`, arrays, structs) must specify a data location: `calldata` (for external inputs, gas-efficient), `memory` (temporary copy), or `storage` (pointer to state). Value types (`uint`, `bool`, `address`) are always copied. Named parameters at the call site are supported with struct-style syntax for some scenarios.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Parameters {
    struct Config {
        uint256 timeout;
        bool    enabled;
        string  label;
    }

    // Value type parameters (copied)
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    // Reference type — calldata (efficient for external, read-only)
    function sumArray(uint256[] calldata nums)
        public pure returns (uint256 total)
    {
        for (uint256 i = 0; i < nums.length; i++) {
            total += nums[i];
        }
    }

    // Reference type — memory (writable copy)
    function reverseArray(uint256[] memory arr)
        public pure returns (uint256[] memory)
    {
        uint256 len = arr.length;
        for (uint256 i = 0; i < len / 2; i++) {
            (arr[i], arr[len - 1 - i]) = (arr[len - 1 - i], arr[i]);
        }
        return arr;
    }

    // Struct parameter
    function configure(Config calldata cfg) public pure returns (bool) {
        return cfg.enabled && cfg.timeout > 0;
    }

    // Default values are not supported — use overloading
    function greet() public pure returns (string memory) {
        return greetWith("Hello");
    }

    function greetWith(string memory msg) public pure returns (string memory) {
        return msg;
    }
}
```

## Gotchas

- Forgetting to specify `memory` or `calldata` for reference-type parameters is a compile error.
- `calldata` is cheaper than `memory` for external functions because no copy is made; prefer `calldata` for read-only array/string parameters.
- Solidity does not support default parameter values; simulate with overloaded functions.
