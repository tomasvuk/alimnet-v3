import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const getStripe = () => {
    const key = process.env.STRIPE_SECRET_KEY?.trim();
    if (!key) return null;
    return new Stripe(key, {
        apiVersion: '2024-06-20' as any,
    });
};

const getMPClient = () => {
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim();
    if (!token) return null;
    return new MercadoPagoConfig({
        accessToken: token,
    });
};

const VALID_CURRENCIES = ['USD', 'ARS'];
const VALID_FREQUENCIES = ['once', 'monthly'];
const MAX_AMOUNT_USD = 10000;
const MAX_AMOUNT_ARS = 10000000;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('--- Intent Creation Start ---');
        console.log('Body received:', body);
        const { amount, currency, frequency } = body;

        // Input validation
        if (!amount || typeof amount !== 'number' || !isFinite(amount) || amount <= 0) {
            return NextResponse.json({ error: 'Monto inválido' }, { status: 400 });
        }
        if (!currency || !VALID_CURRENCIES.includes(currency)) {
            return NextResponse.json({ error: 'Moneda no permitida' }, { status: 400 });
        }
        if (frequency && !VALID_FREQUENCIES.includes(frequency)) {
            return NextResponse.json({ error: 'Frecuencia inválida' }, { status: 400 });
        }
        if (currency === 'USD' && amount > MAX_AMOUNT_USD) {
            return NextResponse.json({ error: 'Monto excede el límite permitido' }, { status: 400 });
        }
        if (currency === 'ARS' && amount > MAX_AMOUNT_ARS) {
            return NextResponse.json({ error: 'Monto excede el límite permitido' }, { status: 400 });
        }

        const stripe = getStripe();
        const mpClient = getMPClient();

        console.log('Handlers Status:', { stripe: !!stripe, mpClient: !!mpClient });

        if (currency === 'USD') {
            if (!stripe) throw new Error('Stripe is not configured - Check STRIPE_SECRET_KEY');
            console.log('Creating Stripe Session for:', amount, currency);
            
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: frequency === 'monthly' ? 'Miembro Fundador (Mensual)' : 'Aporte Único Alimnet',
                                description: 'Gracias por apoyar la soberanía comercial.',
                            },
                            unit_amount: Math.round(amount * 100),
                            recurring: frequency === 'monthly' ? { interval: 'month' } : undefined,
                        },
                        quantity: 1,
                    },
                ],
                mode: frequency === 'monthly' ? 'subscription' : 'payment',
                success_url: `${process.env.NEXT_PUBLIC_APP_URL}/gracias?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/sostener`,
                metadata: { frequency, type: 'donation' }
            });

            console.log('Stripe Session Created:', session.url);
            return NextResponse.json({ url: session.url });
            
        } else if (currency === 'ARS') {
            if (!mpClient) throw new Error('Mercado Pago is not configured - Check MERCADOPAGO_ACCESS_TOKEN');
            console.log('Creating MP Preference for:', amount, currency);

            const preference = new Preference(mpClient);
            const result = await preference.create({
                body: {
                    items: [
                        {
                            id: 'donation',
                            title: frequency === 'monthly' ? 'Miembro Fundador Alimnet (Mensual)' : 'Aporte Único Alimnet',
                            quantity: 1,
                            unit_price: Number(amount),
                            currency_id: 'ARS',
                            description: 'Gracias por apoyar la soberanía comercial.'
                        }
                    ],
                    back_urls: {
                        success: `${process.env.NEXT_PUBLIC_APP_URL}/gracias`,
                        failure: `${process.env.NEXT_PUBLIC_APP_URL}/sostener`,
                        pending: `${process.env.NEXT_PUBLIC_APP_URL}/pending`
                    },
                    auto_return: 'approved',
                    external_reference: JSON.stringify({ frequency, type: 'donation' }),
                    notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/donations/webhook?token=${process.env.MERCADOPAGO_WEBHOOK_SECRET}`
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
