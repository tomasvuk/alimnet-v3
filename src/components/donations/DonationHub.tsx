'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DONATION_AMOUNTS } from '@/lib/donation-constants';
import { Sparkles, Heart, CheckCircle2, Coffee, ShieldCheck, ChevronRight, ArrowRight } from 'lucide-react';

export default function DonationHub({ forcedFrequency }: { forcedFrequency?: 'once' | 'monthly' }) {
    const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');
    const [frequency, setFrequency] = useState<'once' | 'monthly'>(forcedFrequency || 'monthly');
    const [amount, setAmount] = useState<number>(0);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isCustom, setIsCustom] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (forcedFrequency) setFrequency(forcedFrequency);
    }, [forcedFrequency]);

    const amounts = DONATION_AMOUNTS[currency][frequency === 'monthly' ? 'MONTHLY' : 'ONCE'];
    const minCustom = DONATION_AMOUNTS[currency].MIN_CUSTOM;

    const handleAmountSelect = (val: number) => {
        setAmount(val);
        setIsCustom(false);
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
            else if (currency === 'USD' && data.clientSecret) alert("Stripe Ready.");
        } catch (err) { alert("Error."); } finally { setLoading(false); }
    };

    const styles = {
        mainContainer: {
            width: '100%',
            maxWidth: '950px',
            background: 'white',
            borderRadius: '40px',
            border: '1.5px solid #E4EBDD',
            boxShadow: '0 40px 100px rgba(0,0,0,0.03)',
            display: 'grid' as const,
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            overflow: 'hidden',
            margin: '2rem auto'
        },
        leftCol: {
            padding: '3rem',
            background: '#F9FAF7',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1.5rem',
            borderRight: '1.5px solid #E4EBDD'
        },
        rightCol: {
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'center',
            gap: '1.5rem'
        },
        choiceBtn: (active: boolean, isFeatured?: boolean) => ({
            width: '100%',
            padding: '1.8rem',
            borderRadius: '24px',
            background: active ? (isFeatured ? 'var(--primary-dark)' : 'white') : 'transparent',
            color: active ? (isFeatured ? 'white' : 'var(--primary-dark)') : '#888',
            border: active ? (isFeatured ? 'none' : '2.5px solid var(--primary)') : '1.5px solid #E4EBDD',
            cursor: 'pointer',
            textAlign: 'left' as const,
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            position: 'relative' as const,
            boxShadow: active ? '0 15px 30px rgba(0,0,0,0.05)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        }),
        gridAmounts: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            width: '100%'
        },
        amtBtn: (active: boolean) => ({
            padding: '1.2rem 10px',
            borderRadius: '16px',
            border: active ? '2px solid var(--primary)' : '1.5px solid #F0F4ED',
            background: active ? '#F0F4ED' : 'white',
            color: 'var(--primary-dark)',
            fontSize: '1rem',
            fontWeight: '1000',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }),
        mainBtn: (disabled: boolean) => ({
            width: '100%',
            padding: '1.2rem',
            borderRadius: '20px',
            border: 'none',
            background: disabled ? '#E4EBDD' : 'var(--primary-dark)',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '1000',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s ease',
            boxShadow: disabled ? 'none' : '0 15px 35px rgba(45, 58, 32, 0.15)'
        })
    };

    return (
        <div style={styles.mainContainer}>
            {/* LADO IZQUIERDO: ELECCIÓN (SAAS STYLE) */}
            <div style={styles.leftCol}>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '1000', fontSize: '0.65rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                        <ShieldCheck size={14} /> Tu compromiso
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '1000', color: 'var(--primary-dark)', margin: 0 }}>Elegí tu respaldo.</h3>
                </div>

                <button 
                    style={styles.choiceBtn(frequency === 'once')}
                    onClick={() => { setFrequency('once'); setAmount(0); setIsCustom(false); }}
                >
                    <div style={{ width: '40px', height: '40px', background: frequency === 'once' ? '#F0F4ED' : 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Coffee size={20} color="var(--primary)" />
                    </div>
                    <div>
                        <div style={{ fontWeight: '1000', fontSize: '0.9rem', marginBottom: '2px' }}>Aporte único</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: '700', opacity: 0.8 }}>Infraestructura inmediata.</div>
                    </div>
                    {frequency === 'once' && <div style={{ marginLeft: 'auto' }}><ChevronRight size={16} /></div>}
                </button>

                <button 
                    style={styles.choiceBtn(frequency === 'monthly', true)}
                    onClick={() => { setFrequency('monthly'); setAmount(0); setIsCustom(false); }}
                >
                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sparkles size={20} color="white" />
                    </div>
                    <div>
                        <div style={{ fontWeight: '1000', fontSize: '0.9rem', marginBottom: '2px' }}>Miembro Fundador</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: '700', opacity: 0.8 }}>Soberanía y planificación.</div>
                    </div>
                    {frequency === 'monthly' && <div style={{ marginLeft: 'auto' }}><ChevronRight size={16} /></div>}
                    <div style={{ position: 'absolute', bottom: '-8px', right: '1.5rem', background: 'var(--primary)', color: 'white', padding: '4px 8px', borderRadius: '10px', fontSize: '0.55rem', fontWeight: '1000' }}>RECOMENDADO</div>
                </button>
            </div>

            {/* LADO DERECHO: PAGO (CHECKOUT STYLE) */}
            <div style={styles.rightCol}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '1000', color: 'var(--primary-dark)' }}>MONTO DEL APORTE</span>
                    <div style={{ background: '#F0F4ED', borderRadius: '10px', padding: '4px 10px', display: 'flex', gap: '8px' }}>
                        {(['ARS', 'USD'] as const).map(curr => (
                            <button 
                                key={curr}
                                onClick={() => { setCurrency(curr); setAmount(0); }}
                                style={{
                                    background: currency === curr ? 'var(--primary-dark)' : 'transparent',
                                    color: currency === curr ? 'white' : '#A5B598',
                                    border: 'none', padding: '2px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: '1000', cursor: 'pointer'
                                }}
                            >
                                {curr}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={styles.gridAmounts}>
                    {amounts.map((v) => (
                        <button
                            key={v}
                            style={styles.amtBtn(amount === v && !isCustom)}
                            onClick={() => handleAmountSelect(v)}
                        >
                            ${v >= 1000 ? `${v/1000}k` : v}
                        </button>
                    ))}
                    <button
                        style={styles.amtBtn(isCustom)}
                        onClick={() => { setIsCustom(true); setAmount(0); }}
                    >
                        <span>Otro</span>
                    </button>
                </div>

                <AnimatePresence>
                    {isCustom && (
                        <motion.input 
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            type="number" placeholder={`Mínimo ${minCustom}`} value={customAmount}
                            onChange={(e) => { setCustomAmount(e.target.value); const num = parseFloat(e.target.value); if (!isNaN(num) && num >= minCustom) setAmount(num); }}
                            style={{ width: '100%', background: '#F8F9F5', border: '1.5px solid var(--primary)', borderRadius: '14px', padding: '1rem', fontWeight: '1000', fontSize: '1rem', textAlign: 'center', color: 'var(--primary-dark)', outline: 'none' }}
                        />
                    )}
                </AnimatePresence>

                <div style={{ background: '#F0F4ED', borderRadius: '16px', padding: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div style={{ color: 'var(--primary)' }}><CheckCircle2 size={16} /></div>
                    <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: '700', color: '#666', lineHeight: '1.4' }}>
                        Tus datos están protegidos. Procesamos vía {currency === 'ARS' ? 'Mercado Pago' : 'Stripe'}.
                    </p>
                </div>

                <button
                    disabled={!amount || amount < minCustom || loading}
                    onClick={handlePayment}
                    style={styles.mainBtn(!amount || amount < minCustom || loading)}
                >
                    {loading ? 'Redirigiendo...' : (amount ? `Apoyar con ${currency} $${amount}` : 'Elegí un monto')}
                    {!loading && <ArrowRight size={18} />}
                </button>
            </div>
        </div>
    );
}
