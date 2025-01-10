// @ts-check
import 'dotenv/config';
import baseConfig from './src/tests/config/baseConfig';
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list', { printSteps: false }],
    ['html', { open: 'never' }],
  ],
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: baseConfig.WEB_URL,
    actionTimeout: 5_000,
    trace: {
      mode: 'retain-on-failure',
    },
  },
  projects: [
    {
      name: 'chromium',
      testDir: './src/tests',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
