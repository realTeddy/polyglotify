---
title: "Closures & Lambdas"
language: "solidity"
feature: "closures"
category: "functions"
applicable: false
---

Solidity does not have closures or lambda functions. Functions are declared at the contract level only. Function pointers (via `function` type variables) allow passing function references, but they cannot capture variables from an enclosing scope.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Solidity's closest equivalent: function type variables

contract FunctionTypes {
    // Function type: (param types) visibility mutability returns (return types)
    function applyToArray(
        uint256[] memory arr,
        function(uint256) pure returns (uint256) transform
    ) public pure returns (uint256[] memory) {
        uint256[] memory result = new uint256[](arr.length);
        for (uint256 i = 0; i < arr.length; i++) {
            result[i] = transform(arr[i]);
        }
        return result;
    }

    function double(uint256 x) public pure returns (uint256) { return x * 2; }
    function square(uint256 x) public pure returns (uint256) { return x * x; }

    function demo() public pure returns (uint256[] memory) {
        uint256[] memory nums = new uint256[](3);
        nums[0] = 1; nums[1] = 2; nums[2] = 3;
        return applyToArray(nums, double);
        // returns [2, 4, 6]
    }
}
```

## Gotchas

- Solidity function type variables can reference `internal` or `external` functions; the syntax differs.
- Function type variables cannot capture state (no closures) — they are just pointers to named functions.
- The `function` type in Solidity is rarely used in practice; design patterns like Strategy are better expressed through interfaces and contract calls.
