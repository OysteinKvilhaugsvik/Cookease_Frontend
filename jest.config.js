module.exports = {
    // The test environment that will be used for testing
    testEnvironment: 'jest-environment-cypress',
  
    // The file extensions that Jest will look for
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
    // The paths to the files that Jest will use to run tests
    testMatch: ['**/*.spec.(js|jsx|ts|tsx)'],
  
    // The maximum amount of time that Jest should wait for a test to complete
    // before it is considered a failure (in milliseconds)
    testTimeout: 10000,
  
    // The Cypress configuration options
    globals: {
      'cypress-jest': {
        // The path to your Cypress test directory
        // Make sure to update this path to match your project structure
        testFiles: '**/*.(spec|test).(js|jsx|ts|tsx)',
        // The path to your Cypress configuration file
        configFile: 'cypress/config.js',
      },
    },
  };