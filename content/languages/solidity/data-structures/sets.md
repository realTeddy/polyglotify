---
title: "Sets"
language: "solidity"
feature: "sets"
category: "data-structures"
applicable: false
---

Solidity has no built-in set type. Sets are implemented using `mapping(T => bool)` for membership tests combined with an array for enumeration. OpenZeppelin's `EnumerableSet` library provides a gas-efficient implementation with add, remove, contains, and iteration.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Manual set using mapping + array
contract AddressSet {
    mapping(address => bool) private _contains;
    address[] private _values;

    function add(address val) public returns (bool) {
        if (_contains[val]) return false;
        _contains[val] = true;
        _values.push(val);
        return true;
    }

    function remove(address val) public returns (bool) {
        if (!_contains[val]) return false;
        _contains[val] = false;
        // Swap with last and pop to avoid gaps
        for (uint256 i = 0; i < _values.length; i++) {
            if (_values[i] == val) {
                _values[i] = _values[_values.length - 1];
                _values.pop();
                break;
            }
        }
        return true;
    }

    function contains(address val) public view returns (bool) {
        return _contains[val];
    }

    function values() public view returns (address[] memory) {
        return _values;
    }

    function length() public view returns (uint256) {
        return _values.length;
    }
}

// Using OpenZeppelin EnumerableSet
// import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
// using EnumerableSet for EnumerableSet.AddressSet;
// EnumerableSet.AddressSet private _adminSet;
// _adminSet.add(addr);
// _adminSet.contains(addr);
```

## Gotchas

- The swap-and-pop pattern for removal changes iteration order; be aware if order matters.
- `mapping(T => bool)` alone provides O(1) membership; the array is needed only if you need enumeration.
- OpenZeppelin's `EnumerableSet` is production-tested and should be preferred over hand-rolled implementations.
