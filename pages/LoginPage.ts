import type { Page } from 'playwright';
import { writeFileSync } from 'fs';
import { join } from 'path';

export class LoginPage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/', { waitUntil: 'load' });
    await this.page.waitForSelector('#user-name', { state: 'visible', timeout: 15000 });
  }


  async login(username: string, password: string) {
    try {
      await this.page.waitForSelector('#user-name', { state: 'visible', timeout: 10000 });
    } catch (err) {
      try {
        await this.page.goto('/', { waitUntil: 'load' });
        await this.page.waitForSelector('#user-name', { state: 'visible', timeout: 10000 });
      } catch (err2) {
        await this._saveDebugScreenshot('loginpage_missing_inputs');
        throw new Error(
          `Login inputs (#user-name) not found after trying navigation. See debug screenshot. Original error: ${err2}`
        );
      }
    }

    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);

    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load', timeout: 7000 }).catch(() => undefined),
      this.page.click('#login-button')
    ]);
  }

  private async _saveDebugScreenshot(name: string) {
    try {
      const safeName = `${name}-${Date.now()}.png`;
      const out = join(process.cwd(), 'debug-screenshots');
      try {
        const fs = require('fs');
        if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });
      } catch {}
      const path = join(out, safeName);
      await this.page.screenshot({ path, fullPage: true });
      writeFileSync(join(out, `${safeName}.txt`), `Saved screenshot to ${path}\n`);
      console.warn(`Saved debug screenshot: ${path}`);
    } catch (sErr) {
      console.warn('Failed to save debug screenshot', sErr);
    }
  }
}
