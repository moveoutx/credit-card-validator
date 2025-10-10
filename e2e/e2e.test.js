const puppeteer = require('puppeteer');
const { fork } = require('child_process');
const path = require('path');

jest.setTimeout(30000);

describe('Credit Card Validator form', () => {
    let browser = null;
    let page = null;
    let server = null;
    const baseUrl = 'http://localhost:9000';

    beforeAll(async () => {
        // Запускаем dev server
        server = fork(path.join(__dirname, 'e2e.server.js'));

        await new Promise((resolve, reject) => {
            server.on('error', (err) => {
                console.error('Server error:', err);
                reject(err);
            });
            server.on('message', (message) => {
                if (message === 'ok') {
                    console.log('Server started successfully');
                    resolve();
                }
            });

            // Таймаут на запуск сервера
            setTimeout(() => {
                reject(new Error('Server startup timeout'));
            }, 10000);
        });

        // Запускаем браузер
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        page = await browser.newPage();

        console.log('Browser launched');
    });

    afterAll(async () => {
        if (browser) {
            await browser.close();
            console.log('Browser closed');
        }
        if (server) {
            server.kill();
            console.log('Server killed');
        }
    });

    beforeEach(async () => {
        // Переходим на страницу перед каждым тестом
        await page.goto(baseUrl);
        await page.waitForSelector('#cardNumber', { timeout: 5000 });
    });

    test('should validate valid Visa card', async () => {
        console.log('Testing valid Visa card...');

        // Вводим номер карты
        await page.type('#cardNumber', '4111111111111111');

        // Нажимаем кнопку валидации
        await page.click('#validateBtn');

        // Ждем результат
        await page.waitForSelector('.result.success', { timeout: 5000 });

        // Проверяем текст результата
        const resultText = await page.$eval('#result', el => el.textContent);
        expect(resultText).toContain('Valid Visa card');
    });

    test('should show error for invalid card', async () => {
        console.log('Testing invalid card...');

        await page.type('#cardNumber', '4111111111111112');
        await page.click('#validateBtn');

        await page.waitForSelector('.result.error', { timeout: 5000 });
        const resultText = await page.$eval('#result', el => el.textContent);

        expect(resultText).toContain('Invalid card number');
    });

    test('should detect payment system while typing', async () => {
        console.log('Testing payment system detection...');

        await page.type('#cardNumber', '4111');

        // Ждем обновления DOM
        await page.waitForTimeout(1000);

        const systemName = await page.$eval('#systemName', el => el.textContent);
        expect(systemName).toBe('Visa');
    });

    test('should format card number with spaces', async () => {
        console.log('Testing card number formatting...');

        await page.type('#cardNumber', '4111111111111111');

        await page.waitForTimeout(1000);

        const inputValue = await page.$eval('#cardNumber', input => input.value);
        expect(inputValue).toBe('4111 1111 1111 1111');
    });

    test('should show error for empty card number', async () => {
        console.log('Testing empty card validation...');

        await page.click('#validateBtn');

        await page.waitForSelector('.result.error', { timeout: 5000 });
        const resultText = await page.$eval('#result', el => el.textContent);

        expect(resultText).toContain('Please enter card number');
    });
});
