import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import * as webpack from "@cypress/webpack-preprocessor";

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", webpack({
    webpackOptions: {
      resolve: {
        extensions: [".js", ".ts"]
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "ts-loader"
              }
            ]
          },
          {
            test: /\.feature$/,
            use: [
              {
                loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                options: config
              }
            ]
          }
        ]
      }
    }
  }));

  return config;
}

export default defineConfig({
  e2e: {
    specPattern: "cypress/integrations/features/*.feature",
    setupNodeEvents
  }
});
