---
title: "Control Flow"
language: "solidity"
feature: "control-flow"
category: "basics"
applicable: true
---

Solidity supports `if`/`else`, `for`, `while`, `do`/`while`, `break`, `continue`, and `return`. Control flow is C-like. `require`, `revert`, and `assert` are the idiomatic ways to abort execution with an error. There is no `try`/`catch` in the traditional sense, but `try`/`catch` can intercept failures from external calls.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ControlFlow {
    function classify(uint256 n) public pure returns (string memory) {
        if (n == 0) {
            return "zero";
        } else if (n < 10) {
            return "small";
        } else {
            return "large";
        }
    }

    function sumUpTo(uint256 n) public pure returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 1; i <= n; i++) {
            total += i;
        }
        return total;
    }

    function firstEven(uint256[] memory arr)
        public pure returns (uint256)
    {
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i] % 2 == 0) return arr[i];
        }
        revert("no even number found");
    }

    // require — validate inputs; reverts with message
    function withdraw(uint256 amount, uint256 balance) public pure {
        require(amount > 0,       "amount must be positive");
        require(amount <= balance, "insufficient balance");
    }

    // assert — invariant checks (consumes all gas on failure)
    function assertExample(uint256 x) public pure returns (uint256) {
        uint256 result = x * 2;
        assert(result >= x);  // should never fail
        return result;
    }
}
```

## Gotchas

- `require` is preferred for input validation; it refunds remaining gas and reverts with a message.
- `assert` is for invariants — failures indicate bugs; it consumes all gas (old behavior) and does not refund.
- Loops with unbounded arrays can hit the block gas limit, causing transactions to always fail.
