'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DONATION_AMOUNTS } from '@/lib/donation-constants';
import { Sparkles, Heart, CheckCircle2, Info } from 'lucide-react';

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
                body: JSON.stringify({ amount, currency, frequency, paymentMethod: currency === 'ARS' ? 'mercadopago' : 'stripe' })
            });
            const data = await res.json();
            if (currency === 'ARS' && data.initPoint) window.location.href = data.initPoint;
            else if (currency === 'USD' && data.clientSecret) { alert("Redireccionando a Stripe..."); }
            else if (data.error) alert("Error: " + data.error);
        } catch (err) { alert("Error al procesar el pago."); } finally { setLoading(false); }
    };

    const styles = {
        masterBlock: {
            width: '100%',
            maxWidth: '550px',
            background: 'white',
            borderRadius: '48px',
            padding: '2.5rem',
            border: '2px solid #E4EBDD',
            boxShadow: '0 40px 100px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1.5rem',
            position: 'relative' as const,
            overflow: 'hidden'
        },
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: 'var(--primary)',
            color: 'white',
            borderRadius: '20px',
            fontSize: '0.65rem',
            fontWeight: '1000',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.05em',
            marginBottom: '0.5rem',
            boxShadow: '0 10px 20px rgba(95, 125, 74, 0.2)'
        },
        headerText: {
            textAlign: 'center' as const,
            marginBottom: '1rem'
        },
        title: {
            fontSize: '2.2rem',
            fontWeight: '950',
            color: 'var(--primary-dark)',
            margin: '0 0 1rem 0',
            letterSpacing: '-0.04em'
        },
        toggleFreqContainer: {
            display: 'flex',
            background: '#F8F9F5',
            padding: '6px',
            borderRadius: '28px',
            border: '1.5px solid #E4EBDD',
            width: '100%',
            marginBottom: '1rem'
        },
        freqBtn: (active: boolean) => ({
            flex: 1,
            padding: '16px',
            borderRadius: '22px',
            border: active ? 'none' : 'none',
            fontSize: '0.9rem',
            fontWeight: '1000',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            background: active ? 'white' : 'transparent',
            color: active ? 'var(--primary-dark)' : '#A5B598',
            boxShadow: active ? '0 10px 25px rgba(0,0,0,0.06)' : 'none',
            transform: active ? 'scale(1.02)' : 'scale(1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
        }),
        gridAmounts: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            width: '100%',
            marginBottom: '1rem'
        },
        amtBtn: (active: boolean) => ({
            padding: '24px 12px',
            borderRadius: '24px',
            border: active ? '3px solid var(--primary)' : '2px solid #F0F4ED',
            background: active ? '#F0F4ED' : 'white',
            color: 'var(--primary-dark)',
            fontSize: '1.2rem',
            fontWeight: '1000',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: '4px'
        }),
        impactNotice: {
            background: '#F0F4ED',
            borderRadius: '24px',
            padding: '1.2rem',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
            border: '1px solid #E4EBDD'
        },
        mainBtn: (disabled: boolean) => ({
            width: '100%',
            padding: '1.4rem',
            borderRadius: '28px',
            border: 'none',
            background: disabled ? '#E4EBDD' : 'var(--primary-dark)',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '1000',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: disabled ? 'none' : '0 15px 40px rgba(45, 58, 32, 0.2)'
        })
    };

    return (
        <div style={styles.masterBlock}>
            {/* BADGE DINÁMICO */}
            <AnimatePresence mode="wait">
                {frequency === 'monthly' && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div style={styles.badge}><Sparkles size={12} /> Miembro Fundador</div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={styles.headerText}>
                <h2 style={styles.title}>
                    {frequency === 'monthly' ? 'Sumate a la red' : 'Aporte Único'}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                    {(['ARS', 'USD'] as const).map(curr => (
                        <button 
                            key={curr}
                            onClick={() => { setCurrency(curr); setAmount(0); }}
                            style={{
                                background: currency === curr ? 'var(--primary-dark)' : 'white',
                                color: currency === curr ? 'white' : 'var(--text-secondary)',
                                border: '1.5px solid #E4EBDD',
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '0.7rem',
                                fontWeight: '1000',
                                cursor: 'pointer'
                            }}
                        >
                            {curr}
                        </button>
                    ))}
                </div>
            </div>

            {/* Selector de FRECUENCIA central */}
            <div style={styles.toggleFreqContainer}>
                <button 
                    style={styles.freqBtn(frequency === 'monthly')}
                    onClick={() => { setFrequency('monthly'); setAmount(0); setIsCustom(false); }}
                >
                    <Heart size={16} fill={frequency === 'monthly' ? 'currentColor' : 'none'} />
                    Mensual
                </button>
                <button 
                    style={styles.freqBtn(frequency === 'once')}
                    onClick={() => { setFrequency('once'); setAmount(0); setIsCustom(false); }}
                >
                    Un solo pago
                </button>
            </div>

            {/* Cuadrícula de montos */}
            <div style={styles.gridAmounts}>
                {amounts.map((v) => (
                    <button
                        key={v}
                        style={styles.amtBtn(amount === v && !isCustom)}
                        onClick={() => handleAmountSelect(v)}
                    >
                        <span style={{ fontSize: '1rem' }}>${v >= 1000 ? `${v/1000}k` : v}</span>
                    </button>
                ))}
                <button
                    style={styles.amtBtn(isCustom)}
                    onClick={() => { setIsCustom(true); setAmount(0); }}
                >
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Otro</span>
                </button>
            </div>

            {/* Input personalizado */}
            <AnimatePresence>
                {isCustom && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                        <input 
                            type="number"
                            placeholder={`Mínimo ${minCustom}`}
                            value={customAmount}
                            onChange={(e) => handleCustomChange(e.target.value)}
                            style={{
                                width: '100%', background: '#F8F9F5', border: '2px solid var(--primary)', 
                                borderRadius: '22px', padding: '1.2rem', fontWeight: '950', fontSize: '1.4rem',
                                textAlign: 'center', color: 'var(--primary-dark)', outline: 'none', marginBottom: '1rem'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Aviso de Impacto */}
            <div style={styles.impactNotice}>
                <div style={{ color: 'var(--primary)', marginTop: '2px' }}><CheckCircle2 size={18} /></div>
                <div>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '1000', color: 'var(--primary-dark)' }}>
                        {frequency === 'monthly' ? 'Soberanía Planificada' : 'Impulso Inmediato'}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4', fontWeight: '600' }}>
                        {frequency === 'monthly' 
                            ? 'Tu apoyo mensual nos permite proyectar un Alimnet sin publicidad ni rastreadores.' 
                            : 'Ayudanos a pagar los servidores de este mes y mantener el código abierto.'}
                    </p>
                </div>
            </div>

            {/* BOTÓN FINAL */}
            <button
                disabled={!amount || amount < minCustom || loading}
                onClick={handlePayment}
                style={styles.mainBtn(!amount || amount < minCustom || loading)}
            >
                {loading ? 'Procesando...' : (amount && amount >= minCustom ? `Confirmar Pago de ${currency} $${amount}` : 'Elegí un monto')}
            </button>
            
            <p style={{ fontSize: '10px', color: 'var(--text-secondary)', textAlign: 'center', opacity: 0.6, fontWeight: '700' }}>
                <Info size={10} style={{ marginRight: '4px' }} />
                Procesado de forma segura por {currency === 'ARS' ? 'Mercado Pago' : 'Stripe'}.
            </p>
        </div>
    );
}
