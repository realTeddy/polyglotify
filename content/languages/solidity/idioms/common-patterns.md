---
title: "Common Patterns"
language: "solidity"
feature: "common-patterns"
category: "idioms"
applicable: true
---

Solidity has well-established security and design patterns: **Checks-Effects-Interactions** (prevent reentrancy), **Pull over Push** (let users withdraw instead of pushing), **Access Control** (Ownable, roles), **Proxy patterns** (upgradeable contracts), **Guard clauses** (early `require`), and **Events for indexing**. These patterns are critical for contract security.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BestPractices {
    mapping(address => uint256) public balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    // Modifier for access control
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() { owner = msg.sender; }

    // Checks-Effects-Interactions pattern
    function withdraw(uint256 amount) external {
        // 1. CHECKS — validate
        require(amount > 0,                   "zero amount");
        require(balances[msg.sender] >= amount, "insufficient");

        // 2. EFFECTS — update state BEFORE external call
        balances[msg.sender] -= amount;

        // 3. INTERACTIONS — external call last
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "transfer failed");

        emit Withdrawn(msg.sender, amount);
    }

    // Pull pattern — user initiates withdrawal
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // Custom error for gas efficiency
    error InsufficientBalance(uint256 needed, uint256 available);

    function transfer(address to, uint256 amt) external {
        if (balances[msg.sender] < amt) {
            revert InsufficientBalance(amt, balances[msg.sender]);
        }
        balances[msg.sender] -= amt;
        balances[to]         += amt;
    }
}
```

## Gotchas

- **Checks-Effects-Interactions** is the most important pattern in Solidity; violating it opens reentrancy vulnerabilities.
- Use `emit Event(...)` for all state-changing operations; events are the primary mechanism for off-chain indexing (The Graph, Etherscan).
- Prefer custom errors over string revert messages for gas efficiency (saves ~50 gas per character not emitted).
