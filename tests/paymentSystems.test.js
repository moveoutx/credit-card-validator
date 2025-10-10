const { detectPaymentSystem, paymentSystems } = require('../src/js/paymentSystems.js');

describe('Payment System Detection', () => {
    test('detects Visa cards', () => {
        expect(detectPaymentSystem('4111111111111111')).toBe('visa');
    });

    test('detects MasterCard cards', () => {
        expect(detectPaymentSystem('5500000000000004')).toBe('mastercard');
    });

    test('detects Mir cards', () => {
        expect(detectPaymentSystem('2200000000000000')).toBe('mir');
    });

    test('detects American Express cards', () => {
        expect(detectPaymentSystem('340000000000009')).toBe('amex');
    });

    test('returns null for unknown cards', () => {
        expect(detectPaymentSystem('1234567890123456')).toBeNull();
    });
});
