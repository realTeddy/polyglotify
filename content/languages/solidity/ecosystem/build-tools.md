---
title: "Build Tools"
language: "solidity"
feature: "build-tools"
category: "ecosystem"
applicable: true
---

**Foundry** (`forge`) and **Hardhat** are the dominant build systems. **Foundry** is a Rust-based, fast, all-in-one toolchain: `forge build`, `forge test`, `forge deploy`. **Hardhat** is a Node.js-based framework with a rich plugin ecosystem. `solc` is the underlying Solidity compiler used by both. **Slither** and **Echidna** are static analysis and fuzzing tools for security.

## Example

```bash
# Foundry
forge build                      # compile contracts
forge build --sizes              # show bytecode sizes
forge test                       # run tests
forge fmt                        # format Solidity files
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
forge verify-contract $ADDR Counter --etherscan-api-key $KEY
forge coverage                   # code coverage report
forge snapshot                   # gas snapshot

# Hardhat
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.ts --network mainnet
npx hardhat verify --network mainnet $ADDR

# Direct solc
solc --bin --abi src/Token.sol -o out/

# Security tools
slither src/                     # static analysis
echidna src/ --contract MyToken  # property-based fuzzing
```

```toml
# foundry.toml
[profile.default]
solc_version = "0.8.20"
optimizer    = true
optimizer_runs = 200
```

## Gotchas

- `optimizer_runs` is a trade-off: higher values optimize for call cost (cheaper at runtime), lower values optimize for deployment cost (smaller bytecode). `200` is a common default.
- Contract bytecode size is limited to 24.576 KB (EIP-170); use libraries or the Diamond pattern for large contracts.
- Always verify contracts on Etherscan (or the target network's explorer) after deployment for transparency.
