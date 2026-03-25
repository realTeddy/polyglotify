---
title: "Threads"
language: "solidity"
feature: "threads"
category: "concurrency"
applicable: false
---

Solidity and the EVM have no threads or parallel execution. Every transaction on Ethereum is processed sequentially and atomically. Multiple contracts may be called within a single transaction (via internal calls or `call`/`delegatecall`), but they execute in a single-threaded call stack.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// The EVM executes sequentially. "Concurrency" within a transaction
// is achieved through contract-to-contract calls.

interface IWorker {
    function process(uint256 x) external returns (uint256);
}

contract Orchestrator {
    // Call multiple contracts sequentially (not in parallel)
    function processAll(
        address[] calldata workers,
        uint256   input
    ) external returns (uint256[] memory results) {
        results = new uint256[](workers.length);
        for (uint256 i = 0; i < workers.length; i++) {
            // Each call is sequential — not parallel
            results[i] = IWorker(workers[i]).process(input);
        }
    }

    // Reentrancy guard pattern (important because calls can re-enter)
    bool private _locked;

    modifier noReentrant() {
        require(!_locked, "reentrant call");
        _locked = true;
        _;
        _locked = false;
    }
}
```

## Gotchas

- The EVM is single-threaded; "parallel contracts" is a misconception — all calls within a transaction form a single call stack.
- Reentrancy (a contract calling back into itself) is Solidity's main "concurrency-like" hazard — guard against it with the checks-effects-interactions pattern or a reentrancy guard.
- `delegatecall` executes another contract's code in the caller's context; it is powerful but can corrupt storage if misused.
