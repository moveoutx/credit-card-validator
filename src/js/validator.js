export function luhnCheck(cardNumber) {
    const digits = cardNumber.replace(/\s/g, '').split('').map(Number);
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

export function validateCardNumber(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, '');

    if (!/^\d+$/.test(cleanNumber)) {
        return false;
    }

    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
        return false;
    }

    return luhnCheck(cleanNumber);
}
