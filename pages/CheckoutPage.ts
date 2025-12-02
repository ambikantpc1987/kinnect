import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async enterCheckoutDetails(first: string, last: string, postal: string) {
    await this.page.fill('#first-name', first);
    await this.page.fill('#last-name', last);
    await this.page.fill('#postal-code', postal);
    await this.page.click('#continue');
  }

  async finishOrder() {
    await this.page.click('#finish');
  }
}
