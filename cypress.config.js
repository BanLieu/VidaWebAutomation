const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  // Make sure to return the config object as it might have been modified by the plugin
  return config;
}

module.exports = defineConfig({
  e2e: {
    //specPattern: "**/*.feature",
    supportFile: "cypress/support/e2e.js",
    experimentalModifyObstructiveThirdPartyCode: true,
    baseUrl: "https://www.vida.com/clients/onboarding/step",
    experimentalRunAllSpecs: true,
    chromeWebSecurity: false,
    experimentalOriginDependencies: true, // Important for cy.origin()
    experimentalSessionAndOrigin: true,
    setupNodeEvents,
   },
  experimentalStudio: true,
});

