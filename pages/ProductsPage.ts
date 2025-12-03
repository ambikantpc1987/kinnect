import type { Page } from 'playwright';

export class ProductsPage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(productName: string) {
    const productLocator = this.page.locator('.inventory_item').filter({ hasText: productName });
    const addBtn = productLocator.locator('button:has-text("Add to cart")');
    await addBtn.click();
  }

  async getCartCount(): Promise<string> {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.count() === 0) return '0';
    return (await badge.textContent())?.trim() ?? '0';
  }
}
