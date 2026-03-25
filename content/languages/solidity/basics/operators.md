---
title: "Operators"
language: "solidity"
feature: "operators"
category: "basics"
applicable: true
---

Solidity operators are similar to JavaScript/C. Arithmetic operators work on integer types; there is no native floating-point arithmetic. Bitwise operators operate on integer and `bytesN` types. `**` is exponentiation. Comparison and logical operators work as expected. The ternary operator `? :` is supported.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Operators {
    function arithmetic(uint256 a, uint256 b)
        public pure returns (uint256, uint256, uint256, uint256, uint256)
    {
        return (a + b, a - b, a * b, a / b, a % b);
    }

    function power() public pure returns (uint256) {
        return 2 ** 10;  // 1024
    }

    function comparison(uint256 a, uint256 b) public pure returns (bool) {
        return a > b;
    }

    function logical(bool x, bool y) public pure returns (bool, bool, bool) {
        return (x && y, x || y, !x);
    }

    function bitwise(uint256 a, uint256 b)
        public pure returns (uint256, uint256, uint256)
    {
        return (a & b, a | b, a ^ b);
    }

    function shifts(uint256 x) public pure returns (uint256, uint256) {
        return (x << 2, x >> 1);
    }

    function ternary(uint256 x) public pure returns (string memory) {
        return x > 0 ? "positive" : "non-positive";
    }

    function uncheckedArithmetic(uint256 a) public pure returns (uint256) {
        // Disable overflow check (use for gas savings when you know it's safe)
        unchecked { return a + 1; }
    }
}
```

## Gotchas

- Division of integers truncates toward zero; there is no float division.
- Since 0.8.0, arithmetic reverts on overflow/underflow by default; use `unchecked { }` to save gas when overflow is intentional (e.g., counters).
- `**` is right-associative: `2 ** 3 ** 2` = `2 ** 9` = 512.
