import { Page } from '@playwright/test';

export class LoginPage {
  getErrorMessage: any;
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
}
