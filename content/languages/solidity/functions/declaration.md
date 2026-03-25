---
title: "Function Declaration"
language: "solidity"
feature: "declaration"
category: "functions"
applicable: true
---

Solidity functions are declared with `function name(params) visibility mutability returns (types)`. Visibility: `public`, `external`, `internal`, `private`. Mutability: `pure` (no state read/write), `view` (read state, no write), `payable` (can receive ETH), or none (read-write state). `receive()` and `fallback()` are special functions for receiving ETH.

## Example

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Functions {
    uint256 private count;

    // public — callable externally and internally
    function increment() public {
        count++;
    }

    // view — reads state, no modification, no gas cost when called externally
    function getCount() public view returns (uint256) {
        return count;
    }

    // pure — no state access at all
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }

    // external — only callable from outside the contract
    function externalOnly() external pure returns (string memory) {
        return "hello";
    }

    // internal — only callable within contract and derived contracts
    function _validate(uint256 x) internal pure returns (bool) {
        return x > 0;
    }

    // payable — can receive ETH
    function deposit() public payable {
        require(msg.value > 0, "send ETH");
    }

    // Receive ETH with no calldata
    receive() external payable {}

    // Fallback for unrecognized function calls
    fallback() external payable {}
}
```

## Gotchas

- `external` functions are cheaper to call from outside than `public` because arguments are read from `calldata` (not copied to memory).
- Calling a `view` or `pure` function from off-chain (e.g., `eth_call`) costs zero gas; calling from on-chain costs gas.
- Functions without a visibility specifier default to `internal` (changed from `public` in 0.5.0).
