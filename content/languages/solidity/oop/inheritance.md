---
title: "Inheritance"
language: "solidity"
feature: "inheritance"
category: "oop"
applicable: true
---

Solidity supports multiple inheritance via `contract Child is Parent1, Parent2`. Method resolution follows C3 linearization. `override` is required on overriding functions; `virtual` on overridable ones. `super` calls the next contract in the inheritance chain. Constructor arguments for parent contracts are provided inline or in the child constructor.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Ownable {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        owner = newOwner;
    }
}

contract Pausable is Ownable {
    bool public paused;

    modifier whenNotPaused() {
        require(!paused, "paused");
        _;
    }

    function pause()   public onlyOwner { paused = true; }
    function unpause() public onlyOwner { paused = false; }
}

// Multiple inheritance
contract Token is Ownable, Pausable {
    mapping(address => uint256) private _balances;

    constructor() Ownable() {}

    function transfer(address to, uint256 amount) public whenNotPaused {
        require(_balances[msg.sender] >= amount, "insufficient");
        _balances[msg.sender] -= amount;
        _balances[to]         += amount;
    }

    // Override with super chain
    function transferOwnership(address newOwner)
        public override(Ownable)
    {
        super.transferOwnership(newOwner);
        // additional logic...
    }
}
```

## Gotchas

- The order of base contracts in `is` matters for the C3 linearization of `super` calls; always list from "most base" to "most derived."
- All overriding functions must use the `override` keyword; all overridable functions must use `virtual`.
- State variables are not overridable — only functions can be overridden.
