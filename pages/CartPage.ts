import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  async proceedToCheckout() {
    await this.page.click('#checkout');
  }
}
