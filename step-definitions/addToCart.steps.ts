const { getPage } = require('../hooks/pageFixture.ts'); 
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

let loginPage: LoginPage;
let productsPage: ProductsPage;

Given('I am logged in as {string}', async function (username: string) {
  const page = getPage(); 
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);

  await loginPage.open();          
  await loginPage.login(username, 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});


When('I add the product {string} to the cart', async function (productName: string) {
  if (!productsPage) {
    throw new Error('ProductsPage is not initialized. Ensure the Given step ran first.');
  }
  await productsPage.addProductToCart(productName);
});

Then('the cart icon badge should show {string}', async function (expectedCount: string) {
  if (!productsPage) {
    throw new Error('ProductsPage is not initialized. Ensure the Given step ran first.');
  }
  const count = await productsPage.getCartCount();
  expect(count).toBe(expectedCount);
});
