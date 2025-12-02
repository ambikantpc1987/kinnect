import { Page, expect } from '@playwright/test';

export class ConfirmationPage {
  constructor(private page: Page) {}

  async getConfirmationMessage() {
    return this.page.textContent('.complete-header');
  }
}
