'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DONATION_AMOUNTS, PAYMENT_METHODS } from '@/lib/donation-constants';

export default function DonationHub() {
    const [currency, setCurrency] = useState<'ARS' | 'USD'>('ARS');
    const [frequency, setFrequency] = useState<'monthly' | 'once'>('once');
    const [amount, setAmount] = useState<number>(0);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [isCustom, setIsCustom] = useState(false);

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

    return (
        <div className="max-w-md mx-auto p-4 flex flex-col items-center">
            <h2 className="text-3xl font-black text-[var(--primary-dark)] mb-4 text-center">Sostener la red</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8 text-center px-4 font-semibold uppercase tracking-wider">
                Tu aporte permite que Alimnet siga siendo libre y transparente.
            </p>

            {/* Currency Toggle */}
            <div className="flex bg-[rgba(63,82,50,0.05)] p-1 rounded-2xl mb-6 w-full max-w-[280px]">
                {(['ARS', 'USD'] as const).map((curr) => (
                    <button
                        key={curr}
                        onClick={() => { setCurrency(curr); setAmount(0); setIsCustom(false); }}
                        className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all ${
                            currency === curr ? 'bg-white text-[var(--primary-dark)] shadow-sm' : 'text-[var(--text-secondary)] opacity-60'
                        }`}
                    >
                        {curr}
                    </button>
                ))}
            </div>

            {/* Frequency Toggle */}
            <div className="flex bg-[rgba(63,82,50,0.1)] p-2 rounded-2xl mb-8 w-full">
                {(['once', 'monthly'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => { setFrequency(f); setAmount(0); setIsCustom(false); }}
                        className={`flex-1 py-3 px-6 rounded-xl text-sm font-black transition-all ${
                            frequency === f ? 'bg-white text-[var(--primary)] shadow-md translate-y-[-2px]' : 'text-[var(--text-secondary)]'
                        }`}
                    >
                        {f === 'monthly' ? 'Mensual' : 'Un solo pago'}
                        {f === 'monthly' && (
                            <span className="ml-2 text-[10px] bg-[var(--primary)] text-white px-2 py-0.5 rounded-full">RECO</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Amount Grid */}
            <div className="grid grid-cols-3 gap-3 mb-8 w-full">
                {amounts.map((v) => (
                    <button
                        key={v}
                        onClick={() => handleAmountSelect(v)}
                        className={`py-4 rounded-2xl border-2 font-black transition-all ${
                            amount === v && !isCustom 
                                ? 'bg-[var(--primary)] border-[var(--primary)] text-white shadow-lg translate-y-[-4px]' 
                                : 'bg-white border-[rgba(63,82,50,0.1)] text-[var(--text-primary)] hover:border-[var(--primary)]'
                        }`}
                    >
                        {currency === 'USD' ? '$' : '$'}{v >= 1000 ? `${v/1000}k` : v}
                    </button>
                ))}
                <button
                    onClick={() => { setIsCustom(true); setAmount(0); }}
                    className={`py-4 rounded-2xl border-2 font-black transition-all ${
                        isCustom 
                            ? 'bg-[var(--primary)] border-[var(--primary)] text-white' 
                            : 'bg-white border-[rgba(63,82,50,0.1)] text-[var(--text-primary)]'
                    }`}
                >
                    Otro
                </button>
            </div>

            {/* Custom input */}
            <AnimatePresence>
                {isCustom && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-8 w-full"
                    >
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-[var(--text-secondary)]">$</span>
                            <input 
                                type="number"
                                placeholder={`Mínimo ${minCustom}`}
                                value={customAmount}
                                onChange={(e) => handleCustomChange(e.target.value)}
                                className="w-full bg-white border-2 border-[var(--primary)] rounded-2xl py-4 pl-8 pr-4 font-black text-lg focus:outline-none focus:ring-4 focus:ring-[rgba(95,125,74,0.1)]"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Method CTA */}
            <button
                disabled={!amount || amount < minCustom}
                className={`w-full py-5 rounded-3xl font-black text-lg shadow-xl transition-all ${
                    amount && amount >= minCustom 
                        ? 'bg-[var(--primary-dark)] text-white hover:scale-[1.02] active:scale-95' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }`}
            >
                {amount && amount >= minCustom ? `Apoyar con $${amount}` : 'Elegí un monto'}
            </button>
            
            <p className="mt-6 text-[11px] text-[var(--text-secondary)] font-medium text-center opacity-60">
                Aporte 100% seguro. Podés cancelar en cualquier momento desde tu perfil.
            </p>
        </div>
    );
}
