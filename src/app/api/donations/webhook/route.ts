import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { getAdminClient } from '@/lib/supabase';

async function sendAdminNotification(amount: number, currency: string, method: string, frequency: string, donorName: string, donorEmail: string) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) return;

    const formatted = currency === 'USD'
        ? `USD $${amount.toLocaleString('en-US')}`
        : `ARS $${amount.toLocaleString('es-AR')}`;

    console.log('[Email] Sending Admin Notification...');
    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Alimnet <notificaciones@alimnet.com>',
            to: 'info@alimnet.com',
            subject: `💚 Nueva donación de ${donorName}: ${formatted}`,
            html: `
                <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; color: #2D3A20;">
                    <h2>¡Alimnet creció hoy! 🚀</h2>
                    <p><strong>${donorName}</strong> (${donorEmail}) acaba de realizar una donación.</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p><strong>Monto:</strong> ${formatted}</p>
                    <p><strong>Frecuencia:</strong> ${frequency === 'monthly' ? 'Mensual' : 'Pago único'}</p>
                    <p><strong>Método:</strong> ${method === 'stripe' ? 'Stripe' : 'Mercado Pago'}</p>
                    <br>
                    <a href="https://alimnet.com/admin" style="background:#5F7D4A; color:white; padding:12px 20px; text-decoration:none; border-radius:8px; display:inline-block;">Ver en el Panel Admin</a>
                </div>
            `,
        }),
    }).catch(err => console.error('[Admin Email Error]:', err));
}

async function sendDonorThankYouEmail(donorEmail: string, donorName: string, amount: number, currency: string) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY || !donorEmail) return;

    const formatted = currency === 'USD'
        ? `USD $${amount.toLocaleString('en-US')}`
        : `ARS $${amount.toLocaleString('es-AR')}`;

    console.log(`[Email] Sending Thank You to donor: ${donorEmail}`);
    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Tomas Vukojicic <tomas@alimnet.com>',
            to: donorEmail,
            subject: 'Gracias por ser parte de Alimnet 💚',
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #333;">
                    <div style="padding: 20px; background-color: #f9fbf7; border-radius: 12px; border: 1px solid #e1e8db;">
                        <h2 style="color: #2D3A20; margin-top: 0;">¡Hola ${donorName.split(' ')[0]}!</h2>
                        <p>Te escribo personalmente para agradecerte enormemente por tu aporte de <strong>${formatted}</strong> a Alimnet.</p>
                        <p>Tu apoyo es lo que nos permite sostener esta red y seguir creciendo. Para mí, Alimnet no es solo una plataforma, es un compromiso con la soberanía comercial y con los productores que hacen que esto sea posible. Saber que hay personas como vos que valoran este esfuerzo significa todo.</p>
                        <p>Gracias por confiar, por sostener y por ser parte de este camino.</p>
                        <p style="margin-bottom: 0;">Un gran abrazo,</p>
                        <p style="margin-top: 5px; font-weight: bold; color: #5F7D4A;">Tomás Vukojicic</p>
                        <p style="font-size: 0.8rem; color: #888;">Fundador de Alimnet</p>
                    </div>
                </div>
            `,
        }),
    }).catch(err => console.error('[Donor Email Error]:', err));
}

// Los inicializamos dentro para que no falle el build si falta la llave
const getStripe = () => {
    if (!process.env.STRIPE_SECRET_KEY) return null;
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-01-27' as any,
    });
};

const getMPClient = () => {
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim();
    if (!token) return null;
    return new MercadoPagoConfig({
        accessToken: token,
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
            const mpPaymentId = mpUpdate.data?.id || mpUpdate.id;

            if (mpUpdate.type === 'payment' || mpUpdate.action === 'payment.created') {
                console.log(`[Mercado Pago] Investigating payment: ${mpPaymentId}`);
                
                const mpClient = getMPClient();
                if (!mpClient) throw new Error('MP Client not configured');
                
                const payment = new Payment(mpClient);
                const paymentData = await payment.get({ id: mpPaymentId });

                if (paymentData.status === 'approved') {
                    const amount = paymentData.transaction_amount || 0;
                    const currency = paymentData.currency_id || 'ARS';
                    const donorEmail = paymentData.payer?.email || 'N/A';
                    const donorName = paymentData.payer?.first_name 
                        ? `${paymentData.payer.first_name} ${paymentData.payer.last_name || ''}`.trim()
                        : 'Amigo de Alimnet';

                    console.log(`[Mercado Pago] Approved: ${amount} ${currency} from ${donorEmail}`);

                    // Save to DB (using metadata since we can't alter columns)
                    await supabase.from('user_donations').insert({
                        amount,
                        currency,
                        status: 'succeeded',
                        payment_method: 'mercadopago',
                        external_id: String(mpPaymentId),
                        metadata: { 
                            donor_name: donorName, 
                            donor_email: donorEmail,
                            mp_payment_id: mpPaymentId 
                        }
                    });

                    // Send Notifications
                    await sendAdminNotification(amount, currency, 'mercadopago', 'once', donorName, donorEmail);
                    await sendDonorThankYouEmail(donorEmail, donorName, amount, currency);
                }
                return NextResponse.json({ received: true });
            }
            return NextResponse.json({ error: 'Unrecognized MP event type' }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
        }

        // Handle events
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const donorEmail = session.customer_details?.email || 'N/A';
                const donorName = session.customer_details?.name || 'Amigo de Alimnet';
                const amount = (session.amount_total || 0) / 100;
                const currency = (session.currency || 'USD').toUpperCase();
                const frequency = session.metadata?.frequency || 'once';

                console.log(`[Stripe] Payment Success for ${donorEmail}: ${amount} ${currency}`);

                // Save to DB
                await supabase.from('user_donations').insert({
                    amount,
                    currency,
                    status: 'succeeded',
                    payment_method: 'stripe',
                    external_id: session.id,
                    metadata: { 
                        donor_name: donorName, 
                        donor_email: donorEmail,
                        stripe_id: session.id
                    }
                });

                // Send Emails
                await sendAdminNotification(amount, currency, 'stripe', frequency, donorName, donorEmail);
                await sendDonorThankYouEmail(donorEmail, donorName, amount, currency);
                break;
            }
            case 'customer.subscription.deleted': {
                const sub = event.data.object as any;
                await supabase.from('user_subscriptions').update({ status: 'canceled' }).eq('external_id', sub.id);
                break;
            }
            default:
                console.log(`[Stripe] Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error('Webhook Error:', err);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }
}
