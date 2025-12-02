import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

Given('I open the SauceDemo login page', async () => {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.open();
});

When(
  'I login with username {string} and password {string}',
  async (user: string, pass: string) => {
    await loginPage.login(user, pass);
  }
);

Then('I should be redirected to the Products page', async () => {
  await expect(pageFixture.page).toHaveURL(/inventory/);
});

Then('I should see an error message', async () => {
  const msg = await loginPage.getErrorMessage();
  expect(msg).toContain('Epic sadface');
});
