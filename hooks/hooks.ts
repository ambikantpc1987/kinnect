import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { pageFixture } from './pageFixture';

Before(async () => {
  pageFixture.browser = await chromium.launch({ headless: true });
  const context = await pageFixture.browser.newContext();
  pageFixture.page = await context.newPage();
});

After(async () => {
  await pageFixture.page.close();
  await pageFixture.browser.close();
});
