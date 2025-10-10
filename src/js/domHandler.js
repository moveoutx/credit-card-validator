import { validateCardNumber } from './validator.js';
import { detectPaymentSystem, paymentSystems } from './paymentSystems.js';

export class CardValidator {
    constructor() {
        this.cardInput = document.getElementById('cardNumber');
        this.validateBtn = document.getElementById('validateBtn');
        this.result = document.getElementById('result');
        this.cardImage = document.getElementById('cardImage');
        this.systemName = document.getElementById('systemName');

        this.validateBtn.addEventListener('click', () => this.validate());
        this.cardInput.addEventListener('input', (e) => this.handleInput(e));
        this.cardInput.addEventListener('keypress', (e) => this.handleKeyPress(e));
    }

    handleInput(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value.substring(0, 19);

        this.updateCardImage(value);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.validate();
        }
    }

    updateCardImage(cardNumber) {
        const system = detectPaymentSystem(cardNumber);

        if (system && paymentSystems[system]) {
            // Для E2E тестов просто показываем текст вместо изображений
            this.cardImage.alt = paymentSystems[system].name;
            this.cardImage.style.display = 'block';
            this.systemName.textContent = paymentSystems[system].name;
            this.systemName.style.display = 'block';
        } else {
            this.cardImage.style.display = 'none';
            this.systemName.style.display = 'none';
        }
    }

    validate() {
        const cardNumber = this.cardInput.value;

        if (!cardNumber.trim()) {
            this.showResult('Please enter card number', 'error');
            return;
        }

        const isValid = validateCardNumber(cardNumber);
        const system = detectPaymentSystem(cardNumber);

        if (isValid && system) {
            this.showResult(`Valid ${paymentSystems[system].name} card`, 'success');
        } else if (!system) {
            this.showResult('Unknown payment system', 'error');
        } else {
            this.showResult('Invalid card number', 'error');
        }
    }

    showResult(message, type) {
        this.result.textContent = message;
        this.result.className = `result ${type}`;
    }
}
