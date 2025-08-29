const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = {
  experimentalSessionAndOrigin: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
    specPattern: 'cypress/e2e/**/*.feature', // Path to your feature files
        setupNodeEvents(on, config) {
          on('file:preprocessor', cucumber());
          // You might also need to add the following for older versions:
          // on('file:preprocessor', require('cypress-cucumber-preprocessor')());
        },
  },
};
