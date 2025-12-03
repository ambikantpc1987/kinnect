const { getPage } = require('../hooks/pageFixture.ts');
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

let loginPage: LoginPage;
let productsPage: ProductsPage;

Given('I have {int} item in the cart', async function (count: number) {
  const page = getPage();
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  const PRODUCT_NAMES = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket'
  ];

  for (let i = 0; i < count; i++) {
    const productName = PRODUCT_NAMES[i];
    if (!productName) {
      throw new Error(`No product available at index ${i}. Add more names to PRODUCT_NAMES array.`);
    }
    await productsPage.addProductToCart(productName);
  }

  const badge = await productsPage.getCartCount();
  if (Number(badge) !== count) {
    throw new Error(`Expected ${count} items in cart but found ${badge}`);
  }
});

When('I proceed to checkout and enter details', async function () {
  const page = getPage();

  await page.click('.shopping_cart_link');
  await page.click('button:has-text("Checkout"), input[value="Checkout"]');
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('input[type="submit"][value="Continue"], button:has-text("Continue")');
  await page.click('button:has-text("Finish")');
});

Then('I should see the order confirmation message', async function () {
  const page = getPage();

  const confirmation = page.locator('.complete-header');
  await expect(confirmation).toHaveText(/THANK YOU/i);
});
