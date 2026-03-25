---
title: "Async/Await"
language: "solidity"
feature: "async-await"
category: "concurrency"
applicable: false
---

Solidity has no concurrency model at all. Smart contract execution is single-threaded and atomic — each transaction executes completely before any other transaction runs. There is no `async`/`await`, no threads, and no parallel execution. "Asynchronous" patterns in the Ethereum ecosystem are achieved off-chain (e.g., event-driven architectures using Web3 listeners) or across transactions (e.g., commit-reveal schemes).

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Solidity is synchronous by design.
// Cross-transaction async patterns use events + off-chain logic.

contract AsyncPattern {
    event WorkRequested(uint256 indexed requestId, address requester, bytes data);
    event WorkCompleted(uint256 indexed requestId, bytes result);

    mapping(uint256 => address) public requesters;
    uint256 public nextRequestId;

    // Step 1: Request work (emit event, off-chain processor picks it up)
    function requestWork(bytes calldata data) public returns (uint256 requestId) {
        requestId = nextRequestId++;
        requesters[requestId] = msg.sender;
        emit WorkRequested(requestId, msg.sender, data);
    }

    // Step 2: Off-chain oracle/keeper calls this with the result
    function fulfillWork(uint256 requestId, bytes calldata result) public {
        require(requesters[requestId] != address(0), "unknown request");
        emit WorkCompleted(requestId, result);
        delete requesters[requestId];
    }
}
```

## Gotchas

- Ethereum transactions are atomic — either everything succeeds or everything is reverted; there is no partial completion.
- Chainlink VRF and similar oracle networks provide a two-transaction pattern that resembles async: request in tx1, callback in tx2.
- Never assume that two consecutive blockchain transactions execute without other transactions in between.
