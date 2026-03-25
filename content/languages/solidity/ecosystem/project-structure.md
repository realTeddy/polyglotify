---
title: "Project Structure"
language: "solidity"
feature: "project-structure"
category: "ecosystem"
applicable: true
---

Solidity projects are organized by the development framework. **Foundry** (increasingly the standard) uses `src/`, `test/`, `script/`, and `lib/` directories. **Hardhat** uses `contracts/`, `test/`, `scripts/`, and `node_modules/`. Both generate compilation artifacts in an output directory.

## Example

```
# Foundry project layout
my-protocol/
├── foundry.toml       # project config
├── src/
│   ├── Token.sol      # main contracts
│   ├── Vault.sol
│   └── interfaces/
│       └── IToken.sol
├── test/
│   ├── Token.t.sol    # test files (*.t.sol)
│   └── Vault.t.sol
├── script/
│   └── Deploy.s.sol   # deployment scripts
└── lib/
    └── openzeppelin-contracts/  # git submodule

# Hardhat project layout
my-project/
├── hardhat.config.ts
├── package.json
├── contracts/
│   └── Token.sol
├── test/
│   └── Token.ts
├── scripts/
│   └── deploy.ts
└── node_modules/
```

```solidity
// SPDX-License-Identifier: MIT is required by most linters/tools
// pragma solidity specifies the compiler version
pragma solidity ^0.8.20;

// src/Token.sol
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
```

## Gotchas

- Every `.sol` file should start with an `SPDX-License-Identifier` comment; tools warn or error without it.
- `pragma solidity ^0.8.20` means ">=0.8.20 <0.9.0"; pin exact versions in production with `pragma solidity 0.8.20`.
- Test files in Foundry end with `.t.sol`; deployment scripts end with `.s.sol` — this is convention, not enforced.
