---
title: "Generics"
language: "solidity"
feature: "generics"
category: "oop"
applicable: false
---

Solidity does not have generics or type parameters. Polymorphism is achieved through interfaces, inheritance, and using `address` as a universal contract reference. Libraries provide reusable code that operates on specific types. The lack of generics is a significant constraint; OpenZeppelin works around it with per-type implementations (e.g., `EnumerableSet.AddressSet`, `EnumerableSet.UintSet`).

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Solidity's approach: libraries for reusable logic over specific types

library ArrayUtils {
    // Operates on a specific type — no generics
    function contains(uint256[] storage arr, uint256 val)
        internal view returns (bool)
    {
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i] == val) return true;
        }
        return false;
    }

    function indexOf(uint256[] storage arr, uint256 val)
        internal view returns (uint256, bool)
    {
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i] == val) return (i, true);
        }
        return (0, false);
    }
}

contract Example {
    using ArrayUtils for uint256[];

    uint256[] private items;

    function add(uint256 val) public {
        if (!items.contains(val)) {
            items.push(val);
        }
    }
}

// Interface-based polymorphism (closest to generic behavior)
interface IPriceFeed {
    function getPrice() external view returns (uint256);
}
```

## Gotchas

- Solidity libraries with `internal` functions are inlined at the call site (no external call overhead).
- `using LibraryName for Type` attaches library functions as methods on that type.
- For type-parameterized behavior, the community duplicates logic per concrete type (code generation) or uses ABI encoding with `bytes` as a poor man's generic.
