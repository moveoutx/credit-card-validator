module.exports = {
    testEnvironment: 'node',
    testMatch: [
        '**/tests/**/*.test.js',
        '**/e2e/**/*.test.js'
    ],
    testPathIgnorePatterns: [
        '/node_modules/'
    ]
};
