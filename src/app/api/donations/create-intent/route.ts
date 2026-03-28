import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { getAdminClient } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27' as any,
});

const mpClient = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
    try {
        const { amount, currency, frequency, paymentMethod } = await req.json();

        // 1. Auth check (optional but recommended)
        const supabase = getAdminClient();
        // Here we could check user session if passed in headers

        if (currency === 'USD') {
            // STRIPE PATH
            if (frequency === 'monthly') {
                // For recurring USD, we usually return a Stripe Pricing ID or handle via Checkout
                // For this MVP, let's assume one-time to start or standard PaymentIntent
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(amount * 100), // cents
                    currency: 'usd',
                    automatic_payment_methods: { enabled: true },
                    metadata: { frequency, type: 'donation' }
                });
                return NextResponse.json({ clientSecret: paymentIntent.client_secret });
            } else {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Math.round(amount * 100),
                    currency: 'usd',
                    automatic_payment_methods: { enabled: true },
                });
                return NextResponse.json({ clientSecret: paymentIntent.client_secret });
            }
        } else if (currency === 'ARS') {
            // MERCADO PAGO PATH
            const preference = new Preference(mpClient);
            const result = await preference.create({
                body: {
                    items: [
                        {
                            id: 'donation',
                            title: 'Alimnet Support',
                            quantity: 1,
                            unit_price: Number(amount),
                            currency_id: 'ARS'
                        }
                    ],
                    back_urls: {
                        success: `${process.env.NEXT_PUBLIC_APP_URL}/gracias`,
                        failure: `${process.env.NEXT_PUBLIC_APP_URL}/error`,
                        pending: `${process.env.NEXT_PUBLIC_APP_URL}/pending`
                    },
                    auto_return: 'approved',
                    notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/donations/webhook`
                }
            });
            return NextResponse.json({ preferenceId: result.id, initPoint: result.init_point });
        }

        return NextResponse.json({ error: 'Invalid currency' }, { status: 400 });

    } catch (error: any) {
        console.error('Intent Creation Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
