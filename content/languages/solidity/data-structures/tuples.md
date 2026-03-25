---
title: "Tuples"
language: "solidity"
feature: "tuples"
category: "data-structures"
applicable: true
---

Solidity has inline tuples for multiple assignment and multiple return values. Tuples are not first-class values and cannot be stored in variables — they exist only in assignment and return contexts. ABI encoding/decoding uses tuple-like encoding for complex types.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Tuples {
    // Multiple assignment
    function swap() public pure returns (uint256, uint256) {
        uint256 a = 1;
        uint256 b = 2;
        (a, b) = (b, a);
        return (a, b);  // (2, 1)
    }

    // Multiple return values (tuple)
    function divmod(uint256 n, uint256 d)
        public pure returns (uint256, uint256)
    {
        return (n / d, n % d);
    }

    // Destructure
    function example() public pure returns (uint256 sum) {
        (uint256 q, uint256 r) = divmod(17, 5);
        sum = q + r;  // 3 + 2 = 5
    }

    // Skip elements with empty slot
    function firstOnly() public pure returns (uint256) {
        (uint256 q, ) = divmod(17, 5);
        return q;  // 3
    }

    // ABI encoding of tuple (common for cross-contract calls)
    function encodeParams(address addr, uint256 amount)
        public pure returns (bytes memory)
    {
        return abi.encode(addr, amount);
    }
}
```

## Gotchas

- Tuples are a syntactic feature only; they cannot be stored in a variable of a "tuple type" — use structs instead.
- You can omit tuple elements in assignment with an empty slot: `(a, ) = fn()`.
- `abi.encode` serializes multiple values as if they were a tuple; `abi.decode` deserializes.
