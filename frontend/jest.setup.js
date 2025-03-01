import '@testing-library/jest-dom'

//Mock next.js router
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        pathname: '/',
        query: {},
        asPath: '/',
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
    }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        prefetch: jest.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

  // Suppress specific console messages if needed
global.console = {
    ...console,
    // Uncomment to suppress console.error or warning during tests
    // error: jest.fn(),
    // warn: jest.fn(),
};

  // Reset mocks between tests
beforeEach(() => {
    jest.clearAllMocks();
});