const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './'
});

const customJestConfig = {
    setFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: [
        '<rootDir/src/__tests__/**/*/.test.[jt]s?(x)',
        '<rootDir/src/__tests__/unit/**/*/.test.[jt]s?(x)',
        '<rootDir/src/__tests__/integration/**/*/.test.[jt]s?(x)',
        '<rootDir/src/__tests__/e2e/**/*/.test.[jt]s?(x)',
    ],
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/src/components/$1',
        '^@/app/(.*)$': '<rootDir>/src/app/$1',
        '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@/store/(.*)$': '<rootDir>/src/store/$1',
        '^@/api/(.*)$': '<rootDir>/src/api/$1',
        '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
        '^@/types/(.*)$': '<rootDir>/src/types/$1',
        '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
        //this is for if we use CSS imports -- currently only inline tailwind is used
        '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: [
        'src/**/*/{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/styles/**',
        '!src/types/**/*.{ts,tsx}',
        '!**/node_modules/**',
    ],
    testTimeout: 10000,
};

module.exports = createJestConfig(customJestConfig);