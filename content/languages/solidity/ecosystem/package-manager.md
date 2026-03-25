---
title: "Package Manager"
language: "solidity"
feature: "package-manager"
category: "ecosystem"
applicable: true
---

Solidity does not have its own package manager. Dependencies are managed through the development framework being used. **Hardhat** and **Foundry** are the two dominant frameworks, each with their own dependency management. Hardhat uses `npm`/`yarn`; Foundry uses `forge install` (Git submodules). OpenZeppelin Contracts is the most widely used library.

## Example

```bash
# Hardhat (npm-based)
npm install --save-dev hardhat
npm install @openzeppelin/contracts

# foundry (git submodule-based)
forge install OpenZeppelin/openzeppelin-contracts
forge install transmissions11/solmate

# Update a Foundry dependency
forge update lib/openzeppelin-contracts
```

```json
// package.json (Hardhat project)
{
  "devDependencies": {
    "hardhat": "^2.22.0",
    "@nomicfoundation/hardhat-toolbox": "^5.0.0"
  },
  "dependencies": {
    "@openzeppelin/contracts": "^5.0.0"
  }
}
```

```toml
# foundry.toml (Foundry project)
[profile.default]
src     = "src"
out     = "out"
libs    = ["lib"]
remappings = [
  "@openzeppelin/=lib/openzeppelin-contracts/",
  "solmate/=lib/solmate/src/"
]
```

## Gotchas

- Foundry dependencies are Git submodules; `forge install` clones the repo into `lib/`. Pin versions with `--tag` or commit hashes.
- Hardhat npm dependencies are semver-managed; always pin exact versions for production contracts.
- Import remappings (`@openzeppelin/=lib/...`) must be configured in `foundry.toml` or `remappings.txt` for Foundry, and in `hardhat.config.js` for Hardhat.
