// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../PageHolder';

export class NotificationComponent extends PageHolder {
  #success = this.page.locator('.notification.success');

  /**
   * @param {string | RegExp | readonly (string | RegExp)[]} message
   */
  async expectSuccessMessage(message) {
    await expect(this.#success).toHaveText(message);
  }
}
