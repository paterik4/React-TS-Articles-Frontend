module.exports = {
    verbose: true,

    roots: ['<rootDir>/src'],

    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },

    testEnvironment: 'jest-environment-jsdom',

    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

    testPathIgnorePatterns: ['/node_modules/', '/public/'],

    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'css']
}
