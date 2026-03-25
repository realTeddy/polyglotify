---
title: "Return Values"
language: "solidity"
feature: "return-values"
category: "functions"
applicable: true
---

Solidity functions can return multiple values using tuples. Return types are declared in the signature. Named return variables can be declared and implicitly returned. Reference types returned from `public`/`external` functions are copied to `memory`.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReturnValues {
    // Single return
    function square(uint256 x) public pure returns (uint256) {
        return x * x;
    }

    // Multiple return values (tuple)
    function divmod(uint256 a, uint256 b)
        public pure returns (uint256 quotient, uint256 remainder)
    {
        quotient  = a / b;
        remainder = a % b;
        // Named return variables are implicitly returned without 'return'
    }

    // Explicit tuple return
    function minMax(uint256[] calldata arr)
        public pure returns (uint256 min, uint256 max)
    {
        require(arr.length > 0, "empty array");
        min = arr[0];
        max = arr[0];
        for (uint256 i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i];
            if (arr[i] > max) max = arr[i];
        }
    }

    // Return a struct
    struct Point { uint256 x; uint256 y; }

    function midpoint(Point calldata a, Point calldata b)
        public pure returns (Point memory)
    {
        return Point({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
    }
}

contract Caller {
    ReturnValues rv = new ReturnValues();

    function example() public view returns (uint256, uint256) {
        // Destructure tuple return
        (uint256 q, uint256 r) = rv.divmod(17, 5);
        return (q, r);
    }
}
```

## Gotchas

- Named return variables have the zero value by default and are returned automatically at the end of the function body without an explicit `return`.
- Returning `memory` arrays from public functions copies data and costs gas proportional to the array size.
- Tuples cannot be stored in variables directly — they must be destructured: `(a, b) = fn()`.
