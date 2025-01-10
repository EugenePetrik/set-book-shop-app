// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../PageHolder';

export class HeaderComponent extends PageHolder {
  #root = this.page.locator('.nav-links');
  #navLinks = this.#root.locator('a');
  #logOutLink = this.#root.getByRole('button', { name: 'Log Out' });

  /**
   * @param {string[]} links
   */
  async expectNavLinks(links) {
    await expect(this.#navLinks).toHaveText(links);
  }

  async clickLogOutLink() {
    await this.#logOutLink.click();
  }
}
