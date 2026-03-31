import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usamos variables de entorno para el cliente de Supabase (Admin para poder saltar RLS si es necesario)
export async function POST(req: Request) {
  // Inicialización perezosa de Supabase Admin para evitar errores en el build time si no están las env vars
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseServiceKey) {
    console.error('SUPABASE_SERVICE_ROLE_KEY no está configurada en el entorno');
    return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  try {
    const { merchantId, status } = await req.json();

    if (!merchantId || !['active', 'rejected', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    // 1. Actualizar estado del comercio
    const { data: merchant, error: updateError } = await supabaseAdmin
      .from('merchants')
      .update({ status })
      .eq('id', merchantId)
      .select()
      .single();

    if (updateError) throw updateError;

    // 2. Simulación de envío de correo (Se puede integrar Resend aquí)
    console.log(`[EMAIL] Notificando a info@alimnet.com sobre cambio de estado del comercio: ${merchant.name} -> ${status}`);
    
    // Aquí iría el código de Resend o similar:
    /*
    await resend.emails.send({
      from: 'Alimnet Admin <admin@alimnet.com>',
      to: 'info@alimnet.com',
      subject: `Comercio ${status === 'active' ? 'Aprobado' : 'Rechazado'}: ${merchant.name}`,
      text: `El comercio ${merchant.name} ha sido marcado como ${status}.`
    });
    */

    return NextResponse.json({ success: true, merchant });
  } catch (error: any) {
    console.error('Error updating merchant status:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
