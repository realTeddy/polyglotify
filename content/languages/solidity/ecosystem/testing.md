---
title: "Testing"
language: "solidity"
feature: "testing"
category: "ecosystem"
applicable: true
---

Solidity smart contracts are tested in two primary ways: **Foundry** (Solidity-native tests, very fast) and **Hardhat** (JavaScript/TypeScript tests via ethers.js). Foundry's `forge test` runs tests defined as Solidity functions starting with `test`. Hardhat uses Mocha/Chai. Both support forking mainnet, fuzzing, and invariant testing.

## Example

```solidity
// test/Counter.t.sol (Foundry)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter(0);
    }

    function test_Increment() public {
        counter.increment();
        assertEq(counter.count(), 1);
    }

    function test_RevertOnReset() public {
        vm.prank(address(0xdead));  // call as different address
        vm.expectRevert("not owner");
        counter.reset();
    }

    // Fuzz test — Foundry runs with random inputs
    function testFuzz_Increment(uint256 times) public {
        vm.assume(times < 100);
        for (uint256 i = 0; i < times; i++) {
            counter.increment();
        }
        assertEq(counter.count(), times);
    }
}
```

```bash
# Foundry
forge test
forge test -vvvv            # verbose (show traces)
forge test --match-test test_Increment
forge test --fork-url $RPC_URL  # fork mainnet

# Hardhat
npx hardhat test
npx hardhat test test/Counter.ts
```

## Gotchas

- Foundry's `vm` cheat codes (`vm.prank`, `vm.warp`, `vm.deal`) are essential for testing access control, time-dependent logic, and balances.
- Foundry fuzzing runs 256 times by default; increase with `--fuzz-runs=10000` for better coverage.
- Gas snapshots (`forge snapshot`) help track gas costs over time and catch regressions.
