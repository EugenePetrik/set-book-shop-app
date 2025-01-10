// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class StoreTableComponent extends PageHolder {
  #title = this.page.locator('h3').getByText('Search Results');
  #root = this.page.locator('.store-table');
  #tableHeader = this.#root.locator('thead tr th');
  #tableBody = this.#root.locator('tbody tr');

  async expectStoreTableIsDisplayed() {
    await expect(this.#title, 'Page title is not displayed').toBeVisible();
    await expect(this.#tableHeader, 'Store table headers are not correct').toHaveText([
      'Product ID',
      'Product Name',
      'Author',
      'Available',
      'Booked',
      'Delivered',
    ]);
    await expect(
      this.#tableBody,
      'Store table should contain at least one product',
    ).not.toHaveCount(0);
  }
}
