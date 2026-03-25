---
title: "Arrays & Lists"
language: "solidity"
feature: "arrays"
category: "data-structures"
applicable: true
---

Solidity arrays can be fixed-size (`T[N]`) or dynamic (`T[]`). Storage arrays can be resized with `.push()` and `.pop()`. Memory arrays are fixed-size once allocated (`new T[](n)`). `calldata` arrays are read-only. Dynamic storage arrays are expensive to iterate; unbounded iteration can hit gas limits.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Arrays {
    // Dynamic storage array
    uint256[] public items;

    // Fixed-size storage array
    uint256[3] public rgb;

    function addItem(uint256 val) public {
        items.push(val);
    }

    function removeLastItem() public {
        items.pop();
    }

    function getItem(uint256 index) public view returns (uint256) {
        require(index < items.length, "out of bounds");
        return items[index];
    }

    function getAll() public view returns (uint256[] memory) {
        return items;
    }

    // Memory array — size fixed at creation
    function createMemoryArray(uint256 n)
        public pure returns (uint256[] memory)
    {
        uint256[] memory arr = new uint256[](n);
        for (uint256 i = 0; i < n; i++) {
            arr[i] = i * i;
        }
        return arr;
    }

    // 2D array
    uint256[][] public matrix;

    function addRow(uint256[] calldata row) public {
        matrix.push(row);
    }

    // Delete element (leaves zero gap — no shifting)
    function deleteItem(uint256 index) public {
        delete items[index];  // sets to 0, length unchanged
    }
}
```

## Gotchas

- `delete arr[i]` sets the element to its zero value but does not remove the slot; array length stays the same.
- Returning large dynamic arrays from functions is expensive; consider pagination patterns.
- Memory arrays cannot be resized after creation; only storage arrays support `.push()` and `.pop()`.
