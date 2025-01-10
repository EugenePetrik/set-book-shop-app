// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../PageHolder';

export class AppPage extends PageHolder {
  /**
   * @type {string}
   */
  url;

  /**
   * @param {string} path
   */
  async navigate(path) {
    await this.page.goto(path ?? this.url);
  }

  async getUrl() {
    return this.page.url();
  }

  async getTitle() {
    return this.page.title();
  }

  /**
   * @param {string | RegExp} url
   */
  async expectUrl(url) {
    await expect(this.page, 'Page URL is not correct').toHaveURL(url);
  }
}
