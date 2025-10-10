const { validateCardNumber, luhnCheck } = require('../src/js/validator.js');

describe('Luhn Algorithm', () => {
    test('valid card number passes luhn check', () => {
        expect(luhnCheck('4111111111111111')).toBe(true);
        expect(luhnCheck('5500000000000004')).toBe(true);
    });

    test('invalid card number fails luhn check', () => {
        expect(luhnCheck('4111111111111112')).toBe(false);
        expect(luhnCheck('1234567890123456')).toBe(false);
    });
});

describe('Card Number Validation', () => {
    test('valid card numbers', () => {
        expect(validateCardNumber('4111 1111 1111 1111')).toBe(true);
        expect(validateCardNumber('5500 0000 0000 0004')).toBe(true);
        expect(validateCardNumber('3400 0000 0000 009')).toBe(true);
    });

    test('invalid card numbers', () => {
        expect(validateCardNumber('4111 1111 1111 1112')).toBe(false);
        expect(validateCardNumber('1234')).toBe(false);
        expect(validateCardNumber('abcd')).toBe(false);
    });
});
