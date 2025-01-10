// @ts-check
import { expect } from '@playwright/test';
import { PageHolder } from '../../../../PageHolder';

export class ProductsComponent extends PageHolder {
  #title = this.page.locator('h3').getByText('Search Results');
  #root = this.page.locator('.product-grid');
  #products = this.#root.locator('.product-card');
  #editButtons = this.#root.locator('.edit-button');

  async expectProductsAreDisplayed() {
    await expect(this.#title, 'Page title is not displayed').toBeVisible();
    await expect(
      this.#products,
      'Catalogue page should contain at least one product',
    ).not.toHaveCount(0);
  }

  async clickOnEditButton(index = 0) {
    await this.#editButtons.nth(index).click();
  }
}
