# Design Doc: Fix MCP Error (npx not found)

## Problem
The IDE (Cursor/Antigravity) and its MCP servers fail to locate `npx` because Node.js was installed via `nvm`, and the NVM binary path is not included in the environment's `PATH` when the IDE is launched from the macOS GUI (Dock/Launchpad).

## Proposed Solution: Option 1 (Global Symlinks)
Create symbolic links for the core Node.js binaries in a standard system-wide location (`/usr/local/bin`) that is guaranteed to be in the `PATH` of GUI applications.

### Technical Details
- **Source binaries (NVM):**
  - `/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/node`
  - `/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/npm`
  - `/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/npx`
- **Target location:**
  - `/usr/local/bin/node`
  - `/usr/local/bin/npm`
  - `/usr/local/bin/npx`

### Implementation Steps
1. Verify `/usr/local/bin` exists.
2. Create symlinks for `node`, `npm`, and `npx`.
3. Verify the symlinks are working by running `which npx` in a new shell.

## Alternatives Considered
- **Modifying `.zprofile`**: Less reliable for GUI apps than global symlinks.
- **Manual IDE Configuration**: Requires per-application setup and is more tedious for the user.
