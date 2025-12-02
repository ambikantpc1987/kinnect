import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async addProductToCart(productName: string) {
    // Find the product card by name and click its add-to-cart button
    const product = this.page.locator('.inventory_item').filter({
      has: this.page.locator('.inventory_item_name', { hasText: productName })
    });

    await product.locator('button').click();
  }

  async getCartCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    return await badge.textContent();
  }
}
