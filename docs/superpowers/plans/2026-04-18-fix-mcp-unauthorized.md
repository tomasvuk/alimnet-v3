# Fix MCP Unauthorized Error Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch to a direct Postgres connection for Supabase to resolve the "Unauthorized" error in the editor.

**Architecture:** Modify `mcp_config.json` to replace the hosted HTTP bridge with a local `@modelcontextprotocol/server-postgres` instance using direct credentials.

**Tech Stack:** Node.js, MCP, Supabase (Postgres).

---

### Task 1: Clean up and Reconfigure MCP

**Files:**
- Modify: `/Users/tomasvukojicic/.gemini/antigravity/mcp_config.json`

- [ ] **Step 1: Read existing config**
  
Verify the content of `/Users/tomasvukojicic/.gemini/antigravity/mcp_config.json` to ensure we have the correct backup if needed.

- [ ] **Step 2: Apply new configuration**

Replace the contents of `/Users/tomasvukojicic/.gemini/antigravity/mcp_config.json` with the following:

```json
{
  "mcpServers": {
    "Alimnet_DB": {
      "command": "/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin/npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:k2RwZOynFi45ZgMZ@db.keagrrvtzmsukcmzxqrl.supabase.co:5432/postgres"
      ],
      "env": {
        "PATH": "/Users/tomasvukojicic/.nvm/versions/node/v24.14.0/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
      }
    }
  }
}
```

- [ ] **Step 3: Verify configuration**

Check that the file was written correctly.

---

### Task 2: Verification

- [ ] **Step 1: Check for error messages in the UI**

(Manual Step for the User/Agent) Verify in the editor UI that the "MCP Error" and "Unauthorized" messages have disappeared from the Supabase section.

- [ ] **Step 2: Test connection**

(Optional) Try to list tables using the new `Alimnet_DB` server if the tools are available.
