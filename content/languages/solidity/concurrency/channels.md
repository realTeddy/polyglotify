---
title: "Channels & Message Passing"
language: "solidity"
feature: "channels"
category: "concurrency"
applicable: false
---

Solidity has no channels or message-passing primitives. Inter-contract communication is done via function calls (`call`, `staticcall`, `delegatecall`) and events. Events are a one-way "message" from a contract to off-chain listeners; they cannot be received by other contracts. Payment channels (e.g., state channels) are a Layer-2 pattern, not a language feature.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Contract-to-contract calls are the closest to "message passing"

interface IReceiver {
    function onMessage(address sender, bytes calldata data) external;
}

contract MessageBus {
    event MessageSent(address indexed from, address indexed to, bytes data);

    // "Send" a message by calling another contract
    function send(address to, bytes calldata data) external {
        emit MessageSent(msg.sender, to, data);
        IReceiver(to).onMessage(msg.sender, data);
    }

    // Low-level call with return data
    function sendLowLevel(address to, bytes calldata data)
        external returns (bool success, bytes memory returnData)
    {
        (success, returnData) = to.call(data);
    }
}

// Payment channel pattern (simplified)
contract PaymentChannel {
    address payable public sender;
    address payable public recipient;
    uint256 public expiration;

    constructor(address payable _recipient, uint256 duration) payable {
        sender     = payable(msg.sender);
        recipient  = _recipient;
        expiration = block.timestamp + duration;
    }

    function close(uint256 amount, bytes calldata signature) external {
        require(msg.sender == recipient, "only recipient");
        // Verify signature, then pay...
        recipient.transfer(amount);
        selfdestruct(sender);
    }
}
```

## Gotchas

- External contract calls can fail silently with low-level `.call()` — always check the `bool success` return value.
- Events cannot be read by other contracts — they are indexed by nodes for off-chain consumption only.
- Reentrancy attacks exploit the fact that an external call gives control to another contract before state updates; use checks-effects-interactions pattern.
