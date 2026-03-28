export const DONATION_AMOUNTS = {
    ARS: {
        MONTHLY: [5000, 17000, 25000, 50000],
        ONCE: [5000, 12000, 40000, 60000],
        MIN_CUSTOM: 5000
    },
    USD: {
        MONTHLY: [5, 12, 30, 75],
        ONCE: [12, 40, 100, 250],
        MIN_CUSTOM: 5
    }
};

export const PAYMENT_METHODS = {
    ARS: {
        name: 'Mercado Pago',
        currency: 'ARS',
        countries: ['AR'],
        description: 'Tarjetas de crédito, débito o saldo en Mercado Pago'
    },
    USD: {
        name: 'Stripe Global',
        currency: 'USD',
        countries: ['Global'],
        description: 'Apple Pay, Google Pay, Credit Cards'
    }
};
