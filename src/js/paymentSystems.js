export const paymentSystems = {
    mir: {
        patterns: [/^220[0-4]\d{12}$/],
        name: 'Mir'
    },
    visa: {
        patterns: [/^4\d{12}(\d{3})?$/],
        name: 'Visa'
    },
    mastercard: {
        patterns: [
            /^5[1-5]\d{14}$/,
            /^2(2[2-9][1-9]|[3-6]\d{2}|7[0-1]\d|720)\d{12}$/
        ],
        name: 'MasterCard'
    },
    amex: {
        patterns: [/^3[47]\d{13}$/],
        name: 'American Express'
    }
};

export function detectPaymentSystem(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, '');

    for (const [system, data] of Object.entries(paymentSystems)) {
        for (const pattern of data.patterns) {
            if (pattern.test(cleanNumber)) {
                return system;
            }
        }
    }

    return null;
}
