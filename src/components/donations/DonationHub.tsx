'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DONATION_AMOUNTS } from '@/lib/donation-constants';

export default function DonationHub({ forcedFrequency }: { forcedFrequency?: 'once' | 'monthly' }) {
    const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');
    const [frequency, setFrequency] = useState<'once' | 'monthly'>(forcedFrequency || 'monthly');
    const [amount, setAmount] = useState<number>(0);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isCustom, setIsCustom] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (forcedFrequency) {
            setFrequency(forcedFrequency);
        }
    }, [forcedFrequency]);

    const amounts = DONATION_AMOUNTS[currency][frequency === 'monthly' ? 'MONTHLY' : 'ONCE'];
    const minCustom = DONATION_AMOUNTS[currency].MIN_CUSTOM;

    const handleAmountSelect = (val: number) => {
        setAmount(val);
        setIsCustom(false);
    };

    const handleCustomChange = (val: string) => {
        setCustomAmount(val);
        const num = parseFloat(val);
        if (!isNaN(num) && num >= minCustom) {
            setAmount(num);
        }
    };

    const handlePayment = async () => {
        if (!amount || amount < minCustom) return;
        setLoading(true);

        try {
            const res = await fetch('/api/donations/create-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount,
                    currency,
                    frequency,
                    paymentMethod: currency === 'ARS' ? 'mercadopago' : 'stripe'
                })
            });

            const data = await res.json();

            if (currency === 'ARS' && data.initPoint) {
                window.location.href = data.initPoint;
            } else if (currency === 'USD' && data.clientSecret) {
                alert("Redireccionando a Stripe (Modo Prueba)...");
                console.log("Stripe Secret:", data.clientSecret);
            } else if (data.error) {
                alert("Error: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Hubo un error al procesar el pago.");
        } finally {
            setLoading(false);
        }
    };

    // Estilos Inline para asegurar que se vea perfecto en cualquier lado
    const styles = {
        container: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            fontFamily: 'inherit'
        },
        title: {
            fontSize: '1.8rem',
            fontWeight: '950',
            color: 'var(--primary-dark)',
            margin: '0 0 0.5rem 0',
            textAlign: 'center' as const,
            letterSpacing: '-0.04em'
        },
        subtitle: {
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            textAlign: 'center' as const,
            fontWeight: '600',
            lineHeight: '1.5'
        },
        toggleGroup: {
            display: 'flex',
            background: '#F0F4ED',
            padding: '4px',
            borderRadius: '20px',
            marginBottom: '1.5rem',
            width: 'fit-content'
        },
        toggleButton: (active: boolean) => ({
            padding: '8px 24px',
            borderRadius: '16px',
            border: 'none',
            fontSize: '0.75rem',
            fontWeight: '1000',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            background: active ? 'white' : 'transparent',
            color: active ? 'var(--primary-dark)' : 'var(--text-secondary)',
            boxShadow: active ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
        }),
        freqToggle: {
            display: 'flex',
            background: 'white',
            border: '2px solid #E4EBDD',
            padding: '6px',
            borderRadius: '24px',
            marginBottom: '2rem',
            width: '100%'
        },
        freqButton: (active: boolean) => ({
            flex: 1,
            padding: '12px',
            borderRadius: '18px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: '1000',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: active ? 'var(--primary)' : 'transparent',
            color: active ? 'white' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        }),
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            width: '100%',
            marginBottom: '2rem'
        },
        amountButton: (active: boolean) => ({
            padding: '20px',
            borderRadius: '20px',
            border: active ? '2px solid var(--primary)' : '2px solid #F0F4ED',
            background: active ? '#F0F4ED' : 'white',
            color: 'var(--primary-dark)',
            fontSize: '1.1rem',
            fontWeight: '1000',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            justifyContent: 'center'
        }),
        mainButton: (disabled: boolean) => ({
            width: '100%',
            padding: '1.2rem',
            borderRadius: '24px',
            border: 'none',
            background: disabled ? '#E4EBDD' : 'var(--primary-dark)',
            color: disabled ? '#A5B598' : 'white',
            fontSize: '1rem',
            fontWeight: '1000',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: disabled ? 'none' : '0 10px 30px rgba(45, 58, 32, 0.2)'
        })
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Sostener la red</h2>
            <p style={styles.subtitle}>
                Tu aporte permite que Alimnet siga siendo <br/>libre y transparente.
            </p>

            {/* Currency Toggle */}
            <div style={styles.toggleGroup}>
                {(['ARS', 'USD'] as const).map((curr) => (
                    <button
                        key={curr}
                        style={styles.toggleButton(currency === curr)}
                        onClick={() => { setCurrency(curr); setAmount(0); setIsCustom(false); }}
                    >
                        {curr === 'ARS' ? 'ARS' : 'USD'}
                    </button>
                ))}
            </div>

            {/* Frequency Toggle */}
            <div style={styles.freqToggle}>
                {(['once', 'monthly'] as const).map((f) => (
                    <button
                        key={f}
                        style={styles.freqButton(frequency === f)}
                        onClick={() => { setFrequency(f); setAmount(0); setIsCustom(false); }}
                    >
                        {f === 'monthly' ? 'Mensual' : 'Un solo pago'}
                        {f === 'monthly' && (
                            <span style={{ 
                                fontSize: '0.6rem', background: frequency === 'monthly' ? 'white' : 'var(--primary)', 
                                color: frequency === 'monthly' ? 'var(--primary)' : 'white', 
                                padding: '2px 6px', borderRadius: '10px' 
                            }}>RECO</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Amount Grid */}
            <div style={styles.grid}>
                {amounts.map((v) => (
                    <button
                        key={v}
                        style={styles.amountButton(amount === v && !isCustom)}
                        onClick={() => handleAmountSelect(v)}
                    >
                        <span style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '4px' }}>{currency}</span>
                        ${v >= 1000 ? `${v/1000}k` : v}
                    </button>
                ))}
                <button
                    style={styles.amountButton(isCustom)}
                    onClick={() => { setIsCustom(true); setAmount(0); }}
                >
                    <span style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '4px' }}>Otro</span>
                    ...
                </button>
            </div>

            {/* Custom input */}
            <AnimatePresence>
                {isCustom && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{ width: '100%', marginBottom: '1.5rem' }}
                    >
                        <input 
                            type="number"
                            placeholder={`Mínimo ${minCustom}`}
                            value={customAmount}
                            onChange={(e) => handleCustomChange(e.target.value)}
                            style={{
                                width: '100%', background: '#F0F4ED', border: '2px solid var(--primary)', 
                                borderRadius: '18px', padding: '1rem', fontWeight: '900', fontSize: '1.2rem',
                                textAlign: 'center', color: 'var(--primary-dark)', outline: 'none'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Method CTA */}
            <button
                disabled={!amount || amount < minCustom || loading}
                onClick={handlePayment}
                style={styles.mainButton(!amount || amount < minCustom || loading)}
            >
                {loading ? 'Procesando...' : (amount && amount >= minCustom ? `Apoyar con ${currency} $${amount}` : 'Elegí un monto')}
            </button>
            
            <p style={{ marginTop: '1.5rem', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600', textAlign: 'center', opacity: 0.7 }}>
                Aporte 100% seguro. Podés cancelar en cualquier momento desde tu perfil.
            </p>
        </div>
    );
}
