import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminClient } from '@/lib/supabase';

async function sendDonationEmail(amount: number, currency: string, method: string, frequency: string) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) return; // Email notifications disabled if key not set

    const formatted = currency === 'USD'
        ? `USD $${amount.toLocaleString('en-US')}`
        : `ARS $${amount.toLocaleString('es-AR')}`;

    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Alimnet <notificaciones@alimnet.com>',
            to: 'info@alimnet.com',
            subject: `💚 Nueva donación recibida: ${formatted}`,
            html: `
                <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 2rem;">
                    <h2 style="color: #2D3A20;">Nueva donación recibida</h2>
                    <table style="width:100%; border-collapse:collapse; margin-top:1rem;">
                        <tr><td style="padding:8px 0; color:#888;">Monto</td><td style="font-weight:bold; color:#2D3A20;">${formatted}</td></tr>
                        <tr><td style="padding:8px 0; color:#888;">Tipo</td><td>${frequency === 'monthly' ? 'Mensual recurrente' : 'Pago único'}</td></tr>
                        <tr><td style="padding:8px 0; color:#888;">Método</td><td>${method === 'stripe' ? 'Stripe (tarjeta)' : 'Mercado Pago'}</td></tr>
                    </table>
                    <p style="margin-top:2rem; color:#888; font-size:0.85rem;">Ver todos los pagos en el <a href="https://www.alimnet.com/admin" style="color:#5F7D4A;">panel de administración</a>.</p>
                </div>
            `,
        }),
    }).catch(err => console.error('[Email] Error enviando notificación:', err));
}

// Los inicializamos dentro para que no falle el build si falta la llave
const getStripe = () => {
    if (!process.env.STRIPE_SECRET_KEY) return null;
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-01-27' as any,
    });
};

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature');
    const supabase = getAdminClient();
    const stripe = getStripe();

    try {
        let event: Stripe.Event;

        // Verify Stripe signature
        if (sig && WEBHOOK_SECRET && stripe) {
            event = stripe.webhooks.constructEvent(payload, sig, WEBHOOK_SECRET);
        } else if (!sig) {
            // Mercado Pago path: verify shared secret token in query param
            const url = new URL(req.url);
            const token = url.searchParams.get('token');
            const MP_WEBHOOK_SECRET = process.env.MERCADOPAGO_WEBHOOK_SECRET;

            if (!MP_WEBHOOK_SECRET || !token || token !== MP_WEBHOOK_SECRET) {
                console.warn('[Webhook] Rejected: missing or invalid MP token');
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }

            const mpUpdate = JSON.parse(payload);
            if (mpUpdate.type === 'payment') {
                console.log('Mercado Pago Payment update:', mpUpdate.id);
                // TODO: verify payment via MP API: GET /v1/payments/{id}
                return NextResponse.json({ received: true });
            }
            return NextResponse.json({ error: 'Unrecognized event type' }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                const amount = paymentIntent.amount / 100;
                const currency = paymentIntent.currency.toUpperCase();
                const frequency = paymentIntent.metadata?.frequency || 'once';
                await supabase.from('user_donations').insert({
                    amount,
                    currency,
                    status: 'succeeded',
                    payment_method: 'stripe',
                    external_id: paymentIntent.id,
                    metadata: paymentIntent.metadata
                });
                await sendDonationEmail(amount, currency, 'stripe', frequency);
                break;
            }
            case 'customer.subscription.created':
                const subscription = event.data.object as any;
                await supabase.from('user_subscriptions').upsert({
                    external_id: subscription.id,
                    gateway: 'stripe',
                    status: subscription.status,
                    amount: Number(subscription.items.data[0].price.unit_amount) / 100,
                    currency: subscription.currency.toUpperCase(),
                    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                });
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error('Webhook Error:', err);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }
}
