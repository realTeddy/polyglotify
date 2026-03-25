---
title: "Classes"
language: "solidity"
feature: "classes"
category: "oop"
applicable: true
---

In Solidity, **contracts** are the equivalent of classes. A contract encapsulates state variables and functions. Contracts are deployed to the blockchain and have an address. `new ContractName()` deploys a new instance. Contracts can hold ETH balances, emit events, and call other contracts.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 private _count;
    address public  owner;

    event Incremented(address by, uint256 newCount);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor(uint256 initial) {
        owner  = msg.sender;
        _count = initial;
    }

    function increment() public {
        _count++;
        emit Incremented(msg.sender, _count);
    }

    function reset() public onlyOwner {
        _count = 0;
    }

    function count() public view returns (uint256) {
        return _count;
    }
}

// Deploy and interact from another contract
contract Factory {
    Counter[] public counters;

    function createCounter(uint256 initial) public returns (address) {
        Counter c = new Counter(initial);
        counters.push(c);
        return address(c);
    }
}
```

## Gotchas

- Unlike OOP classes, contracts are not garbage-collected; once deployed, they exist on-chain unless `selfdestruct` is called (now deprecated).
- `msg.sender` in a constructor is the deployer's address; in other functions it is the immediate caller.
- Emitting events is the Solidity way to log data; they are cheap to emit and queryable off-chain.
