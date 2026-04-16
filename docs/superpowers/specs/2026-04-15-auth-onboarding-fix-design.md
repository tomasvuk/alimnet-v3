# Design Document: Alimnet Authentication & Onboarding Refinement

## Goal
Improve the registration/login experience by fixing the Google Auth loop, correcting header CTA destinations, and implementing a dedicated "Welcome" onboarding page for new users.

## Problem Statement
1. **CTA Confusion**: "SUMATE" and "INGRESAR" both lead to the login page with "Welcome back" text.
2. **Auth Loop**: Google login often redirects to the home page or fails to sync session cookies.
3. **Onboarding**: New users are dropped into the map without a proper greeting or mandatory profile completion.

## Proposed Solution

### 1. CTA Destination Update
- **"INGRESAR"**: Keep pointing to `/login`.
- **"SUMATE"**: Point to `/registro`.

### 2. Unified Auth Callback
- All OAuth (Google) redirects will point to `/api/auth/callback?next=/explorar`.
- The callback route will be updated to:
    - Exchange code for session.
    - Set persistence cookies (crucial for mobile).
    - **Check user status**: If the user has no `first_name` or `last_name` in their profile, redirect to `/bienvenida`. Otherwise, redirect to the `next` destination.

### 3. New "/bienvenida" Page
A standalone, high-aesthetic page for new users:
- **Title**: "¡Bienvenido a la Red Alimnet!" (or similar).
- **Form**: Name and Surname (mandatory).
- **Action**:
    - Update Supabase `profiles` table.
    - Trigger `WELCOME` notification to send the automated email from `info@alimnet.com`.
    - Redirect to `/explorar`.

### 4. Component Updates
- **Header**: Update links.
- **Login Page**: Update Google button `redirectTo`.
- **Register Page**: Update Google button `redirectTo`.
- **Explorar Page**: Remove the `IdentityWallModal` as it will be redundant with the new `/bienvenida` flow.

## Implementation Details

### Step 1: Callback Logic
Update `src/app/api/auth/callback/route.ts` to include profile checking logic.

### Step 2: Create Welcome Page
Create `src/app/bienvenida/page.tsx` with a premium look, similar to the existing login/register pages.

### Step 3: Header & Page Redirects
Update `Header.tsx`, `login/page.tsx`, and `registro/page.tsx`.

## Verification Plan
1. Test "SUMATE" button goes to `/registro`.
2. Test "INGRESAR" button goes to `/login`.
3. Test Google Login with a new account -> Redirects to `/bienvenida`.
4. Test Google Login with an existing account -> Redirects to `/explorar`.
5. Verify email is triggered after completing `/bienvenida`.
