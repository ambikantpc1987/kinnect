import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright';
import { pageFixture } from './pageFixture';

setDefaultTimeout(60_000); 

let browser: Browser | undefined;
let context: BrowserContext | undefined;

Before(async function () {
  try {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext({ baseURL: 'https://www.saucedemo.com' });
    const page: Page = await context.newPage();
    pageFixture.page = page;
    console.log('Before hook: Playwright page created.');
  } catch (err) {
    console.error('Error in Before hook:', err);
    throw err;
  }
});

After(async function () {
  try {
    if (pageFixture.page) {
      await pageFixture.page.close().catch(() => {});
    }
    if (context) {
      await context.close().catch(() => {});
    }
    if (browser) {
      await browser.close().catch(() => {});
    }
    console.log('After hook: Playwright browser/context/page closed.');
  } catch (err) {
    console.error('Error in After hook:', err);
  } finally {
    pageFixture.page = undefined;
    browser = undefined;
    context = undefined;
  }
});
