const { getPage } = require('../hooks/pageFixture.ts');
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

Given('I open the SauceDemo login page', async function () {
  const page = getPage();
  loginPage = new LoginPage(page);
  await loginPage.open();
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  const page = getPage();
  loginPage = new LoginPage(page);
  await loginPage.login(username, password);
});

Then('I should be redirected to the Products page', async function () {
  const page = getPage();
  await expect(page).toHaveURL(/inventory/);
});

Then('I should see an error message', async function () {
  const page = getPage();
  const errorText = page.locator('h3[data-test="error"]');
  await expect(errorText).toBeVisible({ timeout: 7000 });
  await expect(errorText).toContainText(/locked out|Epic sadface/i);
});
