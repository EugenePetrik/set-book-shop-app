module.exports = {
  testTimeout: 15_000,
  verbose: true,
  testEnvironment: 'node',
  bail: 0,
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/integration/setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  coverageDirectory: 'integration-tests-coverage',
  coverageReporters: ['html', 'text'],
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/createApp.js',
    '!src/index.js',
    '!src/utils/seeder.js',
    '!src/utils/swagger.js',
    '!src/config/*.js',
    '!src/middleware/*.js',
    '!src/__tests__/**/*.js',
  ],
  moduleFileExtensions: ['js', 'json', 'node'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testRegex: '__tests__/integration/.*.test.js$',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Bookshop API Integration Tests Report',
        outputPath: './integration-tests-report/integration-test-report.html',
        includeFailureMsg: true,
        includeSuiteFailure: true,
      },
    ],
  ],
};
