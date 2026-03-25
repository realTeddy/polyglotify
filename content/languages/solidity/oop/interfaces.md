---
title: "Interfaces & Traits"
language: "solidity"
feature: "interfaces"
category: "oop"
applicable: true
---

Solidity `interface` declares a set of function signatures without implementations. Interfaces cannot have state variables, constructors, or modifiers. All interface functions are implicitly `external` and `virtual`. Contracts implement interfaces by declaring `is InterfaceName` and implementing all required functions. Interfaces are also used to call external contracts type-safely.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ERC-20 interface (simplified)
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// Implement the interface
contract SimpleToken is IERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;

    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }

    function transfer(address to, uint256 amount) external override returns (bool) {
        _balances[msg.sender] -= amount;
        _balances[to]         += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    // ... (other methods omitted for brevity)
    function transferFrom(address from, address to, uint256 amount) external override returns (bool) { return true; }
    function approve(address spender, uint256 amount) external override returns (bool) { return true; }
    function allowance(address owner, address spender) external view override returns (uint256) { return 0; }
}

// Use interface to interact with any ERC-20 token
contract TokenUser {
    function getBalance(address token, address user)
        external view returns (uint256)
    {
        return IERC20(token).balanceOf(user);
    }
}
```

## Gotchas

- Interfaces cannot have `public` or `internal` functions — all functions are implicitly `external`.
- Casting an address to an interface (`IERC20(tokenAddress)`) does not verify the contract implements the interface at compile time.
- Abstract contracts (`abstract contract`) are the middle ground — they can have implementations and state, unlike interfaces.
