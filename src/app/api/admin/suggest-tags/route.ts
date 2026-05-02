import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { merchant_id, name, bio_short, instagram_url, locality } = await req.json();

    // Verificar que sea admin
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseAdmin.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { data: profile } = await supabaseAdmin.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // Cargar tags válidos desde DB
    const { data: cats } = await supabaseAdmin.from('tag_categories').select('tags').order('sort_order');
    const validTags = (cats || []).flatMap((c: { tags: string[] }) => c.tags);

    // Construir contexto del comercio
    const igHandle = instagram_url ? instagram_url.replace(/.*instagram\.com\//, '@').replace(/\/$/, '') : '';
    const context = [name, locality, igHandle, bio_short].filter(Boolean).join(' · ');

    if (!context.trim() || context.length < 5) {
      return NextResponse.json({ suggested: [], reason: 'sin info suficiente' });
    }

    // Usar Haiku con búsqueda web via tool_use
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      tools: [{
        type: 'web_search_20250305' as any,
        name: 'web_search',
        max_uses: 1,
      }],
      messages: [{
        role: 'user',
        content: `Buscá en internet el comercio: "${context}". Luego asigná SOLO tags de esta lista exacta (sin inventar): ${validTags.join(', ')}. Respondé SOLO con JSON: {"tags":["tag1","tag2"]} con máximo 6 tags. Si no encontrás info real, respondé {"tags":[]}.`
      }]
    });

    // Extraer tags de la respuesta
    const textBlock = response.content.find((b: { type: string }) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ suggested: [], reason: 'sin respuesta' });
    }

    const jsonMatch = (textBlock as { type: 'text'; text: string }).text.match(/\{[^}]*"tags"\s*:\s*\[[^\]]*\][^}]*\}/);
    if (!jsonMatch) return NextResponse.json({ suggested: [], reason: 'sin info suficiente' });

    const parsed = JSON.parse(jsonMatch[0]);
    const suggested = (parsed.tags || []).filter((t: string) => validTags.includes(t)).slice(0, 6);

    return NextResponse.json({ suggested });
  } catch (e) {
    console.error('suggest-tags error:', e);
    return NextResponse.json({ suggested: [], reason: 'error' });
  }
}
