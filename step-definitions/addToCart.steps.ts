import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

let loginPage: LoginPage;
let productsPage: ProductsPage;

Given('I am logged in as {string}', async function (username: string) {
  loginPage = new LoginPage(pageFixture.page);
  productsPage = new ProductsPage(pageFixture.page);

  await loginPage.open();
  await loginPage.login(username, 'secret_sauce');

  // Verify redirected to products page
  await expect(pageFixture.page).toHaveURL(/inventory/);
});

When('I add the product {string} to the cart', async function (productName: string) {
  await productsPage.addProductToCart(productName);
});

Then('the cart icon badge should show {string}', async function (expectedCount: string) {
  const count = await productsPage.getCartCount();
  expect(count).toBe(expectedCount);
});
