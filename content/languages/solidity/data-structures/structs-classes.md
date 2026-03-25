---
title: "Structs & Classes"
language: "solidity"
feature: "structs-classes"
category: "data-structures"
applicable: true
---

Solidity has `struct` for grouping related data. Structs can contain all value types, other structs, arrays, and mappings (storage only). Contracts themselves function similarly to classes — they have state variables and methods. Structs can live in storage, memory, or calldata.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StructsExample {
    struct Token {
        uint256 id;
        string  name;
        address owner;
        bool    transferable;
    }

    struct Auction {
        Token   token;          // nested struct
        uint256 startPrice;
        uint256 highestBid;
        address highestBidder;
        uint256 endTime;
    }

    // Storage mapping of structs
    mapping(uint256 => Token) public tokens;
    uint256 public nextId;

    // Create a struct
    function mintToken(string calldata name) public returns (uint256) {
        uint256 id = nextId++;
        tokens[id] = Token({
            id:           id,
            name:         name,
            owner:        msg.sender,
            transferable: true
        });
        return id;
    }

    // Get a storage reference (efficient — no copy)
    function transferToken(uint256 id, address to) public {
        Token storage t = tokens[id];
        require(t.owner == msg.sender, "not owner");
        require(t.transferable,        "non-transferable");
        t.owner = to;
    }

    // Return a struct from a function (copies to memory)
    function getToken(uint256 id) public view returns (Token memory) {
        return tokens[id];
    }
}
```

## Gotchas

- `Token storage t = tokens[id]` creates a **pointer** (cheap, in-place mutation); `Token memory t = tokens[id]` creates a **copy** (expensive, mutations don't persist).
- Structs with mappings can only live in storage — they cannot be passed to `memory` or `calldata`.
- Recursive structs (a struct containing itself) are not allowed.
