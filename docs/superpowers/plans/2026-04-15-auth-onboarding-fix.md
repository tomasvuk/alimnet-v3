# Auth and Onboarding Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the Google Auth loop, correct header CTA destinations, and implement a dedicated "Welcome" onboarding page.

**Architecture:** Unified Google Auth redirect to `/api/auth/callback` which acts as a router. New users are redirected to `/bienvenida` for profile completion before reaching the map.

**Tech Stack:** Next.js, Supabase, Lucide React, CSS Modules.

---

### Task 1: Update Header CTA Links

**Files:**
- Modify: `src/components/Header.tsx:178-189`

- [ ] **Step 1: Change SÚMATE link**
Modify the SÚMATE button to point to `/registro` instead of `/login?mode=signup`.

```tsx
            <button 
              onClick={() => router.push('/registro')}
              style={{ 
                padding: '0.5rem 1.2rem', borderRadius: '15px', background: '#5F7D4A', color: 'white', 
                fontWeight: '950', fontSize: '0.75rem', border: 'none', cursor: 'pointer',
                transition: 'all 0.2s', letterSpacing: '0.02em'
              }}
              className="hover-scale"
            >
              SÚMATE
            </button>
```

- [ ] **Step 2: Verification**
Clicking "SÚMATE" in the header should now take you to `/registro`.

- [ ] **Step 3: Commit**
```bash
git add src/components/Header.tsx
git commit -m "fix: update header cta to point to /registro"
```

---

### Task 2: Unified Auth Callback Routing

**Files:**
- Modify: `src/app/api/auth/callback/route.ts`

- [ ] **Step 1: Add profile check logic**
Update the callback to check if the user has a `first_name` and `last_name`. If not, redirect to `/bienvenida`. Also ensure the session cookie is set correctly.

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/explorar';

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://keagrrvtzmsukcmzxqrl.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '...'; // Keep existing key
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.session) {
      // Check if profile is complete
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', data.session.user.id)
        .single();

      const isNewUser = !profile?.first_name || !profile?.last_name;
      const redirectUrl = isNewUser ? `${origin}/bienvenida` : `${origin}${next}`;
      
      const response = NextResponse.redirect(redirectUrl);
      
      // Cookie persistence for mobile
      const essentialSession = {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
      };
      
      const cookieName = 'sb-keagrrvtzmsukcmzxqrl-auth-token';
      const cookieValue = encodeURIComponent(JSON.stringify(essentialSession));
      
      response.cookies.set(cookieName, cookieValue, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
        sameSite: 'lax',
        secure: true,
      });

      return response;
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-failure`);
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/api/auth/callback/route.ts
git commit -m "feat: add profile check and conditional redirect to auth callback"
```

---

### Task 3: Create Bienvenida Page

**Files:**
- Create: `src/app/bienvenida/page.tsx`

- [ ] **Step 1: Create the onboarding page**
Implementation of the Welcome page with Name/Surname form.

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AlimnetLoader from '@/components/AlimnetLoader';

export default function BienvenidaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ first_name: '', last_name: '' });
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('first_name, last_name').eq('id', session.user.id).single();
      if (profile?.first_name && profile?.last_name) {
        router.push('/explorar');
      } else {
        setChecking(false);
      }
    };
    checkUser();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const { error } = await supabase.from('profiles').update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        full_name: `${formData.first_name} ${formData.last_name}`
      }).eq('id', session.user.id);
      
      if (error) throw error;

      // Trigger Welcome Email
      const userLang = navigator.language?.startsWith('es') ? 'es' : 'en';
      const { data: notification } = await supabase
        .from('notifications')
        .insert({
          user_id: session.user.id,
          title: userLang === 'es' ? '¡Bienvenido a Alimnet!' : 'Welcome to Alimnet!',
          content: 'Bienvenida personal de Tomás Vukojicic.',
          type: 'WELCOME',
          metadata: {
            name: formData.first_name,
            email: session.user.email,
            lang: userLang
          }
        }).select().single();

      if (notification) {
        fetch('/api/notifications/process', {
          method: 'POST',
          body: JSON.stringify({ notificationId: notification.id })
        }).catch(err => console.error(err));
      }

      router.push('/explorar');
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  if (checking) return <AlimnetLoader fullScreen />;

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
       <div style={{ maxWidth: '450px', width: '100%', background: 'white', borderRadius: '40px', padding: '3.5rem', boxShadow: '0 20px 50px rgba(63, 82, 50, 0.1)' }}>
          <div style={{ width: '70px', height: '70px', background: '#F0F4ED', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
             <Leaf size={35} color="#5F7D4A" />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '950', textAlign: 'center', color: '#2D3A20', marginBottom: '1rem' }}>¡Hola! Sumate por primera vez.</h1>
          <p style={{ textAlign: 'center', color: '#666', fontWeight: '600', marginBottom: '2.5rem' }}>Para conocer a los productores, necesitamos saber quién eres.</p>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#5F7D4A', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Nombre</label>
              <input 
                required
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                style={{ width: '100%', padding: '1.1rem', borderRadius: '16px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '800' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#5F7D4A', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Apellido</label>
              <input 
                required
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                style={{ width: '100%', padding: '1.1rem', borderRadius: '16px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '800' }}
              />
            </div>
            <button 
              type="submit" disabled={loading}
              style={{ width: '100%', padding: '1.2rem', borderRadius: '20px', background: '#5F7D4A', color: 'white', border: 'none', fontWeight: '1000', fontSize: '1rem', cursor: 'pointer', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              {loading ? 'Preparando todo...' : 'Empezar a explorar'} <ArrowRight size={20} />
            </button>
          </form>
       </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/bienvenida/page.tsx
git commit -m "feat: add dedicated welcome onboarding page"
```

---

### Task 4: Fix Login & Register Google Redirects

**Files:**
- Modify: `src/app/login/page.tsx:135-148`
- Modify: `src/app/registro/page.tsx:115-124`

- [ ] **Step 1: Update Login Google button**
Change the `redirectTo` to go through the callback.

```tsx
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: { 
                    redirectTo: `${window.location.origin}/api/auth/callback?next=/explorar` 
                  }
                });
```

- [ ] **Step 2: Update Register Google button**
(Ensure it's consistent)

```tsx
                await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: { 
                    redirectTo: `${window.location.origin}/api/auth/callback?next=/explorar` 
                  }
                });
```

- [ ] **Step 3: Commit**
```bash
git add src/app/login/page.tsx src/app/registro/page.tsx
git commit -m "fix: route google logins through unified auth callback"
```

---

### Task 5: Final Cleanup and Verification

**Files:**
- Modify: `src/app/explorar/page.tsx`

- [ ] **Step 1: Remove redundant IdentityWallModal**
Remove the modal and its state from `explorar/page.tsx` since `/bienvenida` handles it now.

- [ ] **Step 2: Test the entire flow**
1. Click SÚMATE -> Go to `/registro`.
2. Google Login with new account -> land on `/bienvenida`.
3. Complete `/bienvenida` -> land on `/explorar` + check if mail is triggered.
4. Google Login with existing account -> land on `/explorar`.

- [ ] **Step 3: Commit**
```bash
git add src/app/explorar/page.tsx
git commit -m "refactor: remove redundant identity wall from explorer page"
```
