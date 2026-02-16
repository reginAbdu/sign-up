import { Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) { }

    async goto(path: string) {
        await this.page.goto(`${path}`, { timeout: 5000, waitUntil: 'domcontentloaded' });
    }

    async getUrl() {
        return await this.page.url();
    }

    async waitForURL(urlPattern: string | RegExp) {
        await this.page.waitForURL(urlPattern);
    }
}