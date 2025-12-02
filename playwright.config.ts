import './playwright-bdd.config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests-gen',

  use: {
    browserName: 'chromium',
    headless: true,
  },
});
