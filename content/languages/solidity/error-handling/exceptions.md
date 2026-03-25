---
title: "Exceptions & Try/Catch"
language: "solidity"
feature: "exceptions"
category: "error-handling"
applicable: true
---

Solidity does not have traditional exceptions. `require`, `revert`, and `assert` abort execution and revert all state changes. Custom `error` types (since 0.8.4) provide gas-efficient structured errors. `try`/`catch` can intercept failures from external contract calls and contract creation.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Custom errors (gas-efficient vs string messages)
error InsufficientBalance(address account, uint256 required, uint256 available);
error Unauthorized(address caller);
error ZeroAddress();

contract ErrorHandling {
    mapping(address => uint256) public balances;
    address public owner;

    constructor() { owner = msg.sender; }

    function withdraw(uint256 amount) public {
        uint256 bal = balances[msg.sender];
        if (amount > bal) {
            revert InsufficientBalance(msg.sender, amount, bal);
        }
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function setOwner(address newOwner) public {
        if (msg.sender != owner)   revert Unauthorized(msg.sender);
        if (newOwner == address(0)) revert ZeroAddress();
        owner = newOwner;
    }
}

// try/catch for external calls
interface IExternalContract {
    function riskyOp(uint256 x) external returns (uint256);
}

contract TryCatch {
    function callExternal(address target, uint256 val)
        public returns (uint256 result, string memory errMsg)
    {
        try IExternalContract(target).riskyOp(val) returns (uint256 r) {
            result = r;
        } catch Error(string memory reason) {
            errMsg = reason;        // revert("message") or require(false, "msg")
        } catch (bytes memory) {
            errMsg = "low-level error";  // custom error or empty revert
        }
    }
}
```

## Gotchas

- Custom errors are ABI-encoded like function calls; they are 4+ bytes (selector + args) vs full strings, saving significant gas.
- `try`/`catch` only works on **external** calls and contract creation; it cannot catch errors in internal function calls.
- `assert` is for invariants — it uses the `INVALID` opcode and does not refund remaining gas (use `require` for user-facing validation).
