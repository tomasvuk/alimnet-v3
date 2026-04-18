# Design Doc: Fix MCP Error (Supabase Unauthorized)

## Problem
The current Supabase MCP configuration uses the hosted bridge `https://mcp.supabase.com/mcp`, which is reporting "Unauthorized" because the OAuth session has expired or is invalid. Additionally, there are duplicate and malformed entries in the configuration file.

## Solution: Direct Postgres Connection
Switch from the hosted HTTP bridge to a direct connection using the `@modelcontextprotocol/server-postgres` package. This connects directly to the Supabase Postgres instance using the project’s database credentials.

### Technical Details
- **Target File:** `/Users/tomasvukojicic/.gemini/antigravity/mcp_config.json`
- **MCP Server:** `@modelcontextprotocol/server-postgres`
- **Database URL:** `postgresql://postgres:k2RwZOynFi45ZgMZ@db.keagrrvtzmsukcmzxqrl.supabase.co:5432/postgres`
- **Environment Stability:** 
  - Ensure `PATH` includes the Node.js binary directory: `/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin`.
  - Use absolute path for `npx` if necessary: `/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/npx`.

### Implementation Steps
1. Clean up `mcp_config.json` by removing `Supabase_Oficial` and the malformed `supabase` entry.
2. Add a new `Alimnet_DB` entry with the `command` type.
3. Verify that the "MCP Error" disappears from the editor UI.

## Benefits
- **Reliability:** No more "Unauthorized" errors after session timeouts.
- **Performance:** Direct communication with the database.
- **Maintainability:** Uses standard project credentials already defined in the environment.
