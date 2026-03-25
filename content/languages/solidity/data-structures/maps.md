---
title: "Maps & Dictionaries"
language: "solidity"
feature: "maps"
category: "data-structures"
applicable: true
---

Solidity's `mapping(KeyType => ValueType)` is a hash map stored in contract storage. Missing keys return the zero value without reverting. Mappings cannot be iterated, copied, or passed to functions as arguments. Nested mappings (`mapping(address => mapping(uint256 => bool))`) are common. To track all keys, pair a mapping with a separate array.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Mappings {
    // Simple mapping
    mapping(address => uint256) public balances;

    // Nested mapping
    mapping(address => mapping(address => uint256)) public allowances;

    // Iterable mapping pattern (mapping + array of keys)
    mapping(address => bool) private _isRegistered;
    address[]                private _users;

    function register() public {
        require(!_isRegistered[msg.sender], "already registered");
        _isRegistered[msg.sender] = true;
        _users.push(msg.sender);
    }

    function userCount() public view returns (uint256) {
        return _users.length;
    }

    // ERC-20 style transfer
    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "insufficient balance");
        balances[msg.sender] -= amount;
        balances[to]         += amount;
    }

    // Approve / allowance (nested mapping)
    function approve(address spender, uint256 amount) public {
        allowances[msg.sender][spender] = amount;
    }
}
```

## Gotchas

- Mappings are not iterable; you cannot loop over keys without maintaining a separate list.
- `delete mapping[key]` resets the value to zero but does not "remove" the key (mappings have no concept of "absent").
- Mappings can only exist in storage; they cannot be in `memory` or `calldata`.
