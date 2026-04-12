# Fix MCP Error (npx not found) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the "npx not found" error in MCP servers by creating global symbolic links to the NVM-managed Node.js binaries.

**Architecture:** Create symlinks in `/usr/local/bin` (a standard PATH location) pointing to the specific versions managed by NVM. This ensures GUI applications can find these binaries without needing to load shell profiles.

**Tech Stack:** macOS, Shell, NVM

---

### Task 1: Environment Preparation and Symlink Creation

**Files:**
- Modify: (System-wide symlinks at `/usr/local/bin/`)

- [ ] **Step 1: Ensure `/usr/local/bin` exists and is writable**

Run:
```bash
mkdir -p /usr/local/bin
```

- [ ] **Step 2: Create symlink for `node`**

Current version at: `/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/node`

Run:
```bash
ln -sf /Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/node /usr/local/bin/node
```

- [ ] **Step 3: Create symlink for `npm`**

Current version at: `/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/npm`

Run:
```bash
ln -sf /Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/npm /usr/local/bin/npm
```

- [ ] **Step 4: Create symlink for `npx`**

Current version at: `/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/npx`

Run:
```bash
ln -sf /Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/npx /usr/local/bin/npx
```

- [ ] **Step 5: Verify symlinks**

Run:
```bash
ls -l /usr/local/bin/node /usr/local/bin/npm /usr/local/bin/npx
```
Expected: Links point to `/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/...`

- [ ] **Step 6: Final Verification**

Run:
```bash
export PATH="/usr/local/bin:$PATH" && which node && which npx && node -v && npx -v
```
Expected: `/usr/local/bin/node` and `/usr/local/bin/npx` with version `v24.14.0`.
