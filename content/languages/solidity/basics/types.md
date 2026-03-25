---
title: "Types & Type Systems"
language: "solidity"
feature: "types"
category: "basics"
applicable: true
---

Solidity is statically typed. Value types (copied on assignment): `bool`, `uint`/`int` (8–256 bits in steps of 8), `address`, `address payable`, `bytes1`–`bytes32`, enums. Reference types (pass by reference in storage): arrays, `bytes`, `string`, mappings, structs. Type conversions between numeric types require explicit casts.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Types {
    // Value types
    bool    public flag    = true;
    uint256 public count   = 100;        // unsigned 256-bit
    int128  public signed  = -42;        // signed 128-bit
    address public wallet  = 0xAbCd...;  // 20-byte Ethereum address
    bytes32 public hash32;               // fixed-size byte array

    // Enum
    enum Status { Active, Paused, Cancelled }
    Status public status = Status.Active;

    // Struct (reference type)
    struct Token {
        uint256 id;
        string  name;
        address owner;
    }

    // Dynamic array (reference type)
    uint256[] public ids;

    // Fixed array
    uint256[3] public rgb;

    // Mapping (key => value, hash map)
    mapping(address => uint256) public balances;

    // Explicit cast
    uint256 big   = 256;
    uint8   small = uint8(big);     // truncates if > 255
    int256  s     = int256(big);    // safe widening
}
```

## Gotchas

- `uint` defaults to `uint256`; `int` defaults to `int256`.
- Integer overflow/underflow reverts automatically since Solidity 0.8.0.
- `address` and `address payable` are distinct; only `address payable` has `.transfer()` and `.send()`.
