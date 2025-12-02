import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import { pageFixture } from '../hooks/pageFixture';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let confirmationPage: ConfirmationPage;

Given('I have 1 item in the cart', async function () {
  loginPage = new LoginPage(pageFixture.page);
  productsPage = new ProductsPage(pageFixture.page);
  cartPage = new CartPage(pageFixture.page);
  checkoutPage = new CheckoutPage(pageFixture.page);
  confirmationPage = new ConfirmationPage(pageFixture.page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await productsPage.addProductToCart('Sauce Labs Backpack');
  await cartPage.openCart();
});

When('I proceed to checkout and enter details', async function () {
  await cartPage.proceedToCheckout();

  await checkoutPage.enterCheckoutDetails(
    'John',
    'Doe',
    '12345'
  );

  await checkoutPage.finishOrder();
});

Then('I should see the order confirmation message', async function () {
  const msg = await confirmationPage.getConfirmationMessage();
  expect(msg?.trim()).toContain('THANK YOU FOR YOUR ORDER');
});
