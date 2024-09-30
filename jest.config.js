module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
    collectCoverage: true,
    coverageReporters: ['text', 'text-summary', 'lcov', 'clover', 'cobertura', 'html'],

}
