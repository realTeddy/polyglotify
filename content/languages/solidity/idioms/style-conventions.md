---
title: "Style Conventions"
language: "solidity"
feature: "style-conventions"
category: "idioms"
applicable: true
---

Solidity follows the official [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html). Contracts use `PascalCase`; functions and variables use `camelCase`; constants use `SCREAMING_SNAKE_CASE`; private/internal variables conventionally start with `_`. 4-space indentation. License and pragma at the top. Natspec (`///` or `/** */`) for documentation.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title SimpleVault — stores and retrieves ETH
/// @author Alice
/// @notice Users can deposit and withdraw ETH
contract SimpleVault {
    // Errors
    error ZeroAmount();
    error InsufficientBalance(uint256 available, uint256 requested);

    // Events
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    // State variables — private with underscore prefix
    mapping(address => uint256) private _balances;

    // Constants — SCREAMING_SNAKE_CASE
    uint256 public constant MAX_DEPOSIT = 100 ether;

    // Functions — camelCase
    /// @notice Deposit ETH into the vault
    function deposit() external payable {
        if (msg.value == 0) revert ZeroAmount();
        _balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    /// @notice Withdraw ETH from the vault
    /// @param amount The amount to withdraw in wei
    function withdraw(uint256 amount) external {
        uint256 bal = _balances[msg.sender];
        if (amount > bal) revert InsufficientBalance(bal, amount);
        _balances[msg.sender] -= amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    /// @notice Get the caller's balance
    function balanceOf() external view returns (uint256) {
        return _balances[msg.sender];
    }
}
```

## Gotchas

- The order of declarations matters for readability: SPDX → pragma → imports → interfaces → libraries → contracts.
- Within a contract: errors → events → state variables → modifiers → constructor → functions (by visibility: external → public → internal → private).
- `forge fmt` (Foundry) auto-formats Solidity files to the official style; integrate it into CI.
