import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    env: {
      "NODE_ENV": "test"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
