import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAdminClient } from '@/lib/supabase';

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
        } else {
            // Assume MP or simple mock for now
            const mpUpdate = JSON.parse(payload);
            if (mpUpdate.type === 'payment') {
                // Handle Mercado Pago
                console.log('Mercado Pago Payment update:', mpUpdate);
                return NextResponse.json({ received: true });
            }
            return NextResponse.json({ error: 'Missing signature or Stripe not configured' }, { status: 400 });
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object as Stripe.PaymentIntent;
                await supabase.from('user_donations').insert({
                    amount: paymentIntent.amount / 100,
                    currency: paymentIntent.currency.toUpperCase(),
                    status: 'succeeded',
                    payment_method: 'stripe',
                    external_id: paymentIntent.id,
                    metadata: paymentIntent.metadata
                });
                break;
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
